export default {
  getAllUnidades: "SELECT * FROM Unidades",
  addNewUnidades:
    "INSERT INTO Unidades(nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano) VALUES (@nombreUnidad, @tipoMaquina, @modelo, @marca, @serialMaquina, @modeloMotor, @serialMotor, @arregloPlacas, @plantaUbicacion, @condicion, @ano)",
  registerUser:
    "INSERT INTO Usuarios(email, password, name) VALUES (@email, @password, @name)",
  getUnidadesById: "SELECT * FROM Unidades Where Id = @Id",
  deleteUnidades: "DELETE FROM [webstore].[dbo].[Unidades] WHERE Id = @Id",
  updateUnidadesById:
    "UPDATE Unidades SET NombreUnidad = @nombreUnidad, TipoMaquina = @tipoMaquina, Modelo = @modelo, Marca=@marca, SerialMaquina=@serialMaquina, ModeloMotor= @modeloMotor, SerialMotor=@serialMotor, ArregloPlacas=@arregloPlacas, PlantaUbicacion= @plantaUbicacion, Condicion=@condicion, Ano=@ano WHERE Id = @Id",
  getAllEquipos: "SELECT * FROM ListadoEquipos",
  addNewEquipo:
    "INSERT INTO ListadoEquipos(nombreUnidad, tipoMaquina, modelo, marca, serialMaquina, modeloMotor, serialMotor, arregloPlacas, plantaUbicacion, condicion, ano, fechaReparacion, serialUnidad, tallerReparacion, nombreMecanico, ubicacionTaller, nombreConductor, nombrePieza, marcaPieza, serialPieza, descripCambioAceite, marcaAceite) VALUES (@nombreUnidad, @tipoMaquina, @modelo, @marca, @serialMaquina, @modeloMotor, @serialMotor, @arregloPlacas, @plantaUbicacion, @condicion, @ano, @fechaReparacion, @serialUnidad, @tallerReparacion, @nombreMecanico, @ubicacionTaller, @nombreConductor, @nombrePieza, @marcaPieza, @serialPieza, @descripCambioAceite, @marcaAceite)",
  getEquipoById: "SELECT * FROM ListadoEquipos Where Id = @Id",
  deleteEquipo: "DELETE FROM [webstore].[dbo].[ListadoEquipos] WHERE Id = @Id",
  updateEquipoById:
    "UPDATE ListadoEquipos SET TipoMaquina = @tipoMaquina, Modelo = @modelo, Marca=@marca, SerialMaquina=@serialMaquina, ModeloMotor= @modeloMotor, SerialMotor=@serialMotor, ArregloPlacas=@arregloPlacas, PlantaUbicacion= @plantaUbicacion, Condicion=@condicion, Ano=@ano, FechaReparacion=@fechaReparacion, SerialUnidad=@serialUnidad, TallerReparacion=@tallerReparacion, NombreMecanico=@nombreMecanico, UbicacionTaller=@ubicacionTaller, NombreConductor=@nombreConductor, NombrePieza=@nombrePieza, MarcaPieza=@marcaPieza, SerialPieza=@serialPieza, DescripCambioAceite=@descripCambioAceite, MarcaAceite=@marcaAceite WHERE Id=@Id",
};
