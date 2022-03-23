import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import {
  getCollection,
  addDocument,
  updateDocument,
  uploadImage,
} from "../../../../../handlers/handlers";
import Loader from "../../../../LoaderSpinner/LoaderSpinner";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../Utils/Colors";
import { useWindowSize } from "../../../../../Utils/Commons";
import Swal from "sweetalert2";
import { Close, Publish } from "@material-ui/icons";

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
let initialValue;

const Form = React.forwardRef((props, ref) => {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [fileName, setFileName] = useState(t("adminPanel.selectFile"));
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (document) => {
    if (label !== "" && value !== "" && image !== null) {
      let response = await addDocument("categories", document);
      let categoriesFilterTemp = await getCollection("categoriesBool");
      let id = categoriesFilterTemp.data[0]["id"];
      delete categoriesFilterTemp.data[0]["id"];
      categoriesFilterTemp.data[0][document.value] = false;
      let catResponse = await updateDocument(
        "categoriesBool",
        categoriesFilterTemp.data[0],
        id
      );

      if (response && catResponse) {
        setIsLoading(false);
        Swal.fire({
          text: "El registro fue agregado exitosamente!",
          icon: "success",
          customClass: {
            container: classes.swal,
          },
          confirmButtonColor: colors.greenLight,
        }).then(() => {
          props.setChecked(false);
          props.handleGetData();
          props.setOpenModal(false);
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          text: "Ha ocurrido un error intentelo más tarde.",
          icon: "error",
          customClass: {
            container: classes.swal,
          },
          confirmButtonColor: colors.greenLight,
        });
      }
    } else {
      setIsLoading(false);
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

  const handleUpdate = async (document, id) => {
    let response = await updateDocument("categories", document, id);

    let categoriesFilterTemp = await getCollection("categoriesBool");

    let catBoolId = categoriesFilterTemp.data[0]["id"];
    delete categoriesFilterTemp.data[0]["id"];
    delete categoriesFilterTemp.data[0][initialValue];
    categoriesFilterTemp.data[0][document.value] = false;

    let catResponse = await updateDocument(
      "categoriesBool",
      categoriesFilterTemp.data[0],
      catBoolId
    );

    if (response && catResponse) {
      setIsLoading(false);
      Swal.fire({
        text: "El registro fue actualizado exitosamente!",
        icon: "success",
        customClass: {
          container: classes.swal,
        },
        confirmButtonColor: colors.greenLight,
      }).then(() => {
        props.setChecked(false);
        props.handleGetData();
        props.setOpenModal(false);
      });
    } else {
      setIsLoading(false);
      Swal.fire({
        text: "Ha ocurrido un error intentelo más tarde.",
        icon: "error",
        customClass: {
          container: classes.swal,
        },
        confirmButtonColor: colors.greenLight,
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    let response = null;
    if (image !== null) {
      response = await uploadImage(image);
    }
    let document = {
      label: label,
      value: value,
      imagePath: response !== null ? response.url : imagePath,
    };
    if (props.isEdit) {
      handleUpdate(document, props.document.id);
    } else {
      handleCreate(document);
    }
  };

  const handleUpload = (e) => {
    document.getElementById("imageCarousel").click();
    document.getElementById("imageCarousel").onchange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
        setFileName(e.target.files[0].name);
      }
    };
  };

  const handleClose = () => {
    props.setOpenModal(false);
  };

  useEffect(() => {
    if (props.isEdit) {
      setLabel(props.document.label);
      setValue(props.document.value);
      initialValue = props.document.value;
      setImagePath(props.document.imagePath);
    }
  }, [
    props.isEdit,
    props.document.label,
    props.document.value,
    props.document.imagePath,
  ]);

  return (
    <div className={classes.root}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Close className={classes.closeButton} onClick={() => handleClose()} />
      <Grid className={classes.gridTitle}>
        <Typography className={classes.title}>
          {props.isEdit
            ? t("adminPanel.editElement")
            : t("adminPanel.addElement")}
        </Typography>
      </Grid>

      <form className={classes.form}>
        <TextField
          className={classes.textField}
          autoFocus
          label="Label"
          variant="outlined"
          value={label}
          InputProps={{
            className: classes.textFieldArea,
          }}
          InputLabelProps={{
            className: classes.labelRoot,
            shrink: true,
          }}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Valor"
          variant="outlined"
          value={value}
          InputProps={{
            className: classes.textFieldArea,
          }}
          InputLabelProps={{
            className: classes.labelRoot,
            shrink: true,
          }}
          onChange={(e) => setValue(e.target.value)}
        />
        <Grid className={classes.gridUploadButton}>
          <p className={classes.uploadText}>{fileName}</p>
          <input
            id="imageCarousel"
            type="file"
            hidden
            accept="application/jpg application/png"
          />
          <Button
            variant="contained"
            onClick={() => handleUpload()}
            startIcon={<Publish />}
            className={classes.uploadButton}
          >
            <Typography> {t("buttons.upload")}</Typography>
          </Button>
        </Grid>
        <Grid className={classes.gridUpdate}>
          <Button
            variant="contained"
            className={classes.updateButton}
            onClick={handleSave}
          >
            <Typography>{props.isEdit ? "Actualizar" : "Crear"}</Typography>
          </Button>
        </Grid>
      </form>
    </div>
  );
});

export default Form;
