import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllUsersRequest,
  getUserByIdRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../api/users.api.js";

export const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  // Obtener todos los usuarios
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsersRequest();
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Obtener un usuario por ID
  const getUser = async (id) => {
    try {
      const response = await getUserByIdRequest(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el usuario");
    }
  };

  // Crear usuario
  const createUser = async (userData) => {
    setLoading(true);
    try {
      const response = await createUserRequest(userData);
      setUsers([...users, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      await updateUserRequest(id, userData);
      setUsers(
        users.map((user) =>
          user.id_user === id ? { ...user, ...userData } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await deleteUserRequest(id);
      setUsers(users.filter((user) => user.id_user !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        loading,
        error,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
