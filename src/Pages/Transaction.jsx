import { fetchAllTransactions, deleteData } from "../API/Firebase";
import { useState, useEffect,  } from 'react';
import Modal from '../Components/Modals/PopupModal';
import Table from '../Components/Tables/MainTable';
import Swal from 'sweetalert2';
import { FiPlus } from "react-icons/fi";
import Sidebar from "../Components/Layouts/Sidebar";
import Header from "../Components/Layouts/Header";
import { useAuth } from "../AuthServices/AuthContext";


const TransactionListTable = () => {
  const [data, setData] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(null);



  const { currentUser } = useAuth();

  
  const handleEdit = (transaction) => {
    setEditModal(transaction);
    setModalOpen(true);
    setModalMode("edit");
  };

  const handleFetchAllData = async () => {
    if (!currentUser) {
      alert("Please login");
      return;
    }
    const allTransactions = await fetchAllTransactions(currentUser.uid);
    setData(allTransactions);
  };

  useEffect(() => {
    handleFetchAllData();
  }, [currentUser]);

  const handleDelete = async (transaction) => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const success = await deleteData(`users/${currentUser.uid}/${transaction.type}/${transaction.id}`);
        if (success) {
          Swal.fire("Deleted!", "Your record has been deleted", "success");
          handleFetchAllData();
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error deleting data: ", error.message);
        Swal.fire("Error!", "Failed to delete data", "error");
      }
    }
  };

  const handleAddIncomeClick = () => {
    setEditModal(null);
    setModalOpen(true);
    setModalMode("add");
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
                <h2 className="text-3xl font-bold text-gray-800">Transaction List</h2>
                <button
                  onClick={handleAddIncomeClick}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                >
                  <FiPlus className="text-xl" />
                  Add Transaction
                </button>
              </div>

              

              
                  <div className="overflow-x-auto">
                    <Table
                      transactions={data}
                      showActions={true}
                      onDelete={handleDelete}
                      refreshData={handleFetchAllData}
                      mode={modalMode}
                      onEdit={handleEdit}
                    />
                  
              </div>
            </div>
          </div>
        </main>
      </div>

      {modalOpen && (
        <Modal
          mode={modalMode}
          existingData={editModal}
          closePopup={() => setModalOpen(false)}
          refreshData={handleFetchAllData}
        />
      )}
    </div>
  );
};

export default TransactionListTable;
