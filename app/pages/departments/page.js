"use client";
import { useState } from "react";
import Link from "next/link"; // ✅ 引入 Link

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    parent_id: "",
    level: 1,
    manager_id: "",
    description: "",
    is_active: true,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/departments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          parent_id: form.parent_id || null,
          manager_id: form.manager_id || null,
        }),
      });

      if (res.ok) {
        setMessage("✅ 部門新增成功！");
        setForm({
          name: "",
          code: "",
          parent_id: "",
          level: 1,
          manager_id: "",
          description: "",
          is_active: true,
        });
      } else {
        const err = await res.json();
        setMessage("❌ 錯誤：" + (err.message || "新增失敗"));
      }
    } catch (err) {
      setMessage("❌ 請求錯誤：" + err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">部門管理 - 新增部門</h1>
        {/* ✅ 回到儀表板的超連結 */}
        <Link
          href="/pages/dashboard"
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
        >
          回到儀表板
        </Link>
      </div>

      {message && <div className="mb-4 text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 這裡維持你的輸入欄位 */}
        <div>
          <label className="block">部門名稱 *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">部門代碼</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">上級部門 ID</label>
          <input
            type="number"
            name="parent_id"
            value={form.parent_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">層級</label>
          <input
            type="number"
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">主管 ID</label>
          <input
            type="number"
            name="manager_id"
            value={form.manager_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">部門說明</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          <label>是否啟用</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新增部門
        </button>
      </form>
    </div>
  );
}
