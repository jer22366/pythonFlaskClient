export default function ResetPasswordModal({ user, newPassword, onChange, onClose, onSave }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">重設密碼 - {user.username}</h3>
        <form onSubmit={onSave} className="space-y-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => onChange(e.target.value)}
            placeholder="輸入新密碼"
            className="w-full border rounded px-2 py-1"
            required
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">確認重設</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">取消</button>
          </div>
        </form>
      </div>
    </div>
  );
}
