import { Button, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import LogoLogin from "../assets/logoLogin.jpeg"
const useStyles = makeStyles((theme) => ({
  root: {
  
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    backgroundImage: `url(${LogoLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const [email, setEmail] = useState("astrid@gmail.com");
  const [password, setPassword] = useState("12345");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response.data.ok) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/historial");
        window.location.reload();
      } else {
        alert("Contraseña incorrecta");
      }
    } catch (error) {
      setMessageError("Usuario y/o contraseña incorrectas");
    }
  };
  useEffect(() => {
    if (getToken !== null && getToken !== "") {
      navigate("/historial");
    }
  }, [getToken]);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setMessageError("");
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setMessageError("");
  };
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={false}
        sm={8}
        md={6}
        className={`h-[100vh]  mt-[40px] text-[20px] text-[#fff] items-center text-center ${classes.image}`}
      />
      

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        className={`h-[100vh] mt-[40px] text-[20px] items-center text-center`}
      >
        <div className={classes.paper}>
       
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <div className="mt-1 mb-2 te text-[#FF0000]">{messageError}</div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              onChange={handleChangeEmail}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              onChange={handleChangePassword}
              autoComplete="current-password"
            />
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
          </form>
         
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
