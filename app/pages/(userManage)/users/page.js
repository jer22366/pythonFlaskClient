"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
import useAuthFetch from "../../hooks/useAuthFetch";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const [editingUser, setEditingUser] = useState(null);
  const [passwordUser, setPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const authFetch = useAuthFetch();

  const [hasToken, setHasToken] = useState(false);
  // 載入使用者
  const loadUsers = async (page = 1) => {
    const res = await authFetch(
      `/api/user/getUser?page=${page}&per_page=${perPage}`
    );
    const data = await res.json();

    if (data.status === "error") {
      console.warn("loadUsers failed:", data.message);
      return;
    }
    setHasToken(true);
    setUsers(data.users || []);
    setPages(data.pages || 1);
    setCurrentPage(data.current_page || 1);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 更新使用者
  const updateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const res = await authFetch(`/api/user/update/${editingUser.id}`, {
      method: "POST",
      body: JSON.stringify(editingUser),
    });
    const data = await res.json();

    if (data.status === "error" || !data.success) {
      alert("更新失敗，請稍後再試");
      return;
    }

    setEditingUser(null);
    loadUsers(currentPage);
  };

  // 切換啟用/停用
  const toggleActive = async (user) => {
    const originalState = user.is_active;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_active: !u.is_active } : u
      )
    );

    const res = await authFetch(`/api/user/isActive/${user.id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.status !== "success") {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: originalState } : u
        )
      );
      alert("更新失敗，請稍後再試");
    }
  };

  // 刪除使用者
  const deleteUser = async (user) => {
    const res = await authFetch(`/api/user/delete/${user.id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.status === "success") {
      loadUsers(currentPage);
    } else {
      alert("刪除失敗，請稍後再試");
    }
  };

  // 重設密碼
  const resetPassword = async (e) => {
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
    } else {
      alert("更新失敗，請稍後再試");
    }
  };

  return (
    hasToken ? (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar user={users[0]} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">使用者管理</h1>
          <UserTable
            users={users}
            pages={pages}
            currentPage={currentPage}
            onPageChange={loadUsers}
            onEdit={setEditingUser}
            onDelete={deleteUser}
            onToggle={toggleActive}
            onResetPassword={setPasswordUser}
          />
        </main>

        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={updateUser}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        )}

        {passwordUser && (
          <ResetPasswordModal
            user={passwordUser}
            newPassword={newPassword}
            onChange={setNewPassword}
            onClose={() => {
              setPasswordUser(null);
              setNewPassword("");
            }}
            onSave={resetPassword}
          />
        )}
      </div>
    ) : <div>未登入，請先登入</div>
  )
}
