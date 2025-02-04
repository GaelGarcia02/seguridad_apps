import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext.jsx";
import { Button, Table } from "../components/ui.jsx"; // Importamos los componentes
import Swal from "sweetalert2";

const UsersPage = () => {
  const { users, getUsers, deleteUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log(userId);
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      await deleteUser(userId);
      Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
      navigate("/users"); // Redirige a la lista de usuarios
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="mb-5">
        <Link
          to="/users/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Agregar Usuario
        </Link>
      </div>

      <Table>
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <Link
                  to={`/users/add/${user.id_user}`}
                  className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Editar
                </Link>
                <Button
                  className="bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out mx-2"
                  onClick={() => handleDelete(user.id_user)} // ✅ Ahora se ejecuta solo al hacer clic
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersPage;
