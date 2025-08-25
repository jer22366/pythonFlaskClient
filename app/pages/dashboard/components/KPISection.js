export default function KPISection({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <div className="bg-blue-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">👥</div>
        <div className="text-lg font-semibold">用戶數量</div>
        <div className="text-2xl">{stats.total_users}</div>
      </div>
      <div className="bg-green-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">➕</div>
        <div className="text-lg font-semibold">今日新增</div>
        <div className="text-2xl">{stats.new_users_today}</div>
      </div>
      <div className="bg-yellow-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">💰</div>
        <div className="text-lg font-semibold">營收 (NT$)</div>
        <div className="text-2xl">{stats.revenue}</div>
      </div>
      <div className="bg-red-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">📝</div>
        <div className="text-lg font-semibold">待辦事項</div>
        <div className="text-2xl">{stats.pending_tasks}</div>
      </div>
      <div className="bg-purple-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">📅</div>
        <div className="text-lg font-semibold">出勤率</div>
        <div className="text-2xl">{stats.attendance_rate}</div>
      </div>
      <div className="bg-indigo-500 text-white rounded-lg p-4 shadow text-center">
        <div className="text-3xl">🖥</div>
        <div className="text-lg font-semibold">系統狀態</div>
        <div className="text-2xl">{stats.server_health}</div>
      </div>
    </div>
  );
}
