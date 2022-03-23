import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../Utils/Colors";
import { useWindowSize } from "../../../../../Utils/Commons";
import Swal from "sweetalert2";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "40px 10px",
    backgroundColor: "white",
    width: "45%",
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: { width: "80%" },
  },
  form: {
    width: "80%",
    margin: "10px 10%",
  },
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
  gridButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  saveButton: {
    width: "50%",
    height: ({ size }) => `calc(45px *(${size.width}/1921))`,
    backgroundColor: colors.greenLight,
    borderRadius: 60,
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

const AddSpec = React.forwardRef((props, ref) => {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (title.trim().length > 0 && description.trim().length > 0) {
      if (props.isEdit) {
        props.setSpecs((prevSpecs) => {
          let specs = [...prevSpecs];
          specs[props.index].title = title;
          specs[props.index].description = description;
          return specs;
        });
        props.setOpenModal(false);
      } else {
        let document = { id: props.id, title: title, description: description };
        props.setSpecs((prevSpecs) => [...prevSpecs, document]);
        props.setOpenModal(false);
      }
    } else {
      Swal.fire({
        text: "Completa todos los campos antes de continuar",
        icon: "warning",
        customClass: {
          container: classes.swal,
        },
        confirmButtonColor: colors.greenLight,
      });
    }
  };

  const handleClose = () => {
    props.setOpenModal(false);
  };

  //let response = await addDocument("products", document);
  useEffect(() => {
    if (props.isEdit) {
      setTitle(props.spec.title);
      setDescription(props.spec.description);
    }
  }, [props.isEdit, props.spec.title, props.spec.description]);

  return (
    <div className={classes.root}>
      <Close className={classes.closeButton} onClick={() => handleClose()} />
      <Grid className={classes.gridTitle}>
        <Typography className={classes.title}>
          {t("adminPanel.addProductSpec")}
        </Typography>
      </Grid>

      <form className={classes.form}>
        <TextField
          className={classes.textField}
          autoFocus
          label="Título"
          variant="outlined"
          value={title}
          InputProps={{
            className: classes.textFieldArea,
          }}
          InputLabelProps={{
            className: classes.labelRoot,
            shrink: true,
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Descripción"
          variant="outlined"
          multiline
          rows={3}
          value={description}
          InputProps={{
            className: classes.textArea,
          }}
          InputLabelProps={{
            className: classes.labelRoot,
            shrink: true,
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Grid className={classes.gridButtons}>
          <Button
            variant="contained"
            className={classes.saveButton}
            onClick={handleSave}
          >
            <Typography>
              {props.isEdit ? t("buttons.edit") : t("buttons.add")}
            </Typography>
          </Button>
        </Grid>
      </form>
    </div>
  );
});

export default AddSpec;
