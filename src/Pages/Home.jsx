import Header from "../Components/Layouts/Header";
import Sidebar from "../Components/Layouts/Sidebar";
import Cards from "../Components/Cards/Cards";
import IncomeExpenseCharts from "../Components/Charts/IncomeExpenseCharts";
import { useState, useEffect } from "react";
import HomeTable from "../Components/Tables/HomeTable";
import { fetchTotals } from "../API/Firebase";
import { useAuth } from "../AuthServices/AuthContext";


const Home = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const {currentUser} = useAuth();

  const userId = currentUser.uid;
  

  useEffect(() => {

  const getTotals = async () => {
    const { incomeTotal, expenseTotal, allTransactions } = await fetchTotals(userId);
    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);

    // console.log(allTransactions, "All Transactions");
  };

  getTotals();
}, [currentUser]);


  //  const fetchTotals = async () => {
  //   try {
  //     const [incomeResponse, expenseResponse] = await Promise.all([
  //       fetch(
  //         `https://expenselist-2f469-default-rtdb.asia-southeast1.firebasedatabase.app/income.json`
  //       ),
  //       fetch(
  //         `https://expenselist-2f469-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json`
  //       ),
  //     ]);

  //     const incomeRes = await incomeResponse.json();
  //     const expenseRes = await expenseResponse.json();

  //     const incomeTotal = Object.values(incomeRes || {}).reduce(
  //       (sum, curr) => sum + Number(curr.inputAmount || 0),
  //       0
  //     );
  //     const expenseTotal = Object.values(expenseRes || {}).reduce(
  //       (sum, curr) => sum + Number(curr.inputAmount || 0),
  //       0
  //     );

  //     const allTransactions = [
  //       ...Object.values(incomeRes || {}),
  //       ...Object.values(expenseRes || {}),
  //     ];

  //     console.log(allTransactions, "All Transmmmactions");

  //     setTotalIncome(incomeTotal);
  //     setTotalExpense(expenseTotal);
  //   } catch (error) {
  //     console.error("Error fetching totals: ", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchTotals();
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <HomeTable />

          <div className="flex justify-between gap-4 mt-12 w-full">
            <div className="flex-1">
              <Cards text="Total Income" total={totalIncome} textColor="text-green-500" />
            </div>
            <div className="flex-1">
              <Cards text="Total Expense" total={totalExpense} textColor="text-red-500" />
            </div>
            <div className="flex-1">
              <Cards text="Total Balance" total={totalIncome - totalExpense} textColor="text-yellow-500" />
            </div>
          </div>

          
  <>
    <IncomeExpenseCharts
      totalIncome={totalIncome}
      totalExpense={totalExpense}
    />

    <div className="mt-15"></div>
  </>

        </main>
      </div>
    </div>
  );
};

export default Home;
