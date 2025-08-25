// components/Pagination.js
export default function Pagination({ pages, currentPage, onPageChange }) {
  return (
    <div className="flex space-x-2 mt-4">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${currentPage === p ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
