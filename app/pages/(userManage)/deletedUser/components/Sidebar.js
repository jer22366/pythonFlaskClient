// components/Sidebar.js
export default function Sidebar({ active }) {
  const links = [
    { href: "/pages/dashboard", label: "📊 儀表板" },
    { href: "/pages/users", label: "👥 使用者管理" },
    { href: "/pages/deletedUsers", label: "🗑 已刪除使用者" },
    { href: "/pages/logout", label: "🚪 登出", red: true },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
      <nav className="flex flex-col p-2 space-y-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded ${link.red ? "text-red-600 hover:bg-red-100" : "hover:bg-gray-200"} ${active === link.href ? "bg-gray-200 font-bold" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
