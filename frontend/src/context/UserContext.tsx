import React, { createContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

// Create the user context
export const UserContext = createContext<any>(null);

// Create a provider component for the user context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
