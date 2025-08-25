// pages/deletedUsers.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthFetch from "../../hooks/useAuthFetch";
import Sidebar from "./components/Sidebar";
import DeletedUserTable from "./components/DeletedUserTable";

export default function Page() {
  const router = useRouter();
  const authFetch = useAuthFetch();
  const [pagination, setPagination] = useState({ users: [], pages: 1, currentPage: 1, perPage: 12 });
  const [loading, setLoading] = useState(true);

  const loadDeletedUsers = async (page = 1) => {
    try {
      const res = await authFetch(`/api/user/getDeletedUser?page=${page}&per_page=${pagination.perPage}`);
      if (!res.ok) throw new Error("驗證失敗");
      const data = await res.json();
      setPagination({ ...pagination, users: data.users, pages: data.pages, currentPage: data.current_page });
    } catch {
      router.replace("/pages/login");
    } finally {
      setLoading(false);
    }
  };

  const restoreUser = async (user) => {
    try {
      const res = await authFetch(`/api/user/restore/${user.id}`, { method: "PUT" });
      const data = await res.json();
      alert(data.status === "success" ? "使用者已復原" : "復原失敗，請稍後再試");
      if (data.status === "success") loadDeletedUsers(pagination.currentPage);
    } catch {
      alert("網路錯誤，請稍後再試");
    }
  };

  useEffect(() => { loadDeletedUsers(); }, []);

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="/pages/deletedUsers" />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">已刪除使用者</h1>
        <DeletedUserTable
          users={pagination.users}
          pages={pagination.pages}
          currentPage={pagination.currentPage}
          onRestore={restoreUser}
          onPageChange={loadDeletedUsers}
        />
      </main>
    </div>
  );
}
