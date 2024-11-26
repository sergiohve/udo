import { getConnection, sql } from "../database/connection";
import querys from "../database/querys";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProducts);

    res.json({ data: result.recordset, length: result.recordset.length });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { name, description } = req.body;
  let { quantity } = req.body;

  if (name == null || description == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Por favor llena los campos" });
  }
  if (quantity == null) {
    quantity = 0;
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(querys.addNewProduct);

    res.json({
      data: {
        name,
        description,
        quantity,
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductById);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const productDeleted = await pool
      .request()
      .input("Id", id)
      .query(querys.getProductById);
    await pool.request().input("Id", id).query(querys.deleteProduct);

    res.json(productDeleted);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
};

export const updateProductById = async (req, res) => {
  const { name, description, quantity } = req.body;
  const { id } = req.params;

  if (name == null || description == null || quantity == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("description", sql.Text, description)
    .input("quantity", sql.Int, quantity)
    .input("id", sql.Int, id)
    .query(querys.updateProductById);

    res.json({name, description, quantity})
};
