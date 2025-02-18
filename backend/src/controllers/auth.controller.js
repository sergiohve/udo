import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCtrl = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 2); // Adjust salt rounds as needed

    const pool = await getConnection();
    await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("name", sql.VarChar, name)
      .query(querys.registerUser);

    res.status(201).json({ message: "Usuario registrado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
console.log(email, password)
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Usuarios WHERE email = @email");

    if (result.recordset.length === 0) {
      res.status(401).json({ message: "Usuario no encontrado", ok: false });
    } else {
      const user = result.recordset[0];
      const userPassword= user.password.trim()
      const passwordSpace=password.trim()
     // const isMatch = await bcrypt.compare(userPassword, passwordSpace);
      console.log(userPassword, passwordSpace)
      if (userPassword!==passwordSpace) {
        return res.status(401).json({ message: "Contraseña incorrecta", ok: false });
      }else{
        res.json({ message: "Inicio de sesión exitoso", ok: true });
      }
      // const payload = { userId: user.id, email: user.email };
      // const secretKey = process.env.JWT_SECRET;
      // const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

     
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
