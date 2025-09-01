'use client';

export default function Sidebar({ userLevel }) {
  const links = [
    { label: "儀表板", href: "/pages/dashboard", icon: "📊" },
    { label: "使用者管理", href: "/pages/users", icon: "👥" },
    { label: "部門", href: "/pages/department", icon: "📑" },
    { label: "設定", href: "/pages/settings", icon: "⚙" },
    { label: "其他系統", href: "/pages/otherSystems", icon: "🖥" },
  ];

  // admin 專用連結
  if (userLevel === "admin") {
    links.push({ label: "已刪除用戶", href: "/pages/deletedUser", icon: "🗑️" });
  }

  // 登出連結
  links.push({ label: "登出", href: "/pages/logout", icon: "🚪", color: "text-red-600", hover: "hover:bg-red-100" });

  return (
    <aside className="w-64 bg-white shadow-lg">
      <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
      <nav className="flex flex-col p-2 space-y-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className={`${link.color || "text-black"} ${link.hover || "hover:bg-gray-200"} px-3 py-2 rounded flex items-center gap-2`}
          >
            <span>{link.icon}</span> <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
