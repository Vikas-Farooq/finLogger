import { useState } from 'react'
import {  FaSearch, } from "react-icons/fa";
import "animate.css";

const SearchComponent = ({onSearchByKeywod,getDateItems}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  return (
    <div className="mt-10 w-full">
  <h2 className="text-center text-2xl font-bold mb-6">
    Date Range Filter for Transactions
  </h2>

  <div className="flex flex-wrap items-center justify-center border p-6 rounded-md bg-white shadow mb-8 space-y-4 md:space-y-0 md:space-x-6">
    
    <div className="w-full md:w-1/3"> {/* Increased from md:w-1/4 to md:w-1/3 */}
      <label className="block text-gray-700 font-medium mb-1">
        Start Date
      </label>
      <input
        type="date"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </div>

    <div className="w-full md:w-1/3"> {/* Increased from md:w-1/4 to md:w-1/3 */}
      <label className="block text-gray-700 font-medium mb-1">
        End Date
      </label>
      <input
        type="date"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>

    <button
      className="bg-green-600 text-white px-6 py-2 rounded w-full md:w-auto mt-2 md:mt-6"
      onClick={() => getDateItems(startDate, endDate)}
    >
      Search
    </button>
  </div>

  <div className="flex items-center justify-center my-2">
    <div className="flex-grow border-t-2 border-gray-400"></div>
    <div className="mx-5 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 text-white rounded-full px-6 py-2 text-lg font-bold shadow-md">
      OR
    </div>
    <div className="flex-grow border-t-2 border-gray-400"></div>
  </div>

  <div className="flex flex-wrap items-center justify-center w-full p-6 rounded-md space-y-4 md:space-y-0 md:space-x-4">
    <div className="relative w-full md:w-2/3 mb-5"> {/* Increased from md:w-1/2 to md:w-2/3 */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>

      <input
        type="text"
        placeholder="Search transaction"
        className="border border-gray-300 rounded pl-10 py-2 w-full"
        onChange={(e) => onSearchByKeywod(e.target.value)}
      />
    </div>
  </div>
</div>

  )
}

export default SearchComponent
