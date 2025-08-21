"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  // 開啟 Modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // 關閉 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

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
          closeModal();
          loadUsers(currentPage);
        }
      });
  };

  const toggleActive = (user) => {
    // 先記錄原本狀態
    const originalState = user.is_active;

    // 先在前端切換狀態
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_active: !u.is_active } : u
      )
    );

    // 呼叫後端更新
    fetch(`/api/user/isActive/${user.id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status != 'success') {
          // 後端更新失敗，回復原本狀態
          setUsers((prev) =>
            prev.map((u) =>
              u.id === user.id ? { ...u, is_active: originalState } : u
            )
          );
          alert("更新失敗，請稍後再試");
        }
      })
      .catch(() => {
        // 如果 fetch 發生錯誤，也回復原本狀態
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

  // 更新表單資料
  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 側邊欄 */}
      <aside className="w-64 bg-white shadow-lg">
        <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
        <nav className="flex flex-col p-2 space-y-2">
          <a href="/dashboard" className="hover:bg-gray-200 px-3 py-2 rounded">
            📊 儀表板
          </a>
          <a href="/users" className="hover:bg-gray-200 px-3 py-2 rounded">
            👥 使用者管理
          </a>
          <a href="/reports" className="hover:bg-gray-200 px-3 py-2 rounded">
            📑 報表分析
          </a>
          <a href="/settings" className="hover:bg-gray-200 px-3 py-2 rounded">
            ⚙ 設定
          </a>
          <a
            href="/otherSystems"
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            🖥 其他系統
          </a>
          <a
            href="/logout"
            className="text-red-600 hover:bg-red-100 px-3 py-2 rounded"
          >
            🚪 登出
          </a>
        </nav>
      </aside>

      {/* 主內容 */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">使用者管理</h1>

        {/* 使用者表格 */}
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Birthday</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.birthday
                      ? new Date(user.birthday).toISOString().split("T")[0]
                      : "未填寫"}
                  </td>
                  <td className="px-4 py-2">{user.phone || "未填寫"}</td>
                  <td className="px-4 py-2">{user.address || "未填寫"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      刪除
                    </button>
                    <button
                      onClick={() => toggleActive(user)}
                      className={`px-2 py-1 rounded ${
                        user.is_active
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {user.is_active ? "停用" : "啟用"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 分頁 */}
          <div className="flex space-x-2 mt-4">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => loadUsers(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <form onSubmit={updateUser} className="space-y-3">
              <input
                type="text"
                name="username"
                value={editingUser.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="email"
                name="email"
                value={editingUser.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                name="birthday"
                value={editingUser.birthday?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                name="phone"
                value={editingUser.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                name="address"
                value={editingUser.address || ""}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border rounded px-2 py-1"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  儲存變更
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
