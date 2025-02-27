import React from "react";
import { usePagination } from "@mantine/hooks";

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, perPage, currentPage, onChange }) => {
  const totalPages = Math.ceil(total / perPage);
  const pagination = usePagination({ total: totalPages, page: currentPage, onChange });

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => pagination.previous()}
      >
        Prev
      </button>

      {pagination.range.map((page: number | 'dots') =>
        page === "dots" ? (
          <span key={page}>...</span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => pagination.setPage(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => pagination.next()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
