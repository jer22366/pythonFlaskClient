"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import ResetPasswordModal from "./components/ResetPasswordModal";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const [editingUser, setEditingUser] = useState(null);
  const [passwordUser, setPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  // 載入使用者
  const loadUsers = (page = 1) => {
    fetch(`/api/user/getUser?page=${page}&per_page=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setPages(data.pages);
        setCurrentPage(data.current_page);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 更新使用者
  const updateUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    fetch(`/api/user/update/${editingUser.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditingUser(null);
          loadUsers(currentPage);
        }
      });
  };

  // 切換啟用/停用
  const toggleActive = (user) => {
    const originalState = user.is_active;

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, is_active: !u.is_active } : u))
    );

    fetch(`/api/user/isActive/${user.id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === user.id ? { ...u, is_active: originalState } : u
            )
          );
          alert("更新失敗，請稍後再試");
        }
      })
      .catch(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, is_active: originalState } : u
          )
        );
        alert("網路錯誤，請稍後再試");
      });
  };

  // 刪除使用者
  const deleteUser = (user) => {
    fetch(`/api/user/delete/${user.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          loadUsers(currentPage);
        }
      });
  };

  // 重設密碼
  const resetPassword = (e) => {
    e.preventDefault();
    if (!passwordUser) return;

    fetch(`/api/user/resetPassword/${passwordUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("密碼已更新");
          setPasswordUser(null);
          setNewPassword("");
        } else {
          alert("更新失敗，請稍後再試");
        }
      })
      .catch(() => alert("網路錯誤，請稍後再試"));
  };
  return (
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
          onChange={(e) => setEditingUser({ ...editingUser, [e.target.name]: e.target.value })}
        />
      )}

      {passwordUser && (
        <ResetPasswordModal
          user={passwordUser}
          newPassword={newPassword}
          onChange={setNewPassword}
          onClose={() => { setPasswordUser(null); setNewPassword(""); }}
          onSave={resetPassword}
        />
      )}
    </div>
  );
}
