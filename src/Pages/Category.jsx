import React, { useState, useEffect } from "react";
import { fetchAllCategories, deleteData } from "../API/Firebase";
import CatagoryModal from "../Components/Modals/CategoryModal";
import Swal from "sweetalert2";
import Sidebar from "../Components/Layouts/Sidebar";
import Header from "../Components/Layouts/Header";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../AuthServices/AuthContext";



const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [catModal, showCatModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editModalData, setEditModalData] = useState(null);

  const {currentUser}= useAuth();


  const handleFetchAllCategories = async () => {
    if(!currentUser)
    {
      alert("Please login")
      return;
    }
    const allCategories = await fetchAllCategories(currentUser.uid);
    setCategories(allCategories);
    // console.log(currentUser, "Current User");
    
    // console.log(allCategories, "All Categories");
    
  };

  useEffect(() => {
    handleFetchAllCategories();
  }, [currentUser]);

  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const endpoint =
          category.type === "Income"
            ? `users/${currentUser.uid}/categories/incomeCategories/${category.id}`
            : `users/${currentUser.uid}/categories/expenseCategories/${category.id}`;

        const success = await deleteData(endpoint);

        if (success) {
          Swal.fire("Deleted!", "Category has been deleted", "success");
          handleFetchAllCategories();
        } else {
          throw new Error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category: ", error.message);
        Swal.fire("Error!", "Failed to delete category", "error");
      }
    }
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setEditModalData(item);
    showCatModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
                <button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                  onClick={() => {
                    showCatModal(true);
                    setModalMode("add");
                    setEditModalData(null);
                  }}
                >
                  <FiPlus className="text-xl" />
                  Add Category
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border rounded-lg shadow">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Category Title</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          No categories found.
                        </td>
                      </tr>
                    ) : (
                      categories.map((cat) => (
                        <tr key={cat.id} className="border-b">
                          <td className="px-4 py-2">{cat.type}</td>
                          <td className="px-4 py-2">{cat.categoryTitle}</td>
                          <td className="px-4 py-2 space-x-3">
                            <button
                              onClick={() => handleEdit(cat)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(cat)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {catModal && (
            <CatagoryModal
              onClose={() => showCatModal(false)}
              mode={modalMode}
              existingData={editModalData}
              refreshData={handleFetchAllCategories}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryTable;
