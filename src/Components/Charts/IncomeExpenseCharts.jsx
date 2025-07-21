import { Chart } from "react-google-charts";

const IncomeExpenseCharts = ({ totalIncome, totalExpense }) => {
  return (
    <div className="mt-16 bg-gray-800 text-gray-200 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Income vs Expense Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          {totalIncome === 0 && totalExpense === 0 ? (
            <div className="text-center text-gray-200 py-10">
              No data available to display chart.
            </div>
          ) : (
            <Chart
              chartType="PieChart"
              data={[
                ["Type", "Amount"],
                ["Income", Number(totalIncome) || 0],
                ["Expense", Number(totalExpense) || 0],
              ]}
              options={{
                is3D: true,
                colors: ["#4CAF50", "#F44336"],
                chartArea: { width: "90%", height: "80%" },
                legend: {
                  position: "bottom",
                  textStyle: {
                    color: "white",
                    fontSize: 14,
                    fontName: "Arial",
                    bold: true,
                  },
                },
                backgroundColor: "transparent",
              }}
              width="100%"
              height="400px"
              loader={<div className="text-center">Loading Chart...</div>}
            />
          )}
        </div>

        {/* Area Chart */}
        <div>
          {totalIncome === 0 && totalExpense === 0 ? (
            <div className="text-center text-gray-200 py-10">
              No data available to display chart.
            </div>
          ) : (
            <Chart
              chartType="AreaChart"
              data={[
                ["Type", "Amount"],
                ["Income", Number(totalIncome) || 0],
                ["Expense", Number(totalExpense) || 0],
              ]}
              options={{
                colors: ["#4CAF50", "#F44336"],
                chartArea: { width: "90%", height: "80%" },
                legend: {
                  position: "bottom",
                  textStyle: {
                    color: "white",
                    fontSize: 14,
                    fontName: "Arial",
                    bold: true,
                  },
                },
                backgroundColor: "transparent",
              }}
              width="100%"
              height="400px"
              loader={<div className="text-center">Loading Chart...</div>}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseCharts;
