import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Modal,
  Grow,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Colors";
import { currencyFormat, useWindowSize } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";
import Form from "./Components/Form";

import { connect } from "react-redux";
import {
  adjustQty,
  removeFromCart,
} from "../../redux/CartReducers/cartActions";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    width: "70%",
    marginLeft: "15%",
    marginTop: ({ size }) => `calc(100px + (50px *(${size.width}/1921)))`,
    display: "flex",

    [theme.breakpoints.between(1025, 1281)]: {
      marginTop: ({ size }) => `calc(65px + (50px *(${size.width}/1921)))`,
    },
    [theme.breakpoints.between(601, 1025)]: {
      marginTop: ({ size }) => `calc(65px + (50px *(${size.width}/1921)))`,
      width: "80%",
      marginLeft: "10%",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      marginLeft: "7.5%",
      width: "85%",
      marginTop: () => 115,
    },
  },
  gridItemsTitle: {
    color: colors.greenDark,
    height: 50,
    borderBottomColor: colors.grayLight,
    borderBottom: "1px solid transparent",
    fontSize: "0.8vw",
    [theme.breakpoints.between(601, 1153)]: { fontSize: "0.9vw" },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.3vw",
      paddingBottom: 25,
    },
  },
  gridProduct: {
    width: "50%",
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
  gridPrice: {
    display: "flex",
    justifyContent: "center",
    textTransform: "uppercase",
    width: "33.33%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
  gridQuantity: {
    display: "flex",
    justifyContent: "center",
    textTransform: "uppercase",
    width: "33.33%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  gridTotal: {
    display: "flex",
    justifyContent: "center",
    textTransform: "uppercase",
    width: "33.33%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  gridItemProduct: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
  gridItemPrice: {
    fontFamily: "'Oswald', sans-serif",
    color: colors.greenDark,
    display: "flex",
    justifyContent: "center",
    width: "33.3%",
    fontSize: "1.2vw",
    [theme.breakpoints.between(601, 1281)]: {
      fontSize: "1.4vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.2vw",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  gridItemQuantity: {
    color: colors.greenDark,
    display: "flex",
    justifyContent: "center",
    width: "33.3%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
    },
  },
  gridItemTotal: {
    color: colors.greenDark,
    fontFamily: "'Oswald', sans-serif",
    display: "flex",
    justifyContent: "center",
    width: "33.3%",
    fontSize: "1.2vw",
    [theme.breakpoints.between(601, 1281)]: {
      fontSize: "1.4vw",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  gridTitle: {
    marginBottom: ({ size }) => `calc(50px *(${size.width}/1921))`,
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      display: "flex",
      alignItems: "center",
      color: colors.greenDark,
      fontWeight: "bold",
      fontSize: "2.6vw",
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
        fontSize: "10vw",
      },
    },
    [theme.breakpoints.between(601, 801)]: {
      width: "35%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  gridNoElems: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    minHeight: "60vh",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.between(601, 1281)]: {
      minHeight: "70vh",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "70vh",
      width: "100%",
    },
  },
  image: {
    maxWidth: "70%",
    maxHeight: "100%",
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
    height: ({ size }) => `calc(140px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: () => 130,
    },
  },
  itemContainer: {
    borderBottomColor: colors.grayLight,
    borderBottom: "1px solid",
    marginTop: ({ size }) => `calc(25px *(${size.width}/1921))`,
    paddingBottom: ({ size }) => `calc(25px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      margin: () => 0,
      padding: () => 0,
    },
  },
  itemTitle: {
    fontFamily: "'Oswald', sans-serif",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break-word",
    overflow: "hidden",
    color: colors.greenDark,
    fontWeight: "bold",
    fontSize: "1.3vw",
    cursor: "pointer",
    textAlign: "left",
    [theme.breakpoints.between(601, 1281)]: {
      fontSize: "1.5vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.4vw",
    },
  },
  itemRemove: {
    color: colors.grayDark,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 5,
    fontSize: "0.8vw",
    "&:hover": {
      color: colors.grayLight,
      transition: "all 0.4s ease-out",
    },
    [theme.breakpoints.between(601, 1281)]: {
      fontSize: "1vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.2vw",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textfield: {
    width: 40,
    "& label.Mui-focused": {
      color: colors.greenDark,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: colors.greenDark,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.greenDark,
      },
      "&:hover fieldset": {
        borderColor: colors.greenDark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.greenDark,
      },
    },
  },
  quantityPriceContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "30%",
      height: "100%",
      alignItems: "center",
    },
  },
  quantityPriceContainerItem: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      width: "30%",
    },
  },
  qty: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      fontFamily: "'Open Sans', sans-serif",
      display: "flex",
      alignItems: "flex-end",
      paddingRight: 10,
      color: colors.grayDark,
      fontSize: "3.3vw",
    },
  },
  gridBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: () => 100,
      alignItems: "center",
    },
  },
  buttonStyle: {
    width: "20%",
    height: "50%",
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
      width: "70%",
    },
  },
  buttonShop: {
    marginTop: ({ size }) => `calc(20px *(${size.width}/1921))`,
    width: "20%",
    height: ({ size }) => `calc(50px *(${size.width}/1921))`,
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
      marginTop: () => 15,
      height: ({ size }) => `calc(40px *(${size.width}/320))`,
      width: "70%",
    },
  },
  gridSubtotal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "20%",
    paddingBottom: 20,

    "& .MuiTypography-root": {
      color: colors.greenDark,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "1vw",
      [theme.breakpoints.between(601, 1281)]: { fontSize: "1.5vw" },
      [theme.breakpoints.down("xs")]: { fontSize: "4.5vw" },
    },
    [theme.breakpoints.between(601, 801)]: { width: "25%" },
    [theme.breakpoints.down("xs")]: { width: "100%" },
  },
  typoNoElems: {
    fontFamily: "'Oswald', sans-serif",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: colors.greenDark,
    fontWeight: "bold",
    fontSize: "2.6vw",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      fontSize: "10vw",
    },
  },
}));

