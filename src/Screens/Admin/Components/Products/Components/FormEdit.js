import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";
import { Close, Delete, Edit } from "@material-ui/icons";

import { colors } from "../../../../../Utils/Colors";
import { useWindowSize } from "../../../../../Utils/Commons";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Backdrop,
  Button,
  Grid,
  Grow,
  IconButton,
  Modal,
  Typography,
} from "@material-ui/core";

import { updateDocument } from "../../../../../handlers/handlers";

import Loader from "../../../../LoaderSpinner/LoaderSpinner";
import Swal from "sweetalert2";

import uniqid from "uniqid";

import AddSpec from "./AddSpec";

const useStyles = makeStyles((theme) => ({
  flexPaper: {
    flex: 1,
    margin: 16,
    minWidth: 350,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: "40px 10px",
    backgroundColor: "white",
    width: "50%",
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: { width: "80%" },
  },
  button: {
    width: "25%",
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
  iconButton: {
    width: ({ size }) => `calc(45px *(${size.width}/1921))`,
    height: ({ size }) => `calc(45px *(${size.width}/1921))`,
    color: colors.greenDark,
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(30px *(${size.width}/320))`,
      height: ({ size }) => `calc(30px *(${size.width}/320))`,
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
  gridButtons: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 20,
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableheadContainer: {
    margin: "0px 2.5%",
    width: "95%",
    marginTop: ({ size }) => `calc(30px *(${size.width}/1921))`,
    marginBottom: ({ size }) => `calc(20px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      marginTop: ({ size }) => `calc(30px *(${size.width}/320))`,
      marginBottom: ({ size }) => `calc(20px *(${size.width}/320))`,
    },
  },
  tableheadItem: {
    color: colors.grayDark,
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: "bold",
    fontSize: "1vw",
    [theme.breakpoints.down("xs")]: { fontSize: "4.5vw" },
  },
  ulContainer: {
    listStyle: "none",
    margin: "0px 2.5%",
    padding: 0,
    width: "95%",
  },
  liContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 0px",
    padding: "5px 0px",
    backgroundColor: "white",
    borderTop: "1px solid rgba(192, 188, 188,0.7)",
  },
  swal: {
    zIndex: 10000,
  },
  itemText: {
    fontFamily: "'Open Sans', sans-serif",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break-word",
    overflow: "hidden",
    color: colors.grayDark,
    fontSize: "0.9vw",
    cursor: "pointer",
    textAlign: "left",
    [theme.breakpoints.between(601, 1281)]: {
      fontSize: "1.1vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
}));

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

let isEdit = false;
let index = 0;

const FormEdit = React.forwardRef((props, ref) => {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const [specs, setSpecs] = useState([]);
  const [spec, setSpec] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    props.setOpenModal(false);
  };

  const handleAdd = () => {
    //setDocument(props.card)
    setSpec({ title: "", description: "" });
    isEdit = false;
    setOpenModal(true);
  };

  const handleEdit = (spec, i) => {
    //setDocument(props.card)
    index = i;
    isEdit = true;
    setSpec(spec);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres borrar este elemento?",
      text: "¡No habrá manera de recuperarlo luego!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        container: classes.swal,
      },
      confirmButtonColor: colors.greenDark,
      cancelButtonColor: colors.greenLight,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let specsTemp = [...specs];
        specsTemp.splice(index, 1);
        setSpecs(specsTemp);
        Swal.fire({
          text: "El registro fue borrado. Para aplicar este cambio, no olvides guardar",
          icon: "success",
          confirmButtonColor: colors.greenLight,
          customClass: {
            container: classes.swal,
          },
        });
      }
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    let newDocument = { ...props.document };
    newDocument.specs = specs;
    let response = await updateDocument(
      "products",
      newDocument,
      newDocument.id
    );
    if (response) {
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

  useEffect(() => {
    setSpecs(props.specs);
  }, [props.specs]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }

        setSpecs((prevSpecs) =>
          reorder(prevSpecs, source.index, destination.index)
        );
      }}
    >
      {isLoading && <Loader isLoading={isLoading} />}
      <div className={classes.root}>
        <Close className={classes.closeButton} onClick={handleClose} />
        <Grid className={classes.gridTitle}>
          <Typography className={classes.title}>
            {t("adminPanel.manageProductSpecs")}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          className={classes.tableheadContainer}
        >
          <Grid style={{ width: "24%", margin: "0px 0.5%" }}>
            <Typography className={classes.tableheadItem}>
              {t("adminPanel.specTitle")}
            </Typography>
          </Grid>
          <Grid style={{ width: "62%", margin: "0px 0.5%" }}>
            <Typography className={classes.tableheadItem}>
              {t("adminPanel.specDescription")}
            </Typography>
          </Grid>
          <Grid style={{ width: "11%", margin: "0px 0.5%" }}>
            <Typography className={classes.tableheadItem}>
              {t("adminPanel.specActions")}
            </Typography>
          </Grid>
        </Grid>
        <Droppable droppableId="specs">
          {(droppableProvided) => (
            <ul
              className={classes.ulContainer}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              //className="task-container"
            >
              {specs.map((spec, index) => (
                <Draggable key={spec.id} draggableId={spec.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      //className="task-item"
                    >
                      <div className={classes.liContainer}>
                        <div style={{ width: "24%", margin: "0px 0.5%" }}>
                          <Typography className={classes.itemText}>
                            {spec.title}
                          </Typography>
                        </div>
                        <div style={{ width: "62%", margin: "0px 0.5%" }}>
                          <Typography
                            className={classes.itemText}
                            style={{ lineClamp: 2 }}
                          >
                            {spec.description}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "11%",
                            margin: "0px 0.5%",
                          }}
                        >
                          <IconButton
                            className={classes.iconButton}
                            aria-label="Editar"
                            onClick={() => handleEdit(spec, index)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            className={classes.iconButton}
                            aria-label="Eliminar"
                            onClick={() => handleDelete(index)}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
        <Grid className={classes.gridButtons}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleAdd}
          >
            <Typography> {t("buttons.add")}</Typography>
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleSave}
          >
            <Typography> {t("buttons.save")}</Typography>
          </Button>
        </Grid>
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
            <AddSpec
              id={isEdit ? spec.id : uniqid()}
              index={index}
              setSpecs={setSpecs}
              setChecked={props.setChecked}
              setOpenModal={setOpenModal}
              isEdit={isEdit}
              spec={spec}
            />
          </Grow>
        </Modal>
      </div>
    </DragDropContext>
  );
});

export default FormEdit;
