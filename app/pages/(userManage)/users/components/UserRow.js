export default function UserRow({ user, onEdit, onDelete, onToggle, onResetPassword }) {
  return (
    <tr key={user.id} className="hover:bg-gray-100">
      <td className="px-4 py-2">{user.id}</td>
      <td className="px-4 py-2">{user.username}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">
        {user.birthday ? new Date(user.birthday).toISOString().split("T")[0] : "未填寫"}
      </td>
      <td className="px-4 py-2">{user.phone || "未填寫"}</td>
      <td className="px-4 py-2">{user.address || "未填寫"}</td>
      <td className="px-4 py-2 space-x-2">
        <button onClick={() => onEdit(user)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => onDelete(user)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">刪除</button>
        <button
          onClick={() => onToggle(user)}
          className={`px-2 py-1 rounded ${user.is_active ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {user.is_active ? "停用" : "啟用"}
        </button>
        <button onClick={() => onResetPassword(user)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          重設密碼
        </button>
      </td>
    </tr>
  );
}
