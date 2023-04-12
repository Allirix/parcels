import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/Pagnation";
type Item = Record<string, string>;

const ITEMS_PER_PAGE = 15;

interface ItemListProps {
  items: Item[];
  passedKeys?: string[];
}
export function ItemList({ items, passedKeys }: ItemListProps) {
  const [sortKey, setSortKey] = useState<string>(Object.keys(items[0])[0]);
  const [sortDirection, setSortDirection] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedItems = useMemo(() => {
    const sorted = items.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortDirection) {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return sorted;
  }, [items, sortKey, sortDirection]);

  const pageCount = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedItems.slice(startIndex, endIndex);
  }, [currentPage, sortedItems]);

  const keys =
    typeof passedKeys === "undefined" ? Object.keys(items[0]) : passedKeys;

  const handleHeaderClick = (key: string) => {
    if (key === sortKey) {
      setSortDirection(!sortDirection);
    } else {
      setSortKey(key);
      setSortDirection(true);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col space-y-4">
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            {keys.map((key: string) => (
              <th
                key={key}
                onClick={() => handleHeaderClick(key)}
                className={`
                    px-4 py-2 font-medium text-gray-700 uppercase cursor-pointer ${
                      key === sortKey
                        ? sortDirection
                          ? "bg-gray-200"
                          : "bg-gray-100"
                        : "bg-white"
                    }
                  `}
              >
                {key.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((item, i) => (
            <tr key={item.id ?? i}>
              {keys.map((key: string) => (
                <td
                  key={key}
                  className="border px-4 py-2 text-gray-700 whitespace-nowrap"
                >
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

interface ItemsProps {
  items: Item[];
  passedKeys?: string[];
}

export default function Items({ items, passedKeys }: ItemsProps) {
  const [filteredItems, setFilteredItems] = useState(items);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q")?.toLowerCase();
    if (query) {
      const filtered = items.filter((item) => {
        for (const key in item)
          if (item[key].toLowerCase().startsWith(query)) return true;
        return (
          `${item.number} ${item.locationId}`
            .toLowerCase()
            .slice(0, query.length) === query
        );
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [items, location]);

  if (filteredItems.length === 0) return null;
  return <ItemList items={filteredItems} passedKeys={passedKeys} />;
}
