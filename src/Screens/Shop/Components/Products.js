import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Grow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../../Utils/Colors";
import { useTranslation } from "react-i18next";
import { currencyFormat, useWindowSize } from "../../../Utils/Commons";
import { addToCart } from "../../../redux/CartReducers/cartActions";
import "react-multi-carousel/lib/styles.css";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: { marginTop: 20 },
  },
  cardContainer: {
    borderRadius: 0,
    padding: 15,
    position: "relative",
    "& .MuiButton-root": { display: "none" },
    "&:hover": {
      "& .MuiButton-root": {
        display: "block",
        position: "absolute",
        width: "70%",
        height: ({ size }) => `calc(50px *(${size.width}/1921))`,
        top: "65%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: colors.greenLight,
        borderRadius: 60,
        zIndex: 100,
        margin: 0,
        padding: 0,
        "& .MuiTypography-root": {
          fontFamily: "'Oswald', sans-serif",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1.1vw",
          color: "white",
          alignContent: "center",
        },
        "&:hover": {
          backgroundColor: colors.greenDark,
        },
        [theme.breakpoints.between(601, 1281)]: {
          width: "60%",
          top: "60%",
        },
        [theme.breakpoints.down("xs")]: {
          "&:hover": {
            boxShadow: "6px 6px 6px rgba(0, 0, 0, 0)",
            transition: "all 0.4s ease-out",
          },
          display: "none",
        },
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0px",
      "& .MuiCard-root": {
        "& .MuiCardActions-root": {
          display: "flex",
          position: "relative",
          alignItems: "flex-start",

          height: "8vh",
          "& .MuiButton-root": {
            position: "absolute",
            width: "20%",
            height: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.greenLight,
            borderRadius: 60,
            "& .MuiTypography-root": {
              fontFamily: "'Oswald', sans-serif",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "5.2vw",
              color: "white",
            },
            [theme.breakpoints.down("xs")]: {
              width: "70%",
              height: "70%",
            },
          },
        },
      },
    },
  },
  cardActions: {
    display: "none",
  },
  cardContent: {
    color: "black",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: ({ size }) => `calc(120px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: () => "16vh",
    },
  },
  cardContentParagraph: {
    fontFamily: "'Oswald', sans-serif",
    alignItems: "center",
    textAlign: "top",
    color: colors.greenDark,
    fontWeight: "bold",
    fontSize: "1vw",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-word",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.5vw",
    },
  },
  cardContentTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    fontSize: "1.3vw",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-word",
    overflow: "hidden",
    color: colors.greenDark,
    [theme.breakpoints.down("xs")]: {
      fontSize: "6vw",
    },
  },
  cardStyle: {
    maxWidth: "100%",
    border: "1px solid rgba(192, 188, 188,0.7)",
    borderRadius: 0,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.2)",
      transition: "all 0.4s ease-out",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: ({ size }) => `calc(300px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: () => "49vh",
    },
  },
  image: {
    maxWidth: "95%",
    maxHeight: "95%",
    //boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.2)",
  },
}));

function Product(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  const handleClick = (id) => {
    window.location.pathname = `singleProduct/${id}`;
  };

  useEffect(() => {
    props.setChecked(true);
  }, [props.checked]);

  return (
    <Grid container direction="row" className={classes.root}>
      {props.content.map((product, key) => (
        <Grow
          key={key}
          in={props.checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(props.checked ? { timeout: (key + 1) * 1000 } : {})}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.cardContainer}
            key={key}
          >
            <Button onClick={() => props.addToCart(product, 1)}>
              <Typography component="span">{t("buttons.addToCart")}</Typography>
            </Button>
            <Card
              className={classes.cardStyle}
              onClick={() => handleClick(product.id)}
            >
              <CardActionArea>
                <div className={classes.imageContainer}>
                  <img
                    alt={product.name}
                    className={classes.image}
                    src={product.images[0]}
                  ></img>
                </div>
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.cardContentTitle}
                    component="span"
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    component="span"
                    className={classes.cardContentParagraph}
                  >
                    {currencyFormat(product.price) + " COP"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Button
                  style={{ display: "flex" }}
                  onClick={() => props.addToCart(product, 1)}
                >
                  <Typography component="span">
                    {t("buttons.addToCart")}
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, qty) => dispatch(addToCart(item, qty)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
