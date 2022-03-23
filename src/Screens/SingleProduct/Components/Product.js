import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { currencyFormat } from "../../../Utils/Commons";
import { connect } from "react-redux";

import { addToCart } from "../../../redux/CartReducers/cartActions";
import { AddCircleRounded, RemoveCircleRounded } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "calc(20 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      width: "85%",
      margin: "0px 7.5%",
      marginTop: "calc(40 * (100vw / 370))",
    },
  },
  buttonCartStyle: {
    backgroundColor: "white",
    width: "calc(290 * (100vw / 1456))",
    height: "calc(32 * (100vw / 1456))",
    border: "calc(1.5 * (100vw / 1456)) solid #607C11",
    boxSizing: "border-box",
    borderRadius: "calc(22 * (100vw / 1456))",
    "& span": {
      fontFamily: "'Phetsarath', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "#607C11",
      fontSize: "calc(14 * (100vw / 1456))",
      lineHeight: "calc(20 * (100vw / 1456))",
    },
    "&:hover": {
      transition: "all 0.3s ease-out",
      backgroundColor: "#607C11",
      "& span": {
        color: "white",
      },
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "calc(22 * (100vw / 370))",
      width: "100%",
      height: "calc(32 * (100vw / 370))",
      marginBottom: "calc(60 * (100vw / 370))",
      "& span": {
        fontSize: "calc(14 * (100vw / 370))",
        lineHeight: "calc(20 * (100vw / 370))",
      },
    },
  },
  buttonBuyStyle: {
    backgroundColor: "#607C11",
    width: "calc(290 * (100vw / 1456))",
    height: "calc(32 * (100vw / 1456))",
    border: "calc(1.5 * (100vw / 1456)) solid #607C11",
    boxSizing: "border-box",
    borderRadius: "calc(22 * (100vw / 1456))",
    "& span": {
      fontFamily: "'Phetsarath', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      fontSize: "calc(14 * (100vw / 1456))",
      lineHeight: "calc(20 * (100vw / 1456))",
    },
    "&:hover": {
      transition: "all 0.3s ease-out",
      backgroundColor: "#607C11",
      "& span": {
        color: "white",
      },
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "calc(22 * (100vw / 370))",
      width: "100%",
      height: "calc(32 * (100vw / 370))",
      marginBottom: "calc(15 * (100vw / 370))",
      "& span": {
        fontSize: "calc(14 * (100vw / 370))",
        lineHeight: "calc(20 * (100vw / 370))",
      },
    },
  },
  navLinkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(290 * (100vw / 1456))",
    height: "calc(32 * (100vw / 1456))",
    borderRadius: "calc(22 * (100vw / 1456))",
    marginTop: "calc(15 * (100vw / 1456))",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "calc(15   * (100vw / 370))",
      borderRadius: "calc(22 * (100vw / 370))",
      width: "100%",
      height: "calc(32 * (100vw / 370))",
    },
  },
  carouselItemContainer: {
    width: "calc(500 * (100vw / 1456))",
    height: "calc(400 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "calc(280 * (100vw / 370))",
    },
  },
  deliveryPolicy: {
    width: "calc(460 * (100vw / 1456))",
    height: "calc(154 * (100vw / 1456))",
    border: "calc(2 * (100vw / 1456)) solid #FEAD61",
    boxSizing: "border-box",
    borderRadius: "calc(22 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "calc(160 * (100vw / 370))",
      border: "calc(1 * (100vw / 340)) solid #FEAD61",
      borderRadius: "calc(22 * (100vw / 370))",
      marginBottom: "calc(30 * (100vw / 370))",
    },
  },
  deliveryPolicyList: {
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontSize: "calc(14 * (100vw / 1456))",
    lineHeight: "calc(20 * (100vw / 1456))",
    color: "#FEAD61",
    "& span": { fontWeight: "bold" },
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(14 * (100vw / 370))",
      lineHeight: "calc(20 * (100vw / 370))",
    },
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "calc(460 * (100vw / 1456))",
    height: "calc(560 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: "auto",
      margin: "0px 5%",
      marginTop: "calc(40 * (100vw / 370))",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    width: "calc(500 * (100vw / 1456))",
    height: "calc(400 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "calc(280 * (100vw / 370))",
    },
  },
  productTitle: {
    margin: "0px",
    paddging: "0px",
    textTransform: "uppercase",
    fontFamily: "'Secular One', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(24 * (100vw / 1456))",
    lineHeight: "calc(30 * (100vw / 1456))",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "calc(20 * (100vw / 370))",
      fontSize: "calc(20 * (100vw / 370))",
      lineHeight: "calc(26 * (100vw / 370))",
    },
  },
  productDescription: {
    margin: "0px",
    paddging: "0px",
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(16 * (100vw / 1456))",
    lineHeight: "calc(26 * (100vw / 1456))",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(14 * (100vw / 370))",
      lineHeight: "calc(22 * (100vw / 370))",
      marginBottom: "calc(10 * (100vw / 370))",
    },
  },
  productPrice: {
    margin: "0px",
    paddging: "0px",
    textTransform: "uppercase",
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(24 * (100vw / 1456))",
    lineHeight: "calc(35 * (100vw / 1456))",
    color: "#607C11",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(24 * (100vw / 370))",
      lineHeight: "calc(30 * (100vw / 370))",
      marginBottom: "calc(20 * (100vw / 370))",
    },
  },
  productQuantity: {
    margin: "0px",
    paddging: "0px",
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(19 * (100vw / 1456))",
    lineHeight: "calc(26 * (100vw / 1456))",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(18 * (100vw / 370))",
      lineHeight: "calc(26 * (100vw / 370))",
      marginBottom: "calc(5 * (100vw / 370))",
    },
  },
  productAddQuantity: {
    display: "flex",
    alignItems: "center",
    "& span": {
      margin: "0px",
      padding: "0px calc(9.5 * (100vw / 1456))",
      fontFamily: "'Phetsarath', sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "calc(19 * (100vw / 1456))",
      lineHeight: "calc(26 * (100vw / 1456))",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        padding: "0px calc(7.5 * (100vw / 370))",
        fontSize: "calc(18 * (100vw / 370))",
        lineHeight: "calc(26 * (100vw / 370))",
        marginBottom: "calc(60 * (100vw / 370))",
      },
    },
    "& svg": {
      width: "calc(25 * (100vw / 1456))",
      height: "calc(25 * (100vw / 1456))",
      color: "rgba(0, 0, 0, 0.25)",
      cursor: "pointer",
      "&:hover": {
        transition: "all 0.3s ease-out",
        color: "rgba(0, 0, 0, 0.5)",
      },
      "&, &:after": {
        transition: "all 0.3s ease-out",
      },
      [theme.breakpoints.down("xs")]: {
        width: "calc(26 * (100vw / 370))",
        height: "calc(26 * (100vw / 370))",
        marginBottom: "calc(60 * (100vw / 370))",
      },
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Product(props) {
  const classes = useStyles();
  const [t] = useTranslation("common");

  const [quantity, setQuantity] = useState(1);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const addToCartButton = () => {
    setOpenAlert(true);
    props.addToCart(props.product, quantity);
  };

  const addQuantity = () => {
    setQuantity((prevState) =>
      prevState + 1 > 10 ? prevState : prevState + 1
    );
  };
  const removeQuantity = () => {
    setQuantity((prevState) => (prevState - 1 < 1 ? prevState : prevState - 1));
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <Carousel
          responsive={responsive}
          autoPlay={false}
          infinite={true}
          showDots={true}
        >
          {props.product.images.map((image, key) => (
            <div className={classes.carouselItemContainer} key={key}>
              <img alt={props.title} className={classes.image} src={image} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={classes.infoContainer}>
        <h1 className={classes.productTitle}>{props.product.title}</h1>
        <p className={classes.productDescription}>
          {props.product.description}
        </p>
        <span className={classes.productPrice}>
          {currencyFormat(props.product.price * quantity) + " COP"}
        </span>
        <span className={classes.productQuantity}>cantidad</span>
        <div className={classes.productAddQuantity}>
          <AddCircleRounded onClick={addQuantity} />
          <span>{quantity}</span>
          <RemoveCircleRounded onClick={removeQuantity} />
        </div>
        <NavLink
          exact
          to="/cart"
          className={`${classes.buttonBuyStyle} ${classes.navLinkContainer}`}
        >
          <span>{t("buttons.checkout")}</span>
        </NavLink>
        <Button className={classes.buttonCartStyle} onClick={addToCartButton}>
          <span>{t("buttons.addToCart")}</span>
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            ¡Se ha agregado al carrito!
          </Alert>
        </Snackbar>
        <div className={classes.deliveryPolicy}>
          <ul className={classes.deliveryPolicyList}>
            <span>Politicas de envío /compra</span>
            <li>Política 1</li>
            <li>Política 2</li>
            <li>Política 3</li>
            <li>Política 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, qty) => dispatch(addToCart(item, qty)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
