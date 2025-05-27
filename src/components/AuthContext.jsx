import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    console.log("AuthContext: Initializing user state from localStorage.");
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });



  const login = (userData, token) => {
    console.log("AuthContext: login function called with userData:", userData, "and token:", token);
    setUser(userData);
    localStorage.setItem("User", JSON.stringify(userData));
    localStorage.setItem("Token", token);
    console.log("AuthContext: User state and localStorage updated.");

  };

  const logout = () => {
    console.log("AuthContext: logout function called.");
    setUser(null);
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;