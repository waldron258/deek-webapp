import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grow,
  Backdrop,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Modal,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import {
  deleteDocument,
  deleteImage,
  getCollection,
  updateDocument,
} from "../../../../../handlers/handlers";
import Form from "./Form";
import Swal from "sweetalert2";
import { colors } from "../../../../../Utils/Colors";
import { useWindowSize } from "../../../../../Utils/Commons";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    height: ({ size }) => `calc(40px *(${size.width}/1921))`,
    "& svg": {
      width: ({ size }) => `calc(30px *(${size.width}/1921))`,
      height: ({ size }) => `calc(30px *(${size.width}/1921))`,
      color: colors.greenDark,
      [theme.breakpoints.down("xs")]: {
        width: ({ size }) => `calc(20px *(${size.width}/320))`,
        height: ({ size }) => `calc(20px *(${size.width}/320))`,
      },
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(40px *(${size.width}/320))`,
    },
  },
  cardContainer: {
    width: ({ size }) => `calc(450px *(${size.width}/1921))`,
    "&:hover": {
      boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.2)",
      transition: "all 0.4s ease-out",
    },
    borderRadius: 2,

    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(280px *(${size.width}/320))`,
    },
  },
  cardContent: {
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(100px *(${size.width}/320))`,
    },
  },
  cardMedia: {
    height: ({ size }) => `calc(300px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(320px *(${size.width}/320))`,
    },
  },
  title: {
    height: "40%",
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    color: colors.greenDark,
    fontSize: "1.3vw",
    [theme.breakpoints.down("xs")]: { fontSize: "6vw" },
  },
  info: {
    height: "70%",
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "0.8vw",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: { fontSize: "3.5vw" },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CarouselCard(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [openModal, setOpenModal] = useState(false);
  const [document, setDocument] = useState(null);

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro de que quieres borrar este elemento?",
      text: "¡No habrá manera de recuperarlo luego!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.greenDark,
      cancelButtonColor: colors.greenLight,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await deleteDocument("categories", props.card.id);
        deleteImage(props.card.imagePath);

        let catBoolResponse = await getCollection("categoriesBool");
        let id = catBoolResponse.data[0]["id"];
        delete catBoolResponse.data[0]["id"];
        delete catBoolResponse.data[0][props.card.value];

        let catResponse = await updateDocument(
          "categoriesBool",
          catBoolResponse.data[0],
          id
        );

        if (response && catResponse) {
          Swal.fire({
            text: "El registro fue borrado exitosamente!",
            icon: "success",
            confirmButtonColor: colors.greenLight,
          }).then(() => {
            props.setChecked(false);
            props.handleGetData();
          });
        } else {
          Swal.fire({
            text: "Ha ocurrido un error intentelo más tarde.",
            icon: "error",
            confirmButtonColor: colors.greenLight,
          });
        }
      }
    });
  };

  const handleOpen = () => {
    setDocument(props.card);
    setOpenModal(true);
  };

  return (
    <div>
      <Card className={classes.cardContainer}>
        <CardMedia className={classes.cardMedia} image={props.card.imagePath} />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title}>{props.card.label}</Typography>
          <Typography className={classes.info}>{props.card.value}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="Editar" onClick={handleOpen}>
            <Edit />
          </IconButton>
          <IconButton aria-label="Eliminar" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardActions>
        <Modal
          open={openModal}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Grow in={openModal}>
            <Form
              setChecked={props.setChecked}
              setOpenModal={setOpenModal}
              handleGetData={props.handleGetData}
              isEdit={true}
              document={document}
            />
          </Grow>
        </Modal>
      </Card>
    </div>
  );
}
