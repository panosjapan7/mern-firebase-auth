import React, { useState } from "react";
import { addToPhonebook } from "../../services/phonebookServices";

interface Props {
  uid?: string;
}

const AddNumber: React.FC<Props> = ({ uid }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && phone && uid) {
      await addToPhonebook(name, phone, uid);
      setName("");
      setPhone("");
    }
  };

  return (
    <div>
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
