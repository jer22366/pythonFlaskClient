export default function EditUserModal({ user, onClose, onSave, onChange }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <form onSubmit={onSave} className="space-y-3">
          <input type="text" name="username" value={user.username} onChange={onChange} className="w-full border rounded px-2 py-1" />
          <input type="email" name="email" value={user.email} onChange={onChange} className="w-full border rounded px-2 py-1" />
          <input type="date" name="birthday" value={user.birthday?.split("T")[0] || ""} onChange={onChange} className="w-full border rounded px-2 py-1" />
          <input type="text" name="phone" value={user.phone || ""} onChange={onChange} className="w-full border rounded px-2 py-1" />
          <input type="text" name="address" value={user.address || ""} onChange={onChange} className="w-full border rounded px-2 py-1" />

          <div className="flex justify-end space-x-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">儲存變更</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">取消</button>
          </div>
        </form>
      </div>
    </div>
  );
}
