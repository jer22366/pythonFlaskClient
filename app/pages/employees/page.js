"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [form, setForm] = useState({
    employee_code: "",
    name: "",
    department: "",
    position: "",
    hire_date: "",
  });
  const [message, setMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  // 載入部門清單
  useEffect(() => {
    fetch("/api/departments/getDepartment")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("載入部門失敗:", err));
  }, []);

  // 當部門改變時 → 載入對應的職位
  useEffect(() => {
    if (!form.department) return;
    fetch(`/api/position/getPosition/${form.department}`)
      .then((res) => res.json())
      .then((data) => {setPositions(data)})
      .catch((err) => console.error("載入職位失敗:", err));
  }, [form.department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/employees/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ 員工新增成功！");
        setForm({
          employee_code: "",
          name: "",
          department: "",
          position: "",
          hire_date: "",
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
        <h1 className="text-2xl font-bold">員工管理 - 新增員工</h1>
        <Link
          href="/pages/dashboard"
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
        >
          回到儀表板
        </Link>
      </div>

      {message && <div className="mb-4 text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">員工編號 *</label>
          <input
            type="text"
            name="employee_code"
            value={form.employee_code}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">姓名 *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* 部門下拉選單 */}
        <div>
          <label className="block">部門 *</label>
          <select
            name="department"
            value={form.department}
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

        {/* 職位下拉選單 */}
        <div>
          <label className="block">職位 *</label>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            disabled={!form.department}
          >
            <option value="">請選擇職位</option>
            {positions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">入職日期 *</label>
          <input
            type="date"
            name="hire_date"
            value={form.hire_date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新增員工
        </button>
      </form>
    </div>
  );
}
