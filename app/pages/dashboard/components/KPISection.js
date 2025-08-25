'use client';

export default function KPISection({ stats }) {
  const kpis = [
    { label: "用戶數量", value: stats.total_users, icon: "👥", bg: "bg-blue-500" },
    { label: "今日新增", value: stats.new_users_today, icon: "➕", bg: "bg-green-500" },
    { label: "營收 (NT$)", value: stats.revenue, icon: "💰", bg: "bg-yellow-500" },
    { label: "待辦事項", value: stats.pending_tasks, icon: "📝", bg: "bg-red-500" },
    { label: "出勤率", value: stats.attendance_rate, icon: "📅", bg: "bg-purple-500" },
    { label: "系統狀態", value: stats.server_health, icon: "🖥", bg: "bg-indigo-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {kpis.map((kpi, idx) => (
        <div key={idx} className={`${kpi.bg} text-white rounded-lg p-4 shadow text-center`}>
          <div className="text-3xl">{kpi.icon}</div>
          <div className="text-lg font-semibold">{kpi.label}</div>
          <div className="text-2xl">{kpi.value ?? "-"}</div>
        </div>
      ))}
    </div>
  );
}
