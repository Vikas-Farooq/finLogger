import React, { createContext, useState, useContext, useEffect } from "react";

export const CurrencyContext = createContext(); // ADD 'export' here

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState({ INR: 1 }); 
  console.log(rates, "Rates");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://api.exchangerate.host/latest?base=INR`);
        const data = await res.json();
        const allRates = { ...data.rates, INR: 1 }; // Ensure INR exists
        setRates(allRates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        setRates({ INR: 1 }); // fallback
      }
    };

    fetchRates();
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const convert = (amount) => {
    if (!rates) return amount;
    const rate = rates[currency] || 1;
    return amount * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
