export default {
  getAllProducts: "SELECT * FROM Products",
  addNewProduct:
    "INSERT INTO Products(name, description, quantity) VALUES (@name, @description, @quantity)",
  registerUser:
    "INSERT INTO Usuarios(email, password, name) VALUES (@email, @password, @name)",
  getProductById: "SELECT * FROM Products Where Id = @Id",
  deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id = @Id",
  updateProductById:
    "UPDATE Products SET Name= @name, Description = @description, Quantity = @quantity WHERE Id =@Id",

  getAllEquipos: "SELECT * FROM ListadoEquipos",
  addNewEquipo:
    "INSERT INTO ListadoEquipos(tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano) VALUES (@tipoMaquina, @modelo, @marca, @serialMaquina, @modeloMotor, @serialMotor, @arregloPlacas, @plantaUbicacion, @condicion, @ano)",
  getEquipoById: "SELECT * FROM ListadoEquipos Where Id = @Id",
  deleteEquipo: "DELETE FROM [webstore].[dbo].[ListadoEquipos] WHERE Id = @Id",
  updateEquipoById:
    "UPDATE ListadoEquipos SET TipoMaquina = @tipoMaquina, Modelo = @modelo, Marca=@marca, SerialMaquina=@serialMaquina, ModeloMotor= @modeloMotor, SerialMotor=@serialMotor, ArregloPlacas=@arregloPlacas, PlantaUbicacion= @plantaUbicacion, Condicion=@condicion, Ano=@ano WHERE Id =@Id",
};
