import { IoSearch } from "react-icons/io5";

const TextSearch = () => {
  return (
    <div className="relative flex items-center">
      <IoSearch className="absolute left-2 text-gray-500" size={20} />

      <input
        className="pl-10 py-2 outline-none border-none rounded text-black"
        type="text"
        placeholder="Search by name"
      />
    </div>
  );
};

export default TextSearch;
