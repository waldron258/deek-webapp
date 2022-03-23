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
import { Delete, Edit, Settings } from "@material-ui/icons";
import { deleteDocument, deleteImage } from "../../../../../handlers/handlers";
import FormSettings from "./FormSettings";
import FormEdit from "./FormEdit";
import Swal from "sweetalert2";
import { colors } from "../../../../../Utils/Colors";
import { currencyFormat, useWindowSize } from "../../../../../Utils/Commons";

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
    height: "40%",
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "0.8vw",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: { fontSize: "3.5vw" },
  },
  price: {
    height: "30%",
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    color: colors.greenDark,
    fontSize: "1.3vw",
    [theme.breakpoints.down("xs")]: { fontSize: "6vw" },
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
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
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
        let response = await deleteDocument("products", props.card.id);
        deleteImage(props.card.imagePath);
        if (response) {
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

  const handleOpenSettings = () => {
    setDocument(props.card);
    setOpenSettingsModal(true);
  };

  const handleOpenEdit = () => {
    setDocument(props.card);
    setOpenEditModal(true);
  };

  return (
    <div>
      <Card className={classes.cardContainer}>
        <CardMedia className={classes.cardMedia} image={props.card.images[0]} />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title}>{props.card.title}</Typography>
          <Typography className={classes.info}>
            {props.card.description}
          </Typography>
          <Typography className={classes.price}>
            {currencyFormat(props.card.price)}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="Editar" onClick={handleOpenSettings}>
            <Settings />
          </IconButton>
          <IconButton aria-label="Editar" onClick={handleOpenEdit}>
            <Edit />
          </IconButton>
          <IconButton aria-label="Eliminar" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardActions>
        <Modal
          open={openSettingsModal}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Grow in={openSettingsModal}>
            <FormSettings
              setChecked={props.setChecked}
              setOpenModal={setOpenSettingsModal}
              handleGetData={props.handleGetData}
              isEdit={true}
              document={document}
            />
          </Grow>
        </Modal>
        <Modal
          open={openEditModal}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Grow in={openEditModal}>
            <FormEdit
              specs={props.card.specs}
              setChecked={props.setChecked}
              setOpenModal={setOpenEditModal}
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
