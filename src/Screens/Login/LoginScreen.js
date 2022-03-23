import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../firebase";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import login_bg from "../../Assets/StaticImages/login-bg.jpg";
import Loader from "../LoaderSpinner/LoaderSpinner";
import Swal from "sweetalert2";
import { colors } from "../../Utils/Colors";
import { useWindowSize } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${login_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: { height: "100%" },
  },
  button: {
    width: "80%",
    height: ({ size }) => `calc(55px *(${size.width}/1921))`,
    backgroundColor: colors.greenLight,
    borderRadius: 60,
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      fontSize: "1.2vw",
      [theme.breakpoints.down("xs")]: { fontSize: "5.2vw" },
    },
    "&:hover": {
      backgroundColor: colors.greenDark,
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(35px *(${size.width}/320))`,
      width: "90%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    width: "30%",
    height: ({ size }) => `calc(480px *(${size.width}/1921))`,
    borderRadius: 2,
    border: "1px solid rgba(192, 188, 188,0.7)",
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(320px *(${size.width}/320))`,
      width: "70%",
    },
  },
  labelRoot: {
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "1.2vw",
    [theme.breakpoints.down("xs")]: { fontSize: "4vw" },
  },
  logo: {
    fontFamily: "'RymanEco-Regular'",
    color: colors.greenDark,
    fontSize: "5vw",
    [theme.breakpoints.down("xs")]: { fontSize: "20vw" },
  },
  logIn: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: "1.5vw",
    color: colors.greenDark,
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.5vw",
    },
  },
  textField: {
    width: "80%",
    "& label.Mui-focused": {
      color: colors.greenDark,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.grayLight,
      },
      "&:hover fieldset": {
        borderColor: colors.greenDark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.greenDark,
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  textFieldArea: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1.2vw",
    height: ({ size }) => `calc(55px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(35px *(${size.width}/320))`,
      fontSize: "3.7vw",
    },
  },
  showPassIcon: {
    width: ({ size }) => `calc(35px *(${size.width}/1921))`,
    height: ({ size }) => `calc(35px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(20px *(${size.width}/320))`,
      width: ({ size }) => `calc(20px *(${size.width}/320))`,
    },
  },
}));

function LoginScreen(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = sessionStorage.getItem("user");

  if (currentUser) {
    window.location.replace("/admin/carouselSettings");
  }

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      setIsLoading(true);
      signInWithEmailAndPassword(Auth, email, password)
        .then(() => {
          // Signed in
          window.location.replace("/admin/carouselSettings");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (
            errorCode === "auth/invalid-email" ||
            errorCode === "auth/wrong-password"
          ) {
            Swal.fire({
              title: "Error en inicio de sesión",
              text: "Credenciales invalidas",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Error en inicio de sesión",
              text: "Error en el servidor, intentelo más tarde",
              icon: "error",
            });
          }
          setIsLoading(false);
        });
    } else {
      Swal.fire({
        title: "Error en inicio de sesión",
        text: "Por favor, rellene los campos faltantes",
        icon: "info",
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={classes.root}>
      {!isLoading ? (
        <div className={classes.formContainer}>
          <Typography className={classes.logo}>{t("navBar.title")}</Typography>
          <form onSubmit={handleLogin} className={classes.form}>
            <TextField
              autoFocus
              variant="outlined"
              label={t("adminPanel.email")}
              className={classes.textField}
              InputProps={{
                className: classes.textFieldArea,
              }}
              InputLabelProps={{
                className: classes.labelRoot,
                shrink: true,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label={t("adminPanel.password")}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.textFieldArea,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.showPass}
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? (
                        <Visibility className={classes.showPassIcon} />
                      ) : (
                        <VisibilityOff className={classes.showPassIcon} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: classes.labelRoot,
                shrink: true,
              }}
            />
            <Button className={classes.button} onClick={handleLogin}>
              <Typography>{t("buttons.logIn")} </Typography>
            </Button>
          </form>
        </div>
      ) : (
        <Loader isLoading={isLoading} />
      )}
    </div>
  );
}

export default LoginScreen;
