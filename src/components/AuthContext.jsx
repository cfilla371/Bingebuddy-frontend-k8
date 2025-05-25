import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("User", JSON.stringify(userData)); 
    localStorage.setItem("accessToken", token); 

    
    navigate("/dashboard-main/:userid");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("User");
    localStorage.removeItem("accessToken");
    navigate("/"); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

