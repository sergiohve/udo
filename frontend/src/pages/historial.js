import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import Loading from "../components/loading";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import ClearIcon from "@mui/icons-material/Clear";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import camion from "../assets/camion.png";
import GraficaTimeRepair from "../components/graphics";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${camion})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  
   
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const styleRegister = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "id", label: "# reparación", minWidth: 120 },
  { id: "nombreUnidad", label: "Nombre de la unidad", minWidth: 170 },
  { id: "tipoMaquina", label: "Tipo de maquina", minWidth: 170 },
  { id: "modelo", label: "Modelo", minWidth: 100 },
  {
    id: "marca",
    label: "Marca",
    minWidth: 170,
  },
  {
    id: "serialMaquina",
    label: "Serial de la máquina",
    minWidth: 170,
  },
  {
    id: "modeloMotor",
    label: "Modelo del motor",
    minWidth: 170,
  },
  {
    id: "serialMotor",
    label: "Serial del motor",
    minWidth: 170,
  },
  {
    id: "arregloPlacas",
    label: "Arreglo de placas",
    minWidth: 170,
  },
  {
    id: "plantaUbicacion",
    label: "Ubicación de la planta",
    minWidth: 230,
  },
  {
    id: "condicion",
    label: "Condición",
    minWidth: 170,
  },
  {
    id: "ano",
    label: "Año",
    minWidth: 170,
  },
  {
    id: "fechaReparacion",
    label: "Fecha de reparación",
    minWidth: 170,
  },
  {
    id: "serialUnidad",
    label: "Serial de la unidad",
    minWidth: 170,
  },
  {
    id: "tallerReparacion",
    label: "Taller de la reparación",
    minWidth: 210,
  },
  {
    id: "nombreMecanico",
    label: "Nombre del mecanico",
    minWidth: 200,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ubicacionTaller",
    label: "Ubicación del taller",
    minWidth: 170,
  },
  {
    id: "nombreConductor",
    label: "Nombre del conductor",
    minWidth: 170,
  },
  {
    id: "nombrePieza",
    label: "Nombre de la pieza",
    minWidth: 170,
  },
  {
    id: "marcaPieza",
    label: "Marca de la pieza",
    minWidth: 170,
  },
  {
    id: "serialPieza",
    label: "Serial de la pieza",
    minWidth: 170,
  },
  {
    id: "marcaAceite",
    label: "Marca del aceite",
    minWidth: 170,
  },
  {
    id: "descripCambioAceite",
    label: "Detalle de la reparación",
    minWidth: 300,
  },
];

