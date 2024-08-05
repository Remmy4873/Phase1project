import React, { useState, useEffect } from "react";
import TransactionTable from "./Components/TransactionTable";
import TransactionForm from "./Components/TransactionForm";
import Search from "./Components/Search";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="display-4 text-center my-4">Bank of Flatiron</h1>
      <Search onSearch={handleSearch} />
      <TransactionTable transactions={filteredTransactions} />
      <br />
      <TransactionForm addTransaction={addTransaction} />
    </div>
  );
}

export default App;