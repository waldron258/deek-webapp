import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Button, Grid, Modal, Grow } from "@material-ui/core";
import { getCollection } from "../../../../handlers/handlers";
import CardView from "./Components/CardView";
import { AddOutlined } from "@material-ui/icons";
import FormSettings from "./Components/FormSettings";
import SkeletonBox from "./Components/SkeletonBox";
import Swal from "sweetalert2";
import { colors } from "../../../../Utils/Colors";
import { useWindowSize } from "../../../../Utils/Commons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    marginTop: ({ size }) => `calc(100px + 20px *(${size.width}/1921))`,
    width: "80%",
    margin: "0px 10%",
    [theme.breakpoints.down("xs")]: { width: "90%", margin: "0px 5%" },
  },
  addItem: {
    width: ({ size }) => `calc(150px *(${size.width}/1921))`,
    height: ({ size }) => `calc(150px *(${size.width}/1921))`,
    borderRadius: 100,
    //border: "1px solid rgba(192, 188, 188)",
    color: "white",
    backgroundColor: colors.greenLight,
    "&:hover": {
      backgroundColor: colors.greenDark,
      transition: "all 0.4s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(60px *(${size.width}/320))`,
      height: ({ size }) => `calc(60px *(${size.width}/320))`,
    },
  },
  addIcon: {
    width: ({ size }) => `calc(90px *(${size.width}/1921))`,
    height: ({ size }) => `calc(90px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(40px *(${size.width}/320))`,
      height: ({ size }) => `calc(40px *(${size.width}/320))`,
    },
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px 0px",
  },
  addContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "25px 0px",
    height: ({ size }) => `calc(450px *(${size.width}/1921))`,
    width: ({ size }) => `calc(450px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(280px *(${size.width}/320))`,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function ProductSettings() {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const loadingSkeleton = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    setIsLoading(true);
    getCollection("products").then((response) => {
      if (response.status) {
        setProducts(response.data);
        setChecked(true);
      } else {
        Swal.fire({
          text: "Ha ocurrido un error en el servidor, por favor refresque la página",
          icon: "error",
        });
      }
      setIsLoading(false);
    });
  };

  const handleCreate = () => {
    setOpenSettingsModal(true);
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <div className={classes.root}>
      <div>
        <SideBar title={"adminPanel.products"} />
      </div>
      <Grid container>
        {isLoading &&
          loadingSkeleton.map((skeleton) => (
            <Grid
              key={skeleton}
              container
              item
              className={classes.cardContainer}
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
            >
              <SkeletonBox />
            </Grid>
          ))}
        {products.length > 0 ? (
          <>
            <Grow in={checked}>
              <Grid
                container
                item
                className={classes.cardContainer}
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <Button
                  className={classes.addItem}
                  onClick={() => handleCreate()}
                >
                  <AddOutlined className={classes.addIcon} />
                </Button>
              </Grid>
            </Grow>

            {products.map((card, key) => (
              <Grow
                key={key}
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: (key + 1) * 1000 } : {})}
              >
                <Grid
                  container
                  item
                  className={classes.cardContainer}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <CardView
                    setChecked={setChecked}
                    card={card}
                    handleGetData={handleGetData}
                    setIsLoading={setIsLoading}
                  />
                </Grid>
              </Grow>
            ))}
          </>
        ) : (
          <Grid container>
            <Grow in={checked}>
              <Grid
                container
                item
                className={classes.addContainer}
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <Button
                  className={classes.addItem}
                  onClick={() => handleCreate()}
                >
                  <AddOutlined className={classes.addIcon} />
                </Button>
              </Grid>
            </Grow>
          </Grid>
        )}
      </Grid>
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
            setChecked={setChecked}
            setOpenModal={setOpenSettingsModal}
            handleGetData={handleGetData}
            isEdit={false}
            document={{ title: "", description: "", imagePath: "" }}
          />
        </Grow>
      </Modal>
    </div>
  );
}

export default ProductSettings;