function Cart(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  const [openModal, setOpenModal] = useState(false);

  let subtotalTemp = 0;
  props.cart.forEach((item) => (subtotalTemp += item.qty * item.price));

  const onChangeHandler = (id, value) => {
    props.adjustQty(id, value);
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres remover este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.greenDark,
      cancelButtonColor: colors.greenLight,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        props.removeFromCart(id);
      }
    });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{ width: "100%" }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          style={{ width: "100%" }}
        >
          <Grid className={classes.gridTitle}>
            <Typography component="span">{t("cartScreen.title")}</Typography>
          </Grid>
        </Grid>
        {props.cart.length > 0 ? (
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.gridItemsTitle}
            >
              <Grid item className={classes.gridProduct}>
                {t("cartScreen.product")}
              </Grid>
              <Grid className={classes.quantityPriceContainer}>
                <Grid item className={classes.gridPrice}>
                  {t("cartScreen.price")}
                </Grid>
                <Grid item className={classes.gridQuantity}>
                  {t("cartScreen.quantity")}
                </Grid>
                <Grid item className={classes.gridTotal}>
                  {t("cartScreen.total")}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              {props.cart.map((item, key) => {
                return (
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    key={key}
                    className={classes.itemContainer}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.gridItemProduct}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={classes.imageContainer}
                      >
                        <img
                          className={classes.image}
                          src={item.images[0]}
                          alt="productImage"
                        ></img>
                      </Grid>
                      <Grid
                        style={{
                          width: "60%",
                        }}
                      >
                        <Grid>
                          <span className={classes.itemTitle}>
                            {item.title}
                          </span>
                        </Grid>
                        <Grid>
                          <span
                            className={classes.itemRemove}
                            onClick={() => handleRemove(item.id)}
                          >
                            {t("cartScreen.remove")}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className={classes.quantityPriceContainerItem}>
                      <Grid item className={classes.gridItemPrice}>
                        {currencyFormat(item.price)}
                      </Grid>

                      <Grid item className={classes.gridItemQuantity}>
                        <Typography className={classes.qty}>
                          {t("cartScreen.qty")}
                        </Typography>
                        <TextField
                          className={classes.textfield}
                          type="number"
                          InputProps={{ inputProps: { min: 1, max: 99 } }}
                          value={item.qty}
                          onChange={(e) =>
                            onChangeHandler(item.id, e.target.value)
                          }
                        ></TextField>
                      </Grid>
                      <Grid item className={classes.gridItemTotal}>
                        {currencyFormat(item.price * item.qty)}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              <Grid className={classes.gridBottom}>
                <Grid className={classes.gridSubtotal}>
                  <Typography component="span">
                    {t("cartScreen.subtotal")}
                  </Typography>
                  <Typography
                    component="span"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {currencyFormat(subtotalTemp)}
                  </Typography>
                </Grid>
                {props.cart.length > 0 && (
                  <Button
                    className={classes.buttonStyle}
                    onClick={() => setOpenModal(true)}
                  >
                    <Typography component="span">
                      {t("cartScreen.buy")}
                    </Typography>
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid className={classes.gridNoElems}>
            <Typography component="span" className={classes.typoNoElems}>
              {t("cartScreen.noElements")}
            </Typography>
            <Grid
              style={{
                width: "100%",
              }}
            >
              <NavLink
                exact
                to="/shop"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  className={classes.buttonShop}
                  onClick={() => window[`scrollTo`]({ top: 0 })}
                >
                  <Typography component="span">
                    {t("cartScreen.goShop")}
                  </Typography>
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        )}
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
          <Form items={props.cart} setOpenModal={setOpenModal} />
        </Grow>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
