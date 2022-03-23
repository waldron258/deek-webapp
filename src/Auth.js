import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUser(user);
        sessionStorage.setItem("user", user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
