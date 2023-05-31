import React, { useState } from "react";

interface Props {
  uid: string;
}

interface Entry {
  name: string;
  number: string;
  id: string;
}

const ListUserNumbers: React.FC<Props> = ({ uid }) => {
  const [entries, setEntries] = useState<Entry[]>();
  return <div>ListUserNumbers</div>;
};

export default ListUserNumbers;
