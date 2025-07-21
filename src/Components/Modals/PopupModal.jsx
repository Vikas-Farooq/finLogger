import { useEffect, useState } from "react";
import { postData, updateData, getData } from "../../API/Firebase";
import { useAuth } from "../../AuthServices/AuthContext";
import Swal from "sweetalert2";

const Modal = ({ closePopup, refreshData, mode, existingData }) => {
  const { currentUser } = useAuth();

  const [data, setData] = useState({
    inputDescription: "",
    inputAmount: "",
    inputDate: "",
    type: "",
    category: ""
  });

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          console.log("User not logged in or UID missing");
          return;
        }

        const userId = currentUser.uid;

        const [incomeData, expenseData] = await Promise.all([
          getData(`users/${userId}/categories/incomeCategories`),
          getData(`users/${userId}/categories/expenseCategories`)
        ]);

        setIncomeCategories(incomeData ? Object.values(incomeData) : []);
        setExpenseCategories(expenseData ? Object.values(expenseData) : []);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
        Swal.fire("Error", "Failed to fetch categories", "error");
      }
    };

    fetchCategories();
  }, [currentUser]);

  useEffect(() => {
    if (mode === "edit" && existingData) {
      setData({
        inputDescription: existingData.description,
        inputAmount: existingData.amount,
        inputDate: existingData.date,
        type: existingData.type,
        category: existingData.category || ""
      });
    }
  }, [mode, existingData]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!data.type) {
        await Swal.fire({
          icon: "warning",
          title: "Missing Type",
          text: "Please select a transaction type.",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      if (!currentUser) {
        await Swal.fire({
          icon: "warning",
          title: "Not Logged In",
          text: "Please login to continue.",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      const userId = currentUser.uid;

      if (mode === "edit" && !existingData.id) {
        await Swal.fire({
          icon: "error",
          title: "Invalid Data",
          text: "Invalid existing data ID for update.",
          confirmButtonColor: "#d33"
        });
        return;
      }

      const endpoint = mode === "edit"
        ? `users/${userId}/${data.type}/${existingData.id}`
        : `users/${userId}/${data.type}`;

      const response = mode === "edit"
        ? await updateData(endpoint, data)
        : await postData(endpoint, data);

      if (!response) {
        throw new Error(`${mode === "edit" ? "Updating" : "Adding"} data failed`);
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `${mode === "edit" ? "Updated" : "Added"} successfully.`,
        confirmButtonColor: "#3085d6"
      });

      refreshData();
      closePopup();

    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
        </h3>

        {/* Type dropdown */}
        <div className="mb-5">
          <label htmlFor="type" className="block text-gray-600 font-semibold mb-2">
            Transaction Type
          </label>
          <select
            id="type"
            value={data.type}
            onChange={onChangeHandler}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category dropdown */}
        <div className="mb-5">
          <label htmlFor="category" className="block text-gray-600 font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            value={data.category}
            onChange={onChangeHandler}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {(data.type === "income" ? incomeCategories : expenseCategories).map((cat, idx) => (
              <option key={idx} value={cat.categoryTitle}>
                {cat.categoryTitle} {cat.categoryIcon ? ` - ${cat.categoryIcon}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Description input */}
        <div className="mb-5">
          <label htmlFor="inputDescription" className="block text-gray-600 font-semibold mb-2">
            Description
          </label>
          <input
            id="inputDescription"
            type="text"
            placeholder="Enter description"
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.inputDescription}
          />
        </div>

        {/* Amount input */}
        <div className="mb-5">
          <label htmlFor="inputAmount" className="block text-gray-600 font-semibold mb-2">
            Amount
          </label>
          <input
            id="inputAmount"
            type="number"
            placeholder="Enter amount"
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.inputAmount}
          />
        </div>

        {/* Date input */}
        <div className="mb-8">
          <label htmlFor="inputDate" className="block text-gray-600 font-semibold mb-2">
            Date
          </label>
          <input
            id="inputDate"
            type="date"
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.inputDate}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={closePopup}
            className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
