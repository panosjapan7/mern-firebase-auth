import React, { useEffect, useState } from "react";
import { getUsersFromMongo } from "../../services/userServices";
import "./phonebook.css";

interface UserEntry {
  _id: string;
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
    <div style={{ marginBottom: 40 }}>
      <br />
      <h2>Registered Users on MongoDB</h2>

      <table>
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {userEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.displayName}</td>
              <td>{entry.email}</td>
              <td>{entry.roles[0]}</td>
              <td>{entry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllUsers;
