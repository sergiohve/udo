import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getEquipos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllEquipos);

    res.json({ data: result.recordset, length: result.recordset.length });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewEquipo = async (req, res) => {
  const { tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano  } = req.body;
 

  if (tipoMaquina == null || modelo == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }
  if (marca == null) {
    marca = 0;
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("tipoMaquina", sql.VarChar, tipoMaquina)
      .input("modelo", sql.VarChar, modelo)
      .input("marca", sql.VarChar, marca)
      .input("serialMaquina", sql.VarChar, serialMaquina)
      .input("modeloMotor", sql.VarChar, modeloMotor)
      .input("serialMotor", sql.VarChar, serialMotor)
      .input("arregloPlacas", sql.VarChar, arregloPlacas)
      .input("plantaUbicacion", sql.VarChar, plantaUbicacion)
      .input("condicion", sql.VarChar, condicion)
      .input("ano", sql.VarChar, ano)
      .query(querys.addNewEquipo);

    res.json({
      data: {
        tipoMaquina,
        modelo,
        marca,
        serialMaquina,
        modeloMotor,
        serialMotor,
        arregloPlacas,
        plantaUbicacion,
        condicion,
        ano
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getEquipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getEquipoById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteEquipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const equipoDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getEquipoById);
    await pool.request().input("Id", id).query(querys.deleteEquipo);

    res.json(equipoDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateEquipoById = async (req, res) => {
  const { tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano  } = req.body;
  const { id } = req.params;

  if (tipoMaquina == null || modelo == null || marca == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  await pool
      .request()
      .input("tipoMaquina", sql.VarChar, tipoMaquina)
      .input("modelo", sql.VarChar, modelo)
      .input("marca", sql.VarChar, marca)
      .input("serialMaquina", sql.VarChar, serialMaquina)
      .input("modeloMotor", sql.VarChar, modeloMotor)
      .input("serialMotor", sql.VarChar, serialMotor)
      .input("arregloPlacas", sql.VarChar, arregloPlacas)
      .input("plantaUbicacion", sql.VarChar, plantaUbicacion)
      .input("condicion", sql.VarChar, condicion)
      .input("ano", sql.VarChar, ano)
      .input("id", sql.Int, id)
    .query(querys.updateEquipoById);

    res.json("Registro actualizado con éxito")
};
