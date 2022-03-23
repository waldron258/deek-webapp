import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import Loader from "../../LoaderSpinner/LoaderSpinner";
import { colors } from "../../../Utils/Colors";
import { useWindowSize } from "../../../Utils/Commons";
import Swal from "sweetalert2";
import { Close } from "@material-ui/icons";
import { notifyAdminEmail, notifyUserEmail } from "../../../mails/mails";
import { notifyUserTemplate } from "../../../mails/templates/notifyUserTemplate";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "40px 10px",
    backgroundColor: "white",
    width: "50%",
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: { width: "80%" },
  },
  form: {
    width: "80%",
    margin: "10px 10%",
  },
  inputFile: {},
  gridTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 0px",
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    color: colors.greenDark,
    fontSize: "1.3vw",
    [theme.breakpoints.down("xs")]: { fontSize: "6vw" },
  },
  textField: {
    width: "100%",
    margin: "10px 0px",
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
  },
  textFieldArea: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1vw",
    height: ({ size }) => `calc(55px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(35px *(${size.width}/320))`,
      fontSize: "3.7vw",
    },
  },
  textArea: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1vw",
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(70px *(${size.width}/320))`,
      fontSize: "3.7vw",
    },
  },
  labelRoot: {
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "1vw",
    [theme.breakpoints.down("xs")]: { fontSize: "4vw" },
  },
  gridUploadButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px 0px",
  },
  uploadButton: {
    width: "25%",
    height: ({ size }) => `calc(45px *(${size.width}/1921))`,
    backgroundColor: colors.greenDark,
    borderRadius: 60,
    marginLeft: 30,
    "& svg": {
      width: ({ size }) => `calc(30px *(${size.width}/1921))`,
      height: ({ size }) => `calc(30px *(${size.width}/1921))`,
      color: "white",
      [theme.breakpoints.down("xs")]: {
        width: ({ size }) => `calc(20px *(${size.width}/320))`,
        height: ({ size }) => `calc(20px *(${size.width}/320))`,
      },
    },
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      fontSize: "1.2vw",
      [theme.breakpoints.down("xs")]: { fontSize: "4.5vw" },
    },
    "&:hover": {
      backgroundColor: colors.greenLight,
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(30px *(${size.width}/320))`,
      width: "70%",
    },
  },
  gridUpdate: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  updateButton: {
    width: "50%",
    height: ({ size }) => `calc(45px *(${size.width}/1921))`,
    backgroundColor: colors.greenLight,
    borderRadius: 60,
    "& svg": {
      width: ({ size }) => `calc(30px *(${size.width}/1921))`,
      height: ({ size }) => `calc(30px *(${size.width}/1921))`,
      color: "white",
      [theme.breakpoints.down("xs")]: {
        width: ({ size }) => `calc(20px *(${size.width}/320))`,
        height: ({ size }) => `calc(20px *(${size.width}/320))`,
      },
    },
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      fontSize: "1.2vw",
      [theme.breakpoints.down("xs")]: { fontSize: "4.5vw" },
    },
    "&:hover": {
      backgroundColor: colors.greenDark,
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(30px *(${size.width}/320))`,
      width: "70%",
    },
  },
  uploadText: {
    fontFamily: "'Open Sans', sans-serif",
    textTransform: "none",
    color: colors.grayDark,
    fontSize: "1vw",
    [theme.breakpoints.down("xs")]: { fontSize: "3vw" },
  },
  closeButton: {
    width: ({ size }) => `calc(30px *(${size.width}/1921))`,
    height: ({ size }) => `calc(30px *(${size.width}/1921))`,
    position: "absolute",
    top: "0%",
    left: "100%",
    transform: "translate(-120%, 20%)",
    padding: 5,
    cursor: "pointer",
    borderRadius: 100,
    color: "white",
    backgroundColor: colors.greenDark,
    "&:hover": {
      backgroundColor: colors.greenLight,
      transition: "all 0.4s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(25px *(${size.width}/320))`,
      height: ({ size }) => `calc(25px *(${size.width}/320))`,
    },
  },
  swal: {
    zIndex: 10000,
  },
}));

function Form(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tableBody, setTableBody] = useState("");

  const handleClose = () => {
    props.setOpenModal(false);
  };

  useEffect(() => {
    let body = notifyUserTemplate(props.items);
    setTableBody(body);
  }, [props.items]);

  const handleSendMessage = async () => {
    if (name !== "" && phone !== "" && email !== "") {
      setIsLoading(true);
      let paramsUser = {
        to_email: email,
        to_name: name,
        message: tableBody,
      };
      let paramsAdmin = {
        to_email: "canateluisalfonso@gmail.com",
        user_name: name,
        user_email: email,
        user_phone: phone,
        message: tableBody,
      };
      let responseNotifyAdmin = await notifyAdminEmail(paramsAdmin);
      let responseNotifyUser = await notifyUserEmail(paramsUser);
      if (responseNotifyUser && responseNotifyAdmin) {
        Swal.fire({
          text: "Tu solicitud fue procesada con éxito, revisa tu correo para más información",
          icon: "success",
          customClass: {
            container: classes.swal,
          },
          confirmButtonColor: colors.greenLight,
        });
      } else {
        Swal.fire({
          text: "Ha ocurrido un error, por favor intentelo nuevamente más tarde",
          icon: "error",
          customClass: {
            container: classes.swal,
          },
          confirmButtonColor: colors.greenLight,
        });
      }
      setIsLoading(false);
    } else {
      Swal.fire({
        text: "Complete todos los campos antes de continuar",
        icon: "error",
        customClass: {
          container: classes.swal,
        },
        confirmButtonColor: colors.greenLight,
      });
    }
  };

  return (
    <div className={classes.root}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Close className={classes.closeButton} onClick={() => handleClose()} />
      <Grid className={classes.gridTitle}>
        <Typography className={classes.title}>Confirmar Orden</Typography>
      </Grid>

      <form className={classes.form}>
        <TextField
          className={classes.textField}
          autoFocus
          required
          label="Nombre"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.textField}
          required
          label="Correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.textField}
          required
          label="Teléfono"
          variant="outlined"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Grid className={classes.gridUpdate}>
          <Button
            variant="contained"
            className={classes.updateButton}
            onClick={handleSendMessage}
          >
            <Typography>Confirmar Orden</Typography>
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default Form;
