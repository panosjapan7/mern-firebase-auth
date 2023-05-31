import React, { useState, useEffect, useCallback } from "react";
import {
  getPhoneBookEntries,
  getUserPhoneBookeEntries,
} from "../../services/phonebookServices";
import AddNumber from "./AddNumber";

interface Props {
  uid: string;
}

interface Entry {
  name: string;
  number: string;
  id: string;
}

const ListAllNumbers: React.FC<Props> = ({ uid }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [userEntries, setUserEntries] = useState<Entry[]>([]);

  const fetchEntries = async () => {
    const fetchedEntries = await getPhoneBookEntries();
    setEntries(fetchedEntries);
  };

  const fetchUserEntries = useCallback(async () => {
    const fetchedEntries = await getUserPhoneBookeEntries(uid);
    setUserEntries(fetchedEntries);
  }, [uid]);

  const handleEntryAdded = () => {
    fetchEntries();
  };

  const handleUserEntryAdded = () => {
    fetchUserEntries();
  };

  useEffect(() => {
    fetchEntries();
    fetchUserEntries();
  }, [fetchUserEntries]);

  if (entries === undefined) {
    return null;
  }

  return (
    <div style={{ display: "flex", gap: 50 }}>
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

      <div>
        <h2>This User's Phone Numbers</h2>

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
            {userEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddNumber
        uid={uid}
        handleEntryAdded={handleEntryAdded}
        handleUserEntryAdded={handleUserEntryAdded}
      />
    </div>
  );
};

export default ListAllNumbers;
