import React from "react";
import { Link } from "react-router-dom";

const ListAllNumbers = () => {
  return (
    <div>
      <br />
      <Link to="/add-number">Add number</Link>
      <h2>Phone Numbers</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foo Bar</td>
            <td>555-800-600</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListAllNumbers;
