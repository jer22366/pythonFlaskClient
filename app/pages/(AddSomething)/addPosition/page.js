"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    level: 1,
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/departments/getDepartment")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("載入部門失敗:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/position/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(`✅ 職位 ${data.name} 新增成功`);
        setForm({ name: "", code: "", level: 1, department_id: "" });
      } else {
        const err = await res.json();
        setMessage(`❌ 錯誤：${err.message || "新增失敗"}`);
      }
    } catch (err) {
      setMessage("❌ 請求錯誤：" + err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">職位管理 - 新增職位</h1>
        <Link
          href="/dashboard"
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
        >
          回到儀表板
        </Link>
      </div>

      {message && <div className="mb-4 text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">名稱 *</label>
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
          <label className="block">代碼</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">等級</label>
          <input
            type="number"
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={1}
          />
        </div>

        <div>
          <label className="block">部門 *</label>
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">請選擇部門</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新增職位
        </button>
      </form>
    </div>
  );
}
