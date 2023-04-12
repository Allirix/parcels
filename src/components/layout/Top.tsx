import React, { useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import AddDelivery from "../../features/add-delivery";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useEffect } from "react";
import { useDebounce } from "../utils";

function SearchInput({ navigate }: { navigate: NavigateFunction }) {
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigateDebounced = useDebounce(navigate, 300);

  const handleSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    setSearchTerm(value);
  };

  useEffect(() => {
    searchTerm && navigateDebounced(`${pathname}?q=${searchTerm}`);
    if (searchTerm === "") navigateDebounced(`${pathname}`);
  }, [navigateDebounced, pathname, searchTerm]);

  return (
    <div className="relative flex items-center justify-center flex-grow">
      <input
        type="text"
        placeholder="Search by name, number, suburb..."
        className="w-full px-3 py-1 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-600 border-none bg-transparent pl-8"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <FaSearch />
      </div>
    </div>
  );
}

function MenuButtons({
  setShowModal,
  navigate,
}: {
  setShowModal: (show: boolean) => void;
  navigate: NavigateFunction;
}) {
  return (
    <>
      <button onClick={() => navigate("/settings")}>
        <AiOutlineMenu />
      </button>
      <button onClick={() => setShowModal(true)}>
        <AiOutlinePlus />
      </button>
    </>
  );
}

function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex items-center h-16 justify-between px-4 bg-gray-900 text-white space-x-4">
          <button onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </button>
          <SearchInput navigate={navigate} />
          <MenuButtons setShowModal={setShowModal} navigate={navigate} />
        </div>
      </div>
      {showModal && <AddDelivery onClose={() => setShowModal(false)} />}
    </>
  );
}

export default TopBar;
