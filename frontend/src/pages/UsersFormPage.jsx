import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import Swal from "sweetalert2";

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, createUser, updateUser } = useContext(UsersContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "usuario",
  });

  const [originalPassword, setOriginalPassword] = useState(""); // Estado para la contraseña original

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const user = await getUser(id);
        if (user) {
          setUserData({
            name: user.name,
            email: user.email,
            password: "", // No cargar en el campo de entrada
            role: user.role,
          });
          setOriginalPassword(user.password); // Guardar la contraseña original
        }
      };
      fetchUser();
    }
  }, [id, getUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userData.email)) {
      Swal.fire(
        "Error",
        "Por favor, ingrese un correo electrónico válido",
        "error"
      );
      return;
    }

    // Validación de contraseña:
    if (!id && userData.password.trim().length < 4) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 4 caracteres",
        "error"
      );
      return;
    }
    if (userData.password.length > 10) {
      Swal.fire(
        "Error",
        "La contraseña no puede tener más de 10 caracteres",
        "error"
      );
      return;
    }

    // Si estamos editando y la contraseña está vacía, usamos la original
    let userToSend = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      password:
        id && userData.password.trim() === ""
          ? originalPassword
          : userData.password,
    };
    console.log(userToSend);

    if (id) {
      await updateUser(id, userToSend);
      Swal.fire("Actualizado", "Usuario actualizado con éxito", "success");
    } else {
      await createUser(userToSend);
      Swal.fire("Creado", "Usuario agregado con éxito", "success");
    }

    // Resetea el formulario
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "usuario",
    });
    setOriginalPassword(""); // Reiniciar la contraseña original

    navigate("/users"); // Redirige a la lista de usuarios
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Editar Usuario" : "Agregar Usuario"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder={
              id
                ? "Déjelo vacío para mantener la misma"
                : "Ingrese una contraseña"
            }
            required={!id} // Obligatorio solo si se está creando
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rol</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default UserFormPage;
