import React, { useContext } from "react";
import { CurrencyContext } from "../CurrencySelector/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="w-full mb-8">
      <label className="block text-white dark:text-gray-300 font-medium mb-2">
        Change Currency
      </label>
      <select
        value={currency}
        onChange={handleChange}
        className="w-full bg-white text-white dark:bg-gray-700 border border-white-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="INR">INR - Indian Rupee</option>
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
        <option value="JPY">JPY - Japanese Yen</option>
        {/* Add more as needed */}
      </select>
    </div>
  );
};

export default CurrencySelector;
