const BASE_URL = "https://expenselist-2f469-default-rtdb.asia-southeast1.firebasedatabase.app";

/**
 * Generic GET data
 */
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}.json`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`GET ${endpoint} Error:`, error.message);
    return null;
  }
};

/**
 * Generic POST data
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}.json`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to post data to ${endpoint}`);
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error(`POST ${endpoint} Error:`, error.message);
    return null;
  }
};

/**
 * Generic PUT (update) data
 */
export const updateData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}.json`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to update data at ${endpoint}`);
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error(`PUT ${endpoint} Error:`, error.message);
    return null;
  }
};

/**
 * Generic DELETE data
 */
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}.json`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to delete data at ${endpoint}`);
    return true;
  } catch (error) {
    console.error(`DELETE ${endpoint} Error:`, error.message);
    return false;
  }
};

/**
 * Fetch all transactions (income + expense)
 */
export const fetchAllTransactions = async (userId) => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
      getData(`users/${userId}/income`),
      getData(`users/${userId}/expense`),
    ]);

    const loadedIncome = incomeRes
      ? Object.entries(incomeRes).map(([key, value]) => ({
          id: key,
          date: value.inputDate,
          description: value.inputDescription,
          amount: value.inputAmount,
          type: value.type,
          category: value.category,
        }))
      : [];

    const loadedExpense = expenseRes
      ? Object.entries(expenseRes).map(([key, value]) => ({
          id: key,
          date: value.inputDate,
          description: value.inputDescription,
          amount: value.inputAmount,
          type: value.type,
          category: value.category,
        }))
      : [];

    const allTransactions = [...loadedIncome, ...loadedExpense];

    // Optional: sort by date (latest first)
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return allTransactions;
  } catch (error) {
    console.error("fetchAllTransactions Error:", error.message);
    return [];
  }
};

/**
 * Fetch total income and expense
 */
export const fetchTotals = async (userId) => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
     getData(`users/${userId}/income`),
      getData(`users/${userId}/expense`),
    ]);

    const incomeTotal = Object.values(incomeRes || {}).reduce(
      (sum, curr) => sum + Number(curr.inputAmount || 0),
      0
    );
    const expenseTotal = Object.values(expenseRes || {}).reduce(
      (sum, curr) => sum + Number(curr.inputAmount || 0),
      0
    );

    return { incomeTotal, expenseTotal };
  } catch (error) {
    console.error("fetchTotals Error:", error.message);
    return { incomeTotal: 0, expenseTotal: 0 };
  }
};

/**
 * Fetch all categories (income + expense)
 */
export const fetchAllCategories = async (userId) => {
  try {
    const [incomeData, expenseData] = await Promise.all([
      getData(`users/${userId}/categories/incomeCategories`),
      getData(`users/${userId}/categories/expenseCategories`),
    ]);



    const loadedIncome = incomeData
      ? Object.entries(incomeData).map(([key, value]) => ({
          id: key,
          type: "Income",
          categoryTitle: value.categoryTitle,
    
        }))
      : [];

    const loadedExpense = expenseData
      ? Object.entries(expenseData).map(([key, value]) => ({
          id: key,
          type: "Expense",
          categoryTitle: value.categoryTitle,
          
        }))
      : [];

    return [...loadedIncome, ...loadedExpense];
  } catch (error) {
    console.error("fetchAllCategories Error:", error);
    return [];
  }
};