function Historial() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [id, setId] = useState("");
  const [editUnit, setEditUnit] = useState(false);
  const [annoGrafica, setAnnoGrafica] = useState(2025);
  
  const [typeOperations, setTypeOperations] = useState(false);
  const [form, setForm] = useState({
    tipoMaquina: "",
    modelo: "",
    marca: "",
    serialMaquina: "",
    modeloMotor: "",
    serialMotor: "",
    arregloPlacas: "",
    plantaUbicacion: "",
    condicion: "",
    anno: "",
    fechaReparacion: "",
    serialUnidad: "",
    tallerReparacion: "",
    nombreConductor: "",
    nombreMecanico: "",
    ubicacionTaller: "",
    nombrePieza: "",
    marcaPieza: "",
    serialPieza: "",
    marcaAceite: "",
    descripCambioAceite: "",
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    const headers = [
      [
        {
          content: "Información de la Unidad",
          colSpan: 2,
          styles: { halign: "center" },
        },
      ],
    ];
    autoTable(doc, {
      html: "#my-table",
      headers,
      styles: {
        cellPadding: 1,
        fontSize: 4,
      },
    });
    doc.save("HistorialDeReparaciones.pdf");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/");
    window.location.reload();
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:4000/equipos/${id}`
      );
      if (response) {
        handleEquipos();
        setIsLoading(false);
        setOpen(false);
      }
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    const {
      tipoMaquina,
      modelo,
      marca,
      serialMaquina,
      modeloMotor,
      serialMotor,
      arregloPlacas,
      plantaUbicacion,
      condicion,
      anno: ano,
      fechaReparacion: fechaReparacion,
      serialUnidad: serialUnidad,
      tallerReparacion: tallerReparacion,
      nombreMecanico: nombreMecanico,
      nombreConductor: nombreConductor,
      ubicacionTaller: ubicacionTaller,
      nombrePieza: nombrePieza,
      marcaPieza: marcaPieza,
      serialPieza: serialPieza,
      marcaAceite: marcaAceite,
      descripCambioAceite: descripCambioAceite,
    } = form;
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/equipos/${id}`, {
        tipoMaquina,
        modelo,
        marca,
        serialMaquina,
        modeloMotor,
        serialMotor,
        arregloPlacas,
        plantaUbicacion,
        condicion,
        ano,
        fechaReparacion,
        serialUnidad,
        tallerReparacion,
        nombreConductor,
        nombreMecanico,
        ubicacionTaller,
        nombrePieza,
        marcaPieza,
        serialPieza,
        marcaAceite,
        descripCambioAceite,
      });
      if (response) {
        setIsLoading(false);
        setOpen(true);
        setTypeOperations("");
        setEditUnit(false);
        handleEquipos();
      }
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const write = e.target;
    if (write.name === "tipoMaquina") {
      setForm({ ...form, tipoMaquina: write.value });
    } else if (write.name === "modelo") {
      setForm({ ...form, modelo: write.value });
    }
    if (write.name === "marca") {
      setForm({ ...form, marca: write.value });
    }
    if (write.name === "serialMaquina") {
      setForm({ ...form, serialMaquina: write.value });
    }
    if (write.name === "modeloMotor") {
      setForm({ ...form, modeloMotor: write.value });
    }
    if (write.name === "serialMotor") {
      setForm({ ...form, serialMotor: write.value });
    }
    if (write.name === "arregloPlacas") {
      setForm({ ...form, arregloPlacas: write.value });
    }
    if (write.name === "plantaUbicacion") {
      setForm({ ...form, plantaUbicacion: write.value });
    }
    if (write.name === "condicion") {
      setForm({ ...form, condicion: write.value });
    }
    if (write.name === "anno") {
      setForm({ ...form, anno: write.value });
    }
    if (write.name === "fechaReparacion") {
      setForm({ ...form, fechaReparacion: write.value });
    }
    if (write.name === "serialUnidad") {
      setForm({ ...form, serialUnidad: write.value });
    }
    if (write.name === "tallerReparacion") {
      setForm({ ...form, tallerReparacion: write.value });
    }
    if (write.name === "nombreMecanico") {
      setForm({ ...form, nombreMecanico: write.value });
    }
    if (write.name === "ubicacionTaller") {
      setForm({ ...form, ubicacionTaller: write.value });
    }
    if (write.name === "nombreConductor") {
      setForm({ ...form, nombreConductor: write.value });
    }
    if (write.name === "nombrePieza") {
      setForm({ ...form, nombrePieza: write.value });
    }
    if (write.name === "marcaPieza") {
      setForm({ ...form, marcaPieza: write.value });
    }
    if (write.name === "serialPieza") {
      setForm({ ...form, serialPieza: write.value });
    }
    if (write.name === "marcaAceite") {
      setForm({ ...form, marcaAceite: write.value });
    }
    if (write.name === "descripCambioAceite") {
      setForm({ ...form, descripCambioAceite: write.value });
    }
  };
  function obtenerRegistrosReparacionPorMes(arrayMaquinas, anio) {
    const registrosReparacion = Array(12).fill(0); // Inicializa un arreglo con 12 elementos (meses) a 0

    arrayMaquinas.forEach((maquina) => {
        const fechaReparacion = new Date(maquina.fechaReparacion);
        const mes = fechaReparacion.getMonth(); // Obtiene el mes (0-11)
        const anioReparacion = fechaReparacion.getFullYear(); // Obtiene el año

        // Filtra por año antes de incrementar el contador
        if (anioReparacion === anio) {
            registrosReparacion[mes]++; // Incrementa el contador del mes correspondiente
        }
    });

    return registrosReparacion;
}
  console.log(obtenerRegistrosReparacionPorMes(dataSearch));

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const modal =
    typeOperations === "Eliminar" ? (
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">
            ¿Estas seguro que deseas eliminar el registro?
          </Typography>
          <div className="ml-auto right-0 items-end">
            <Grid
              container
              className="w-full mt-4 gap-3 ml-32 right-0 items-end"
            >
              <Button
                variant="outlined"
                className="ml-auto right-0"
                onClick={() => {
                  setId("");
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                className="ml-auto right-0"
                onClick={handleDelete}
              >
                Si
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>
    ) : (
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRegister}>
          <div className="flex w-full mb-5">
            <Typography variant="h6" className="w-[300px]">
              Detalle de registro
            </Typography>
            <Grid container className="ml-2">
              <Button
                variant="outlined"
                color="primary"
                className="ml-auto"
                onClick={() => {
                  if (editUnit) {
                    setEditUnit(false);
                  } else {
                    setEditUnit(true);
                    scrollToSection("reparacion");
                  }
                }}
              >
                {editUnit ? "Cancelar edición" : "Editar unidad"}
              </Button>
            </Grid>
            <div variant="h6" className="ml-auto">
              <ClearIcon
                fontSize="medium"
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  setId("");
                  setForm({
                    tipoMaquina: "",
                    modelo: "",
                    marca: "",
                    serialMaquina: "",
                    modeloMotor: "",
                    serialMotor: "",
                    arregloPlacas: "",
                    plantaUbicacion: "",
                    condicion: "",
                    anno: "",
                    fechaReparacion: "",
                    serialUnidad: "",
                    tallerReparacion: "",
                    nombreConductor: "",
                    nombreMecanico: "",
                    ubicacionTaller: "",
                    nombrePieza: "",
                    marcaPieza: "",
                    serialPieza: "",
                    marcaAceite: "",
                    descripCambioAceite: "",
                  });
                }}
              />
            </div>
          </div>
          <div
            className="w-full"
            style={{ overflowY: "scroll", height: "80%" }}
          >
            <form className="ml-3 mr-6 p-4" onSubmit={handleSubmit}>
              <div className="w-full">
                <Typography variant="h6" className="mt-4">
                  Información de la unidad
                </Typography>
                <Grid className="flex gap-2 mt-4">
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      inputProps={{ maxLength: 30 }}
                      label="Tipo de maquina"
                      className="w-full"
                      name="tipoMaquina"
                      value={form.tipoMaquina?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      label="Modelo"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="modelo"
                      value={form.modelo?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled
                      label="Marca"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="marca"
                      value={form.marca?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      label="Serial de maquina"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="serialMaquina"
                      value={form.serialMaquina?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled
                      label="Modelo de motor"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="modeloMotor"
                      value={form.modeloMotor?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      label="Serial de motor"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="serialMotor"
                      value={form.serialMotor?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled
                      label="Arreglo o placas"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="arregloPlacas"
                      value={form.arregloPlacas?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      label="Ubicación de planta"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="plantaUbicacion"
                      value={form.plantaUbicacion?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4 mb-6">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled
                      label="Condición"
                      inputProps={{ maxLength: 30 }}
                      className="w-full"
                      name="condicion"
                      onChange={handleChange}
                      value={form.condicion?.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled
                      label="Año"
                      inputProps={{ maxLength: 4 }}
                      className="w-full"
                      name="anno"
                      onChange={handleChange}
                      value={form.anno?.trim()}
                    />
                  </Grid>
                </Grid>
                <div id="reparacion" />
                <Typography variant="h6" className="mt-6">
                  Reporte de reparación, Informacion de la unidad y taller
                </Typography>

                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      label="Fecha"
                      inputProps={{ maxLength: 50 }}
                      className="w-full"
                      name="fechaReparacion"
                      type="date"
                      onChange={handleChange}
                      value={form.fechaReparacion?.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 30 }}
                      label="Serial de la unidad"
                      className="w-full"
                      name="serialUnidad"
                      value={form.serialUnidad?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 40 }}
                      label="Taller donde se realizo la reparación"
                      className="w-full"
                      name="tallerReparacion"
                      onChange={handleChange}
                      value={form.tallerReparacion?.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 40 }}
                      label="Nombre del mecanico"
                      className="w-full"
                      name="nombreMecanico"
                      value={form.nombreMecanico?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4 mb-6">
                  <Grid item xs={12} sm={4} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 50 }}
                      label="Ubicacion del taller"
                      className="w-full"
                      name="ubicacionTaller"
                      onChange={handleChange}
                      value={form.ubicacionTaller?.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 40 }}
                      label="Nombre del conductor de la unidad"
                      className="w-full"
                      name="nombreConductor"
                      value={form.nombreConductor?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" className="mt-10">
                  Reporte de reparación, Piezas
                </Typography>

                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 30 }}
                      label="Nombre de la pieza"
                      className="w-full"
                      name="nombrePieza"
                      onChange={handleChange}
                      value={form.nombrePieza?.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 20 }}
                      label="Marca de la pieza"
                      className="w-full"
                      name="marcaPieza"
                      value={form.marcaPieza?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 40 }}
                      label="Serial de la pieza"
                      className="w-full"
                      name="serialPieza"
                      value={form.serialPieza?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid className="w-full flex gap-2 mt-4">
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      inputProps={{ maxLength: 20 }}
                      label="Detalle de la reparación"
                      className="w-full"
                      name="marcaAceite"
                      value={form.marcaAceite?.trim()}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      disabled={!editUnit}
                      onChange={handleChange}
                      inputProps={{ maxLength: 100 }}
                      label="Detalle de la reparación"
                      className="w-full"
                      name="descripCambioAceite"
                      multiline
                      rows={4}
                      value={form.descripCambioAceite?.trim()}
                    />
                  </Grid>
                </Grid>
                <Grid container className="mt-4">
                  <Button variant="contained" type="submit" className="ml-auto">
                    Guardar unidad
                  </Button>
                </Grid>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    );
  const handleEquipos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/equipos");
      if (response) {
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleEquipos();
  }, []);
  function searchAllFields(data1, searchTerm) {
    // Convert search term to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();

    // Filter the data based on the search term
    return data1.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTermLower)
      );
    });
  }
  useEffect(() => {
    if (buscar === "") {
      setDataSearch(data);
    } else {
      const dataSearch = searchAllFields(data, buscar.trim());
      setDataSearch(dataSearch);
     
    }
  }, [buscar, data, annoGrafica]);
  console.log(dataSearch)
  const handleAnterior=()=>{
    setAnnoGrafica(annoGrafica-1)
  }
  const handleSiguiente=()=>{
    setAnnoGrafica(annoGrafica+1)
  }

  return (
    <Grid container className={classes.root}>
      <Loading open={isLoading} handleClose={() => setIsLoading(false)} />

      {modal}
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        style={{ 
          paddingTop: "250px", 
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff" 
       }}
        className={`h-[100vh]  mt-[40px] text-[20px] text-[#fff] items-center text-center bg-indigo-500 opacity-900 ${classes.image}`}
      >
        <div
          onClick={() => navigate("/gestionUnidades")}
          className="text-center mr-10 mt-3 font-bold cursor-pointer opa"
        >
          Gestión de unidades
        </div>
        <div
          onClick={() => navigate("/historial")}
          className="text-center mr-10 mt-3 font-bold cursor-pointer"
          style={{ color: "red", fontWeight: 900 }}
        >
          Historial de reparaciones
        </div>
        <div
          onClick={() => navigate("/reporteUnidades")}
          className="text-center mr-10 mt-3 font-bold cursor-pointer"
        >
          Reporte de unidades
        </div>
        <div
          onClick={handleLogout}
          className="text-center mr-10 mt-3 font-bold cursor-pointer"
        >
          Cerrar sesión
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        className={`h-[100vh] mt-[40px] text-[20px] items-center text-center`}
      >
        <div className="text-center mb-3 mt-3 font-bold text-[26px]">
          Historial de reparaciones
        </div>

        <div container className="mt-4 flex gap-5 ml-2">
          <TextField
            onChange={(e) => setBuscar(e.target.value)}
            label="Buscar"
            className="w-full"
            name="Buscar"
            value={buscar}
            style={{ width: 200, height: 10, padding: 2 }}
            sx={{ paddingTop: 30 }}
          />
          <div onClick={handleDownload}>
            <img
              src={require("../assets/pdf.png")}
              alt="Mi imagen"
              width={58}
              height={58}
              style={{ marginBottom: 20 }}
            />
          </div>
        </div>

        {dataSearch.length > 0 ? (
          <Paper className="ml-3 mr-6">
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table" id="my-table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#abdbe3",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell style={{ backgroundColor: "#abdbe3" }}>
                      Eliminar
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#abdbe3" }}>
                      Modificar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSearch.map((row) => {
                 
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell
                          className="cursor-pointer"
                          onClick={() => {
                            setTypeOperations("Eliminar");
                            setOpen(true);
                            setId(row.id);
                          }}
                        >
                          <DeleteIcon />
                        </TableCell>
                        <TableCell
                          className="cursor-pointer"
                          onClick={() => {
                            setTypeOperations("Modificar");
                            setOpen(true);
                            setId(row.id);
                            setForm({
                              tipoMaquina: row.tipoMaquina,
                              modelo: row.modelo,
                              marca: row.marca,
                              serialMaquina: row.serialMaquina,
                              modeloMotor: row.modeloMotor,
                              serialMotor: row.serialMotor,
                              arregloPlacas: row.arregloPlacas,
                              plantaUbicacion: row.plantaUbicacion,
                              condicion: row.condicion,
                              anno: row.ano,
                              fechaReparacion: row.fechaReparacion,
                              serialUnidad: row.serialUnidad,
                              tallerReparacion: row.tallerReparacion,
                              nombreConductor: row.nombreConductor,
                              nombreMecanico: row.nombreMecanico,
                              ubicacionTaller: row.ubicacionTaller,
                              nombrePieza: row.nombrePieza,
                              marcaPieza: row.marcaPieza,
                              serialPieza: row.serialPieza,
                              marcaAceite: row.marcaAceite,
                              descripCambioAceite: row.descripCambioAceite,
                            });
                          }}
                        >
                          <AppsIcon />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: 100 }}
          >
            No hay datos
          </Typography>
        )}
        {dataSearch.length > 0 && (
          <>
            <div className="flex justify-center w-full mt-5 gap-3">
              <img
                src={require("../assets/left-arrow.png")}
                alt="Flecha left"
                width={18}
                onClick={handleAnterior}
                 className="cursor-pointer"
                style={{height: 18, marginTop: 13}}
              />
              <div className="text-center mb-3 font-bold text-[26px]">
              Reporten en el año {annoGrafica}
              </div>{" "}
              <img
                src={require("../assets/right-arrow.png")}
                alt="Flecha right"
                width={18}
                className="cursor-pointer"
                onClick={handleSiguiente}
                style={{height: 18, marginTop: 13}}
              />
            </div>
            <div>
              <GraficaTimeRepair
                
                arrayMaquinas={obtenerRegistrosReparacionPorMes(dataSearch, annoGrafica)}
              />
            </div>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Historial;
