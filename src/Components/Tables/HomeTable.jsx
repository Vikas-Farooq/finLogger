// import { useAuth } from "../AuthServices/AuthContext";
import { fetchAllTransactions } from "../../API/Firebase";
import { useAuth } from "../../AuthServices/AuthContext";
import SearchComponent from "../Filter/SearchComponent";
import Table from "../Tables/MainTable"
import { useState, useEffect } from "react";


const HomeTable = () => {
  const [data, setData] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const {currentUser} = useAuth();


  const handleFetchAllData = async () => {
      if(!currentUser)
      {
        alert("Please login")
        return;
      }
     
      
      const allTransactions = await fetchAllTransactions(currentUser.uid);
      setData(allTransactions);
      setAllTransactions(allTransactions);

      // console.log(allTransactions, "All Transactionsmm");
      
    };
  
    useEffect(() => {
      handleFetchAllData();
    }, [currentUser]);


  const handleSearchByKeyword = (keyword) => {
       if (keyword === "") {
      setData(allTransactions);
    } else {
      const filtered = allTransactions.filter((item) =>
        item.description.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase()) ||
        item.type.toLowerCase().includes(keyword.toLowerCase()) ||
        item.amount.toString().includes(keyword)
      );
      setData(filtered);
    }
  }

  const getDateItems = (startDate,endDate) => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredDates = allTransactions.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });

    setData(filteredDates);
    // console.log(filteredDates, "Filtered Dates");
  };

  

  return (
    <div>
           <div className="flex justify-center mb-4">
           <SearchComponent
           onSearchByKeywod={handleSearchByKeyword} 
           getDateItems={getDateItems}/>
      </div>

      <Table transactions={data} />
    </div>
  );
};

export default HomeTable;
