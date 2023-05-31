import React, { useState, useEffect } from "react";
import { getPhoneBookEntries } from "../../services/phonebookServices";

interface Entry {
  name: string;
  number: string;
  id: string;
}

const ListAllNumbers: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>();

  const fetchEntries = async () => {
    const fetchedEntries = await getPhoneBookEntries();
    setEntries(fetchedEntries);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (entries === undefined) {
    return null;
  }

  return (
    <div>
      <h2>All Users Phone Numbers</h2>

      <table
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllNumbers;
