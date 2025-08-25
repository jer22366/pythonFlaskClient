"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
import useAuthFetch from "../../hooks/useAuthFetch";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1, currentPage: 1, perPage: 12 });
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordUser, setPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const authFetch = useAuthFetch();

  const loadUsers = async (page = 1) => {
    const res = await authFetch(`/api/user/getUser?page=${page}&per_page=${pagination.perPage}`);
    const data = await res.json();
    if (data.status === "error") return console.warn("loadUsers failed:", data.message);
    setUsers(data.users || []);
    setPagination({
      pages: data.pages || 1,
      currentPage: data.current_page || 1,
      perPage: pagination.perPage,
    });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await authFetch("/api/user/getStats");
      if (res.status !== 200) return;
      setCurrentUser(await res.json());
    };
    fetchCurrentUser();
    loadUsers();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    const res = await authFetch(`/api/user/update/${editingUser.id}`, {
      method: "POST",
      body: JSON.stringify(editingUser),
    });
    const data = await res.json();
    if (!data.success) return alert("更新失敗，請稍後再試");
    setEditingUser(null);
    loadUsers(pagination.currentPage);
  };

  const handleToggleActive = async (user) => {
    const originalState = user.is_active;
    setUsers(users.map(u => u.id === user.id ? { ...u, is_active: !u.is_active } : u));
    const res = await authFetch(`/api/user/isActive/${user.id}`, { method: "PUT" });
    const data = await res.json();
    if (data.status !== "success") {
      setUsers(users.map(u => u.id === user.id ? { ...u, is_active: originalState } : u));
      alert("更新失敗，請稍後再試");
    }
  };

  const handleDeleteUser = async (user) => {
    const res = await authFetch(`/api/user/delete/${user.id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.status === "success") loadUsers(pagination.currentPage);
    else alert("刪除失敗，請稍後再試");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!passwordUser) return;
    const res = await authFetch(`/api/user/resetPassword/${passwordUser.id}`, {
      method: "PUT",
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("密碼已更新");
      setPasswordUser(null);
      setNewPassword("");
    } else alert("更新失敗，請稍後再試");
  };

  if (!currentUser) return <div>未登入，請先登入</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userLevel={currentUser.level} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">使用者管理</h1>
        <UserTable
          users={users}
          pages={pagination.pages}
          currentPage={pagination.currentPage}
          onPageChange={loadUsers}
          onEdit={setEditingUser}
          onDelete={handleDeleteUser}
          onToggle={handleToggleActive}
          onResetPassword={setPasswordUser}
        />
      </main>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
          onChange={(e) => setEditingUser({ ...editingUser, [e.target.name]: e.target.value })}
        />
      )}

      {passwordUser && (
        <ResetPasswordModal
          user={passwordUser}
          newPassword={newPassword}
          onChange={setNewPassword}
          onClose={() => { setPasswordUser(null); setNewPassword(""); }}
          onSave={handleResetPassword}
        />
      )}
    </div>
  );
}
