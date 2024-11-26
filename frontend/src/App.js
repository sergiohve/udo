import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./pages/login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Historial from "./pages/historial";
import GestionUnidades from "./pages/gestionUnidades";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://media.istockphoto.com/id/1830163120/es/foto/grupo-de-programadores-inform%C3%A1ticos-hablando-mientras-trabajan-en-la-oficina-de-ti.webp?b=1&s=612x612&w=0&k=20&c=eM8ovaD5Iu1xgVFRxIp8LN-7yH7q5gC1_dbfb0IShNk=)",
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

export default function App() {
  const classes = useStyles();
  const getToken = localStorage.getItem("token");
  const [authenticate, setAuthenticate] = useState(false);
  console.log(getToken);

  useEffect(() => {
    if (getToken === null || getToken === "") {
      setAuthenticate(false);
    } else {
      setAuthenticate(true);
    }
  }, [getToken]);

  return (
    <BrowserRouter>
      <Grid className={classes.root}>
       
       
        <Grid>
          <Routes>
            {!authenticate ? (
              <Route path="/" element={<Login />} />
            ) : (
              <>
              <Route path="/historial" element={<Historial />} />
              <Route path="/gestionUnidades" element={<GestionUnidades />} />
              </>
              
            )}
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
