import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import Loading from "../components/loading";
import DeleteIcon from '@mui/icons-material/Delete';
import AppsIcon from '@mui/icons-material/Apps';
import ClearIcon from '@mui/icons-material/Clear';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import camiones from "../assets/camiones.png"


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${camiones})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 1
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const styleRegister = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns = [
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
  }
];




function GestionUnidades() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [editUnit, setEditUnit] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const location = useLocation();

  const handleDownload = () => {
    const doc = new jsPDF();
    const headers = [
      [{ content: 'Información de la Unidad', colSpan: 2, styles: { halign: 'center' } }],
    ];
    autoTable(doc, {
      html: '#my-table', headers, styles: {
        cellPadding: 2,
        fontSize: 6
      }
    });
    doc.save('UnidadesGestionadas.pdf');
  };

  const [open, setOpen] = useState(false);
  const [buscar, setBuscar] = useState("");

  const [id, setId] = useState("");
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
    anno: ""
  })



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
    setIsLoading(true)
    try {
      const response = await axios.delete(`http://localhost:4000/gestionUnidades/${id}`);
      if (response) {
        handleEquipos()
        setIsLoading(false)
        setOpen(false)

      }
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false)
    }


  };
  const handleChange = (e) => {
    const write = e.target;
    if (write.name === "nombreUnidad") {
      setForm({ ...form, nombreUnidad: write.value })
    }
    if (write.name === "tipoMaquina") {
      setForm({ ...form, tipoMaquina: write.value })
    }
    else if (write.name === "modelo") {
      setForm({ ...form, modelo: write.value })
    }
    if (write.name === "marca") {
      setForm({ ...form, marca: write.value })
    }
    if (write.name === "serialMaquina") {
      setForm({ ...form, serialMaquina: write.value })
    }
    if (write.name === "modeloMotor") {
      setForm({ ...form, modeloMotor: write.value })
    }
    if (write.name === "serialMotor") {
      setForm({ ...form, serialMotor: write.value })
    }
    if (write.name === "arregloPlacas") {
      setForm({ ...form, arregloPlacas: write.value })
    }
    if (write.name === "plantaUbicacion") {
      setForm({ ...form, plantaUbicacion: write.value })
    }
    if (write.name === "condicion") {
      setForm({ ...form, condicion: write.value })
    }
    if (write.name === "anno") {
      setForm({ ...form, anno: write.value })
    }

  };
  const handleEquipos = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:4000/gestionUnidades");
      if (response) {

        setData(response.data.data)
        setIsLoading(false)

      }
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false)
    }
  };
  const handleSubmit = async (e) => {
    setIsLoading(true)
    const {
      nombreUnidad,
      tipoMaquina,
      modelo,
      marca,
      serialMaquina,
      modeloMotor,
      serialMotor,
      arregloPlacas,
      plantaUbicacion: plantaUbicacion,
      condicion,
      anno: ano,

    } = form;
    e.preventDefault();

    try {
      if(editUnit && typeOperations==="Modificar"){
        const response = await axios.put(`http://localhost:4000/gestionUnidades/${id}`, {
          nombreUnidad,
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
        });
        if (response) {
          setIsLoading(false)
          setOpen(true)
          setTypeOperations("")
          setEditUnit(false)
          handleEquipos()
        }
      }else{
        const response = await axios.post("http://localhost:4000/gestionUnidades", {
          nombreUnidad,
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
        });
        if (response) {
          setIsLoading(false)
          setOpen(true)
          setForm({
            nombreUnidad: "",
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
  
          })
          handleEquipos()
        }
      }
      
      
    } catch (error) {
      setMessageError("Problemas en el servidor");
      setIsLoading(false)
    }


  };

  const modal = typeOperations === "Eliminar" ? <Modal
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
        <Grid container className="w-full mt-4 gap-3 ml-32 right-0 items-end">
          <Button variant="outlined" className="ml-auto right-0" onClick={() => {
            setId("")
            setOpen(false)
          }}>Cancelar</Button>
          <Button variant="contained" className="ml-auto right-0" onClick={handleDelete}>Si</Button>
        </Grid>
      </div>
    </Box>
  </Modal> : <Modal
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >

    <Box sx={styleRegister}>
      <div className="flex w-full mb-5">
        <Typography variant="h6" className="w-[300px]">
          {typeOperations === "Modificar" ? "Detalle de registro" : "Crear unidad"}
        </Typography>
        {typeOperations==="Modificar" && <Grid container className="ml-2">
          <Button variant="outlined" color="primary" className="ml-auto" onClick={() => {
            if(editUnit){
              setEditUnit(false)
            }else{
              setEditUnit(true)
            }
           
            }}>{editUnit ? "Cancelar edición" : "Editar unidad"}</Button>
        </Grid>}
        <div variant="h6" className="ml-auto">
          <ClearIcon fontSize="medium" className="cursor-pointer" onClick={() => {
            setOpen(false)
            setId("")
            setEditUnit(false)
            setForm({
              nombreUnidad: "",
              tipoMaquina: "",
              modelo: "",
              marca: "",
              serialMaquina: "",
              modeloMotor: "",
              serialMotor: "",
              arregloPlacas: "",
              plantaUbicacion: "",
              condicion: "",
              anno: ""
            })
          }} />
        </div>
      </div>

      <div className="w-full" style={{ overflowY: "scroll", height: "80%" }}>
        <form className="ml-3 mr-6 p-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <Typography variant="h6" className="mt-4">
              Información de la unidad
            </Typography>
            <Grid className="flex gap-2 mt-4">
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Nombre de la unidad"
                  className="w-full"
                  name="nombreUnidad"
                  inputProps={{ maxLength: 30 }}
                  value={form.nombreUnidad?.trim()}
                />
              </Grid>

            </Grid>
            <Grid className="flex gap-2 mt-4">
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  select
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Tipo de maquina"
                  className="w-full"
                  name="tipoMaquina"
                  inputProps={{ maxLength: 30 }}
                  value={form.tipoMaquina?.trim()}
                >
                  <MenuItem value="Camion">
                    Camion
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Marca"
                  className="w-full"
                  inputProps={{ maxLength: 30 }}
                  name="marca"
                  value={form.marca}
                />
              </Grid>

            </Grid>
            <Grid className="w-full flex gap-2 mt-4">
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Modelo"
                  className="w-full"
                  inputProps={{ maxLength: 30 }}
                  name="modelo"
                  value={form.modelo?.trim()}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Serial de maquina"
                  inputProps={{ maxLength: 30 }}
                  className="w-full"
                  name="serialMaquina"
                  value={form.serialMaquina?.trim()}
                />
              </Grid>
            </Grid>
            <Grid className="w-full flex gap-2 mt-4">
              <Grid item xs={12} sm={4} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Modelo de motor"
                  inputProps={{ maxLength: 30 }}
                  className="w-full"
                  name="modeloMotor"
                  value={form.modeloMotor?.trim()}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Serial de motor"
                  inputProps={{ maxLength: 30 }}
                  className="w-full"
                  name="serialMotor"
                  value={form.serialMotor?.trim()}
                />
              </Grid>
            </Grid>
            <Grid className="w-full flex gap-2 mt-4">
              <Grid item xs={12} sm={4} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  inputProps={{ maxLength: 30 }}
                  label="Arreglo o placas"
                  className="w-full"
                  name="arregloPlacas"
                  value={form.arregloPlacas?.trim()}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  label="Ubicación de planta"
                  inputProps={{ maxLength: 30 }}
                  className="w-full"
                  name="plantaUbicacion"
                  value={form.plantaUbicacion?.trim()}
                />
              </Grid>
            </Grid>
            <Grid className="w-full flex gap-2 mt-4 mb-6">
              <Grid item xs={12} sm={4} md={6}>
                <TextField
                  select
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  inputProps={{ maxLength: 30 }}
                  label="Condición"
                  className="w-full"
                  name="condicion"
                  value={form.condicion?.trim()}
                >
                  <MenuItem value="Activo">
                    Activo
                  </MenuItem>
                  <MenuItem value="Inactivo">
                    Inactivo
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  disabled={!editUnit && typeOperations === "Modificar"}
                  onChange={handleChange}
                  inputProps={{ maxLength: 30 }}
                  label="Año"
                  className="w-full"
                  name="anno"
                  value={form.anno?.trim()}
                />

              </Grid>
            </Grid>
            <Grid container className="mt-4">
              <Button variant="contained" type="submit" className="ml-auto">Guardar unidad</Button>
            </Grid>


          </div>
        </form>
      </div>

    </Box>
  </Modal>;

  useEffect(() => {
    handleEquipos()
  }, [])

  function buscarParcialmente(arrayObjetos, cadenaBusqueda) {
    const resultados = [];
    const cadenaBusquedaMinuscula = cadenaBusqueda.toLowerCase();

    arrayObjetos.forEach(objeto => {
      for (const propiedad in objeto) {
        const valorPropiedad = objeto[propiedad].toString().toLowerCase(); // Convertimos a string y a minúsculas para una comparación más precisa
        if (valorPropiedad.includes(cadenaBusquedaMinuscula)) {
          resultados.push(objeto);
          break; // Si encontramos una coincidencia en un objeto, pasamos al siguiente
        }
      }
    });

    return resultados;
  }
  useEffect(() => {
    if (buscar === "") {
      setDataSearch(data)
    } else {
      const dataSearch = buscarParcialmente(data, buscar)
      setDataSearch(dataSearch)
    }
  }, [buscar, data])

  return (
    <Grid container className={classes.root}>
      <Loading open={isLoading} handleClose={() => setIsLoading(false)} />
      {modal}
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        style={{ paddingTop: "250px" }}
        className={`h-[100vh]  mt-[40px] text-[20px] text-[#fff] items-center text-center ${classes.image}`}
      >
        <div
          onClick={() => navigate("/gestionUnidades")}
          className={`text-center mr-10 mt-3 font-bold cursor-pointer text-red`}
        style={{color: "red", fontWeight: 900}}
        >
          Gestión de unidades
        </div>
        <div
          onClick={() => navigate("/historial")}
          className="text-center mr-10 mt-3 font-bold cursor-pointer"
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
          Unidades
        </div>
        <div container className="mt-4 flex gap-5">

          <Button variant="contained" style={{ marginLeft: 12, marginBottom: 15, height: 58 }} className="ml-10" onClick={() => {
            setOpen(true)
            setTypeOperations("Crear")
          }}>Nueva unidad</Button>
          <TextField

            onChange={(e) => setBuscar(e.target.value)}
            label="Buscar"
            className="w-full"
            name="Buscar"
            value={buscar}
            style={{ width: 200, height: 10, padding: 2 }}
            sx={{ paddingTop: 30 }}
          />
          <div onClick={handleDownload}><img src={require("../assets/pdf.png")} alt="Mi imagen" width={58} height={58} style={{ marginBottom: 20 }} /></div>
        </div>

        {
          dataSearch.length > 0 ? <Paper className="ml-3 mr-6"><TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" id="my-table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: "#abdbe3" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}

                  <TableCell
                    style={{ backgroundColor: "#abdbe3" }}
                  >
                    Eliminar
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#abdbe3" }}
                  >
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
                      <TableCell className="cursor-pointer" onClick={() => {
                        setTypeOperations("Eliminar")
                        setOpen(true)
                        setId(row.id)
                      }}>
                        <DeleteIcon />
                      </TableCell>
                      <TableCell className="cursor-pointer" onClick={() => {
                        setTypeOperations("Modificar")
                        setOpen(true)

                        setId(row.id)
                        setForm({
                          nombreUnidad: row.nombreUnidad,
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
                          descripCambioAceite: row.descripCambioAceite
                        })

                      }}>
                        <AppsIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper> : <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: 50 }}>
            No hay datos
          </Typography>
        }


      </Grid>
    </Grid>
  );
}

export default GestionUnidades;
