import { createContext, useState, useEffect } from "react";
import { loginRequest } from "../api/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, navigate) => {
    setLoading(true);
    try {
      const response = await loginRequest(email, password);
      setUser(response.data);
      setError(null);
      console.log("simon");
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
