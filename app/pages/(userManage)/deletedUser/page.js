"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  // 載入刪除使用者
  const loadDeletedUsers = (page = 1) => {
    fetch(`/api/user/getDeletedUser?page=${page}&per_page=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setPages(data.pages);
        setCurrentPage(data.current_page);
      });
  };

  useEffect(() => {
    loadDeletedUsers();
  }, []);

  // 復原使用者
  const restoreUser = (user) => {
    fetch(`/api/user/restore/${user.id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("使用者已復原");
          loadDeletedUsers(currentPage);
        } else {
          alert("復原失敗，請稍後再試");
        }
      })
      .catch(() => alert("網路錯誤，請稍後再試"));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 側邊欄 */}
      <aside className="w-64 bg-white shadow-lg">
        <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
        <nav className="flex flex-col p-2 space-y-2">
          <a
            href="/pages/dashboard"
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            📊 儀表板
          </a>
          <a
            href="/pages/users"
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            👥 使用者管理
          </a>
          <a
            href="/pages/deletedUsers"
            className="bg-gray-200 px-3 py-2 rounded font-bold"
          >
            🗑 已刪除使用者
          </a>
          <a
            href="/pages/settings"
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            ⚙ 設定
          </a>
          <a
            href="/pages/logout"
            className="text-red-600 hover:bg-red-100 px-3 py-2 rounded"
          >
            🚪 登出
          </a>
        </nav>
      </aside>

      {/* 主內容 */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">已刪除使用者</h1>

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
                <th className="px-4 py-2 text-left">刪除時間</th>
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
                  <td className="px-4 py-2">
                    {user.deleted_at
                      ? new Date(user.deleted_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => restoreUser(user)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      復原
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
                onClick={() => loadDeletedUsers(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
