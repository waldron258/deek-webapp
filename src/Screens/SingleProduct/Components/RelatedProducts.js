import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { currencyFormat } from "../../../Utils/Commons";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 8000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    marginBottom: "calc(80 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      marginBottom: "calc(80 * (100vw / 370))",
    },
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "calc(309.81 * (100vw / 1456))",
    height: "calc(330 * (100vw / 1456))",
    background: "#e0e2da",
    borderRadius: "calc(25 * (100vw / 1456))",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      background: "#DED5BE",
      cursor: "pointer",
      transform: "scale(1.12)",
      transition: "all 0.3s ease-out",
    },
    "&, &:after": {
      transform: "scale(1)",
      transition: "all 0.3s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(159.43 * (100vw / 370))",
      height: "calc(175.38 * (100vw / 370))",
      borderRadius: "calc(25 * (100vw / 370))",
    },
  },
  cardTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(15 * (100vw / 1456))",
    lineHeight: "calc(15 * (100vw / 1456))",
    height: "calc(30 * (100vw / 1456))",
    textAlign: "flex-start",
    color: "#555E30",
    width: "80%",
    textTransform: "uppercase",
    marginBottom: "calc(5 * (100vw / 1456))",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-word",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      height: "calc(30 * (100vw / 370))",
      fontSize: "calc(11 * (100vw / 370))",
      lineHeight: "calc(15 * (100vw / 370))",
    },
  },
  carouselStyle: {
    width: "100%",
    height: "calc(400 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      height: "calc(220 * (100vw / 370))",
    },
  },
  imageContainer: {
    width: "calc(283.99 * (100vw / 1456))",
    height: "calc(194 * (100vw / 1456))",
    borderRadius: "calc(20 * (100vw / 1456))",
    marginBottom: "calc(30 * (100vw / 1456))",
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      width: "calc(147.21 * (100vw / 370))",
      height: "calc(99.91 * (100vw / 370))",
      borderRadius: "calc(31 * (100vw / 370))",
    },
  },
  sectionCarousel: {
    marginTop: "calc(5 * (100vw / 1456))",
    width: "100%",
  },
  sectionTitle: {
    marginTop: "calc(50 * (100vw / 1456))",
    "& .MuiTypography-root": {
      display: "flex",
      fontFamily: "'Secular One', sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "calc(24 * (100vw / 1456))",
      lineHeight: "calc(30 * (100vw / 1456))",
      textAlign: "center",
      color: "#111309",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: "calc(21 * (100vw / 370))",
        lineHeight: "calc(21 * (100vw / 370))",
        marginBottom: "calc(40 * (100vw / 370))",
      },
    },
  },
}));
export default function RelatedProducts(props) {
  const classes = useStyles();

  const handleClick = (id) => {
    window.location.pathname = `singleProduct/${id}`;
  };

  return (
    <div className={classes.root}>
      <div className={classes.sectionTitle}>
        <Typography component="span">Productos Relacionados</Typography>
      </div>
      {props.relatedProducts.length > 0 && (
        <div className={classes.sectionCarousel}>
          <Carousel
            className={classes.carouselStyle}
            responsive={responsive}
            autoPlay={false}
            centerMode={true}
            additionalTransfrom={50}
          >
            {props.relatedProducts.map((product, key) => (
              <div
                className={classes.cardContainer}
                key={key}
                onClick={() => handleClick(product.id)}
              >
                <img
                  alt={product.name}
                  src={product.images[0]}
                  className={classes.imageContainer}
                />
                <Typography component="span" className={classes.cardTitle}>
                  {product.title}
                </Typography>
                <Typography
                  component="span"
                  className={classes.cardTitle}
                  style={{ color: "#607C11" }}
                >
                  {currencyFormat(product.price)}
                </Typography>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
