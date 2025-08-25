// components/DeletedUserTable.js
import Pagination from "./Pagination";

export default function DeletedUserTable({ users, pages, currentPage, onRestore, onPageChange }) {
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : "-";

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID","Username","Email","Birthday","Phone","Address","刪除時間","Action"].map((t) => (
              <th key={t} className="px-4 py-2 text-left">{t}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{u.id}</td>
              <td className="px-4 py-2">{u.username}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{formatDate(u.birthday)}</td>
              <td className="px-4 py-2">{u.phone || "-"}</td>
              <td className="px-4 py-2">{u.address || "-"}</td>
              <td className="px-4 py-2">{formatDate(u.deleted_at)}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onRestore(u)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  復原
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages={pages} currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}
