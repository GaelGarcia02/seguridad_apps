import { pool } from "../db.js";

//* Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que `email` y `password` no son undefined o vacíos
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password are required" });
    }

    // Consultar el usuario por correo electrónico
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    console.log("Su id es:", user.id_user);
    console.log("Su nombre es:", user.name);

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const passwordIsValid = password === user.password;

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message); // Agregar log para errores
    return res.status(500).json({ message: error.message });
  }
};
