import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { postData, updateData, deleteData } from "../../API/Firebase";
import { useAuth } from "../../AuthServices/AuthContext";
import Swal from "sweetalert2";

const CatagoryModal = ({ onClose, mode, existingData, refreshData }) => {
  const { currentUser } = useAuth();

  const [data, setData] = useState({
    type: "Income",
    categoryTitle: "",
  });

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = {
        categoryTitle: data.categoryTitle,
        type: data.type,
      };

      const UserId = currentUser.uid;

      const newEndPoint =
        data.type === "Income"
          ? `users/${UserId}/categories/incomeCategories`
          : `users/${UserId}/categories/expenseCategories`;

      if (mode === "edit") {
        const oldEndPoint =
          existingData.type === "Income"
            ? `users/${UserId}/categories/incomeCategories`
            : `users/${UserId}/categories/expenseCategories`;

        if (data.type === existingData.type) {
          await updateData(`${newEndPoint}/${existingData.id}`, categoryData);
        } else {
          await deleteData(`${oldEndPoint}/${existingData.id}`);
          await postData(newEndPoint, categoryData);
        }

        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Category updated successfully.",
          width: "300px",
          customClass: { popup: "p-2 text-sm" },
          confirmButtonColor: "#3085d6",
        });
      } else {
        await postData(newEndPoint, categoryData);

        await Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Category added successfully.",
          width: "300px",
          customClass: { popup: "p-2 text-sm" },
          confirmButtonColor: "#3085d6",
        });
      }

      refreshData();
      onClose();
    } catch (e) {
      console.log("Error saving category: " + e.message);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
        width: "300px",
        customClass: { popup: "p-2 text-sm" },
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    if (mode === "edit" && existingData) {
      setData({
        type: existingData.type || "Income",
        categoryTitle: existingData.categoryTitle,
      });
    } else {
      setData({
        type: "Income",
        categoryTitle: "",
      });
    }
  }, [mode, existingData]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h2>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-full font-semibold ${
              data.type === "Income"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setData({ ...data, type: "Income" })}
          >
            Income
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-full font-semibold ${
              data.type === "Expense"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setData({ ...data, type: "Expense" })}
          >
            Expense
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Category Title</label>
            <input
              id="categoryTitle"
              type="text"
              value={data.categoryTitle}
              onChange={onChangeHandler}
              placeholder="Enter category title"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          >
            {mode === "edit" ? "Update Category" : "Add Category"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CatagoryModal;
