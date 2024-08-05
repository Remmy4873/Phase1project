import React, { useState } from "react";

function Edit({ transaction, onEdit }) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedTransaction = {
      ...transaction,
      description,
      amount,
      category,
    };
    onEdit(updatedTransaction);
  }

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div className="form-group mr-2">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control ml-2"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group mr-2">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          className="form-control ml-2"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group mr-2">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          className="form-control ml-2"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default Edit;