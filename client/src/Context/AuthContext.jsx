import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
    );
  const updateUser = (data) => {
    console.log(data);
        setCurrentUser(data);
    }
    useEffect(() => {
    
    localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])

  return (
    <AuthContext.Provider value={{ currentUser,updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};
