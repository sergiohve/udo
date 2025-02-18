import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import Loading from "../components/loading";
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

function ReporteUnidades() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [messageError, setMessageError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [nombreUnidad, setNombreUnidad] = useState("");
    const [idSelected, setIdSelected] = useState("");
    const [unidades, setUnidades] = useState([]);
    const [unidadSelected, setUnidadSelected] = useState([]);

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
        reparacionPieza: [
            {
                nombrePieza: "",
                marcaPieza: "",
                serialPieza: "",
                marcaAceite: "",
                descripCambioAceite: ""
            }
        ]

    })

    const handleLogout = () => {
        localStorage.setItem("token", "");
        navigate("/");
        window.location.reload();
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
        if (write.name === "fechaReparacion") {
            setForm({ ...form, fechaReparacion: write.value })
        }
        if (write.name === "serialUnidad") {
            setForm({ ...form, serialUnidad: write.value })
        }
        if (write.name === "tallerReparacion") {
            setForm({ ...form, tallerReparacion: write.value })
        }
        if (write.name === "nombreMecanico") {
            setForm({ ...form, nombreMecanico: write.value })
        }
        if (write.name === "ubicacionTaller") {
            setForm({ ...form, ubicacionTaller: write.value })
        }
        if (write.name === "nombreConductor") {
            setForm({ ...form, nombreConductor: write.value })
        }
        if (write.name === "nombrePieza") {
            setForm({ ...form, nombrePieza: write.value })
        }
        if (write.name === "marcaPieza") {
            setForm({ ...form, marcaPieza: write.value })
        }
        if (write.name === "serialPieza") {
            setForm({ ...form, serialPieza: write.value })
        }
        if (write.name === "marcaAceite") {
            setForm({ ...form, marcaAceite: write.value })
        }
        if (write.name === "descripCambioAceite") {
            setForm({ ...form, descripCambioAceite: write.value })
        }
    };
    const modal = <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Se realizo el registro del reporte de vehiculo
            </Typography>
            <div className="ml-auto right-0 items-end">
                <Grid container className="w-full mt-4 gap-3 ml-auto right-0 items-end">

                    <Button variant="outlined" className="ml-auto right-0" onClick={() => {
                        setOpen(false)
                    }}>Ok</Button>
                    <Button variant="contained" className="ml-auto right-0" onClick={() => {
                        setOpen(false)
                        navigate("/historial")
                    }}>Ir a historial de reportes</Button>
                </Grid>
            </div>
        </Box>
    </Modal>;
    console.log(nombreUnidad, unidades)
    const handleSubmit = async (e) => {
        setIsLoading(true)
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
            tallerReparacion,
            nombreMecanico: nombreMecanico,
            nombreConductor: nombreConductor,
            ubicacionTaller: ubicacionTaller,
            nombrePieza: nombrePieza,
            marcaPieza: marcaPieza,
            serialPieza: serialPieza,
            marcaAceite: marcaAceite,
            descripCambioAceite: descripCambioAceite

        } = form;
        e.preventDefault();
       const unid=unidades.find(item=>item.id===nombreUnidad)
     console.log("Hola", unid)
        try {
            const response = await axios.post("http://localhost:4000/equipos", {
                nombreUnidad: unid.nombreUnidad,
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
                descripCambioAceite

            });
            if (response) {
                setIsLoading(false)
                setOpen(true)
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
                    descripCambioAceite: ""
                })
            }
        } catch (error) {
            setMessageError("Problemas en el servidor");
            setIsLoading(false)
        }


    };
    const handleUnidadesId = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:4000/gestionUnidades/${id}`);
            if (response) {

                setUnidadSelected(response.data.recordset)
                setForm({
                    tipoMaquina: response.data.recordset[0].tipoMaquina,
                    modelo: response.data.recordset[0].modelo,
                    marca: response.data.recordset[0].marca,
                    serialMaquina: response.data.recordset[0].serialMaquina,
                    modeloMotor: response.data.recordset[0].modeloMotor,
                    serialMotor: response.data.recordset[0].serialMotor,
                    arregloPlacas: response.data.recordset[0].arregloPlacas,
                    plantaUbicacion: response.data.recordset[0].plantaUbicacion,
                    condicion: response.data.recordset[0].condicion,
                    anno: response.data.recordset[0].ano,

                })
                setIsLoading(false)
            }
        } catch (error) {
            setMessageError("Problemas en el servidor");
            setIsLoading(false)
        }
    }
    useEffect(() => {
        handleUnidadesId(nombreUnidad)
    }, [nombreUnidad])

    const handleUnidades = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:4000/gestionUnidades`);
            if (response) {

                setUnidades(response.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            setMessageError("Problemas en el servidor");
            setIsLoading(false)
        }
    }
    useEffect(() => {
        handleUnidades(idSelected)
    }, [])

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
                className={`h-[100vh] text-[20px] text-[#fff] items-center text-center ${classes.image}`}
            >
                <div
                    onClick={() => navigate("/gestionUnidades")}
                    className="text-center mr-10 mt-3 font-bold cursor-pointer"
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
                    style={{ color: "red", fontWeight: 900 }}
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

                <div className="mt-4">
                    <div className="text-center mb-3 mt-3 font-bold text-[26px]">
                        Reporte
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
                                        select
                                        required
                                        onChange={(e) => {
                                            setNombreUnidad(e.target.value)
                                            
                                        }}
                                        label="Nombre de la unidad"
                                        className="w-full"
                                       
                                        name="nombreUnidad"
                                        value={nombreUnidad}
                                        inputProps={{ maxLength: 30 }}
                                        sx={{ textAlign: "left" }}
                                    >
                                        {unidades.map(item => {
                                            return <MenuItem value={item.id}>
                                                {item.nombreUnidad}
                                            </MenuItem>
                                        })
                                        }
                                    </TextField>
                                </Grid>

                            </Grid>
                            <Grid className="flex gap-2 mt-4">
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Tipo de maquina"
                                        className="w-full"
                                        name="tipoMaquina"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.tipoMaquina}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Modelo"
                                        className="w-full"
                                        name="modelo"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.modelo}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Marca"
                                        className="w-full"
                                        inputProps={{ maxLength: 30 }}
                                        name="marca"
                                        value={form.marca}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Serial de maquina"
                                        className="w-full"
                                        inputProps={{ maxLength: 30 }}
                                        name="serialMaquina"
                                        value={form.serialMaquina}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Modelo de motor"
                                        className="w-full"
                                        name="modeloMotor"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.modeloMotor}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Serial de motor"
                                        className="w-full"
                                        name="serialMotor"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.serialMotor}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Arreglo o placas"
                                        className="w-full"
                                        name="arregloPlacas"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.arregloPlacas}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        label="Ubicación de planta"
                                        className="w-full"
                                        name="plantaUbicacion"
                                        inputProps={{ maxLength: 30 }}
                                        value={form.plantaUbicacion}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4 mb-6">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 30 }}
                                        label="Condición"
                                        className="w-full"
                                        name="condicion"
                                        sx={{ alignItems: "left", textAlign: "left" }}
                                        value={form.condicion}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        disabled
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 4 }}
                                        label="Año"
                                        className="w-full"
                                        name="anno"
                                        value={form.anno}
                                    />

                                </Grid>
                            </Grid>
                            <Typography variant="h6" className="mt-6">
                                Reporte de reparación, Informacion de la unidad y taller
                            </Typography>

                            <Grid className="w-full flex gap-2 mt-4">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        label="Fecha"
                                        className="w-full"
                                        inputProps={{ maxLength: 50 }}
                                        name="fechaReparacion"
                                        type="date"
                                        value={form.fechaReparacion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 30 }}
                                        label="Serial de la unidad"
                                        className="w-full"
                                        name="serialUnidad"
                                        value={form.serialUnidad}
                                    />

                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 40 }}
                                        label="Taller donde se realizo la reparación"
                                        className="w-full"
                                        name="tallerReparacion"

                                        value={form.tallerReparacion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 40 }}
                                        label="Nombre del mecanico"
                                        className="w-full"
                                        name="nombreMecanico"
                                        value={form.nombreMecanico}
                                    />

                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4 mb-6">
                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 50 }}
                                        label="Ubicacion del taller"
                                        className="w-full"
                                        name="ubicacionTaller"

                                        value={form.ubicacionTaller}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 40 }}
                                        label="Nombre del conductor de la unidad"
                                        className="w-full"
                                        name="nombreConductor"
                                        value={form.nombreConductor}
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
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 30 }}
                                        label="Nombre de la pieza"
                                        className="w-full"
                                        name="nombrePieza"

                                        value={form.nombrePieza}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        label="Marca de la pieza"
                                        inputProps={{ maxLength: 20 }}
                                        className="w-full"
                                        name="marcaPieza"
                                        value={form.marcaPieza}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        label="Serial de la pieza"
                                        inputProps={{ maxLength: 40 }}
                                        className="w-full"
                                        name="serialPieza"
                                        value={form.serialPieza}
                                    />

                                </Grid>
                            </Grid>
                            <Grid className="w-full flex gap-2 mt-4">

                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        label="Marca del aceite"
                                        className="w-full"
                                        name="marcaAceite"
                                        inputProps={{ maxLength: 20 }}
                                        value={form.marcaAceite}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        required
                                        onChange={handleChange}
                                        label="Detalle de la reparación"
                                        inputProps={{ maxLength: 100 }}
                                        className="w-full"
                                        name="descripCambioAceite"
                                        multiline
                                        rows={4}
                                        value={form.descripCambioAceite}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container className="mt-6">
                                <Button variant="contained" type="submit" className="ml-auto" >Guardar reporte</Button>
                            </Grid>
                        </div>
                    </form>
                </div>
            </Grid >
        </Grid >
    );
}

export default ReporteUnidades;
