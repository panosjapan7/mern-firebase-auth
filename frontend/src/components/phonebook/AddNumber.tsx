import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToPhonebook } from "../../services/phonebookServices";

const AddNumber = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && phone) {
      await addToPhonebook(name, phone);
      setName("");
      setPhone("");
    }
  };

  return (
    <div>
      <Link to="/">View phonebook</Link>
      <h2>Add Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
        />
        <br />
        <br />
        <button type="submit">Add number</button>
      </form>
    </div>
  );
};

export default AddNumber;
