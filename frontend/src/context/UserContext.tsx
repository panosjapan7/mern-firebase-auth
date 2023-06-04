import React, { createContext, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

// Create the user context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Create a provider component for the user context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
