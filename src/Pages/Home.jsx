import Header from "../Components/Layouts/Header";
import Sidebar from "../Components/Layouts/Sidebar";
import Cards from "../Components/Cards/Cards";
import IncomeExpenseCharts from "../Components/Charts/IncomeExpenseCharts";
import { useState, useEffect, useRef } from "react";
import HomeTable from "../Components/Tables/HomeTable";
import { fetchTotals } from "../API/Firebase";
import { useAuth } from "../AuthServices/AuthContext";
import { useReactToPrint } from "react-to-print";

const Home = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const { currentUser } = useAuth();

  const userId = currentUser.uid;

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Title",
    contentRef: componentRef,
  });

  useEffect(() => {
    const getTotals = async () => {
      const { incomeTotal, expenseTotal } = await fetchTotals(userId);
      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
    };

    getTotals();
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header handlePrint={handlePrint} />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 bg-gray-100 overflow-y-auto">
          <HomeTable componentRef={componentRef} />

          <div className="flex flex-col md:flex-row justify-between gap-4 mt-12 w-full">
            <Cards text="Total Income" total={totalIncome} textColor="text-green-500" />
            <Cards text="Total Expense" total={totalExpense} textColor="text-red-500" />
            <Cards text="Total Balance" total={totalIncome - totalExpense} textColor="text-yellow-500" />
          </div>

          <div className="mt-12">
            <IncomeExpenseCharts totalIncome={totalIncome} totalExpense={totalExpense} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
