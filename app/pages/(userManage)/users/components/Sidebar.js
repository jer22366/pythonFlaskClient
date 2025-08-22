export default function Sidebar({ user }) {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
      <nav className="flex flex-col p-2 space-y-2">
        <a href="/pages/dashboard" className="hover:bg-gray-200 px-3 py-2 rounded">📊 儀表板</a>
        <a href="/pages/users" className="hover:bg-gray-200 px-3 py-2 rounded">👥 使用者管理</a>
        {user?.level === "admin" && (
          <a href="/pages/deletedUsers" className="bg-gray-200 px-3 py-2 rounded font-bold">🗑 已刪除使用者</a>
        )}
        <a href="/pages/reports" className="hover:bg-gray-200 px-3 py-2 rounded">📑 報表分析</a>
        <a href="/pages/settings" className="hover:bg-gray-200 px-3 py-2 rounded">⚙ 設定</a>
        <a href="/pages/otherSystems" className="hover:bg-gray-200 px-3 py-2 rounded">🖥 其他系統</a>
        <a href="/pages/logout" className="text-red-600 hover:bg-red-100 px-3 py-2 rounded">🚪 登出</a>
      </nav>
    </aside>
  );
}