import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import "react-awesome-slider/dist/styles.css";
import { useTranslation } from "react-i18next";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    top: "25%",
    left: "0%",
    width: "38%",
    height: "50%",
    marginLeft: "7.5%",
    "& h2": {
      margin: 0,
      color: "white",
      textTransform: "uppercase",
      fontFamily: "'YesevaOne-Regular'",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "calc(110 * (100vw / 1456))",
      lineHeight: "calc(110 * (100vw / 1456))",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.6)",
      [theme.breakpoints.down("xs")]: {
        width: "80%",
        textAlign: "center",
        fontSize: "calc(30 * (100vw / 370))",
        lineHeight: "calc(30 * (100vw / 370))",
      },
    },
    "& p": {
      margin: 0,
      width: "90%",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "calc(20 * (100vw / 1456))",
      lineHeight: "calc(20 * (100vw / 1456))",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.6)",
      color: "white",
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
        fontSize: "calc(11 * (100vw / 370))",
        lineHeight: "calc(11 * (100vw / 370))",
      },
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      top: "60%",
      left: "50%",
      transform: "translate(-50%, 0%)",
      marginLeft: "0px",
      width: "70%",
      height: "30%",
    },
  },
  slide: {
    height: "100vh",
    [theme.breakpoints.down("xs")]: {
      background:
        "linear-gradient(180deg, rgba(229, 229, 229, 0) 0%, rgba(0, 0, 0, 0.5) 70%)",
      "& img": { position: "relative", zIndex: -1, display: "block" },
    },
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "80% 30%",
    [theme.breakpoints.down("xs")]: {
      objectPosition: "80% 0%",
    },
  },
  navLinkContainer: {
    textDecoration: "none",
  },
  buttonStyle: {
    width: "calc(184 * (100vw / 1456))",
    height: "calc(44 * (100vw / 1456))",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "calc(22 * (100vw / 1456));",
    color: "white",
    "& .MuiTypography-root": {
      fontWeight: 500,
      fontSize: "calc(19 * (100vw / 1456))",
      textTransform: "none",
      [theme.breakpoints.down("xs")]: { fontSize: "calc(15 * (100vw / 370))" },
    },
    "&:hover": {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.5)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(133.4 * (100vw / 370))",
      height: "calc(39.64 * (100vw / 370))",
      border: "1px solid #FFFFFF",
      boxSizing: "border-box",
      borderRadius: "calc(22 * (100vw / 370))",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    marginTop: "calc(20 * (100vw / 1456))",
  },
}));

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 8000, min: 3000 },
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

export default function CarouselContainer(props) {
  const classes = useStyles();
  const [t] = useTranslation("common");

  return (
    <React.Fragment>
      {props.carouselData && (
        <Carousel
          showDots={true}
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={5000}
        >
          {props.carouselData.map((slide, key) => {
            return (
              <div key={key} className={classes.slide}>
                <img
                  alt={slide.title}
                  src={slide.imagePath}
                  className={classes.slideImage}
                />
                <div className={classes.info}>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <div className={classes.buttonContainer}>
                    <NavLink
                      exact
                      to="/aboutUs"
                      className={classes.navLinkContainer}
                    >
                      <Button
                        className={classes.buttonStyle}
                        onClick={() => window[`scrollTo`]({ top: 0 })}
                      >
                        <Typography component="span">
                          {t("buttons.knowMore")}
                        </Typography>
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </React.Fragment>
  );
}
