export default function TasksSection({ tasks }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-3">待辦 / 通知</h3>
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="flex justify-between border-b pb-1">
            <span>{t.text}</span>
            <span className="text-sm text-gray-500">{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
