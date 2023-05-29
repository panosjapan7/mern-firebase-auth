import React, { useEffect, useState } from "react";
import { getUsersFromMongo } from "../../services/userServices";

interface UserEntry {
  uid: string;
  email: string;
  displayName: string;
  roles: string[];
  createdAt: string;
}

const ListAllUsers = () => {
  const [userEntries, setUserEntries] = useState<UserEntry[]>();

  const fetchUserEntries = async () => {
    const fetchedEntries = await getUsersFromMongo();
    setUserEntries(fetchedEntries);
  };

  useEffect(() => {
    fetchUserEntries();
  }, []);

  if (userEntries === undefined) return null;

  return (
    <div>
      <br />
      <h2>Users on MongoDB</h2>

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
            <th>Display Name /</th>
            <th>Email /</th>
            <th>Role /</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {userEntries.map((entry) => (
            <tr key={entry.uid}>
              <td>{entry.displayName}</td>
              <td>{entry.email}</td>
              <td>Role: {entry.roles[0]}</td>
              <td>Created at: {entry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllUsers;
