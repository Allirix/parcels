import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const WINDOW_SIZE = 5;

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const startPage = Math.max(1, currentPage - Math.floor(WINDOW_SIZE / 2));
  const endPage = Math.min(pageCount, startPage + WINDOW_SIZE - 1);

  return (
    <nav className="flex justify-center m-4">
      <ul className="flex flex-wrap space-x-1">
        <li>
          <button
            className={`
              ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
              px-2 py-1 rounded-md transition-colors duration-150 ease-in-out 
              ${isMobile ? "w-full" : ""}
            `}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.slice(startPage - 1, endPage).map((page) => (
          <li key={page}>
            <button
              className={`
                ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
                px-2 py-1 rounded-md transition-colors duration-150 ease-in-out 
                ${isMobile ? "w-full" : ""}
              `}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`
              ${
                currentPage === pageCount
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
              px-2 py-1 rounded-md transition-colors duration-150 ease-in-out 
              ${isMobile ? "w-full" : ""}
            `}
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
