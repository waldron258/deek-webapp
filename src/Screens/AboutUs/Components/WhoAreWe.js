import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import aboutUsBG from "../../../Assets/StaticImages/aboutUsBG.png";
import aboutUs1 from "../../../Assets/StaticImages/aboutUs1.png";
import aboutUs2 from "../../../Assets/StaticImages/aboutUs2.png";
import aboutUs3 from "../../../Assets/StaticImages/aboutUs3.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundImage: `url(${aboutUsBG})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    [theme.breakpoints.down("xs")]: {},
  },
  img1: {
    zIndex: 10,
    position: "absolute",
    left: "calc(140 * (100vw / 1456))",
    top: "22%",
    width: "calc(526 * 0.8 * (100vw / 1456))",
    height: "calc(431 * 0.8 * (100vw / 1456))",
    borderRadius: "calc(49 * 0.8 * (100vw / 1456))",
  },
  img2: {
    zIndex: 11,
    position: "absolute",
    left: "calc(476 * (100vw / 1456))",
    top: "53.5%",
    width: "calc(348 * 0.8 * (100vw / 1456))",
    height: "calc(209 * 0.8 * (100vw / 1456))",
    borderRadius: "calc(22 * 0.8 * (100vw / 1456))",
  },
  img3: {
    zIndex: 12,
    position: "absolute",
    left: "calc(140 * (100vw / 1456))",
    top: "70%",
    width: "calc(492 * 0.8 * (100vw / 1456))",
    height: "calc(219 * 0.8 * (100vw / 1456))",
    borderRadius: "calc(59 * 0.8 * (100vw / 1456))",
  },
  infoContainer: { width: "40%", marginRight: "5%" },
  text: {
    marginLeft: "calc(20 * (100vw / 1456))",
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(18 * (100vw / 1456))",
    lineHeight: "calc(25 * (100vw / 1456))",
    color: "white",
  },
  title: {
    margin: 0,
    fontFamily: "'Phetsarath', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(34 * (100vw / 1456))",
    lineHeight: "calc(40 * (100vw / 1456))",
    color: "white",
  },
}));

export default function WhoAreWe() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt={"img1"} src={aboutUs1} className={classes.img1} />
      <img alt={"img2"} src={aboutUs2} className={classes.img2} />
      <img alt={"img3"} src={aboutUs3} className={classes.img3} />
      <div className={classes.infoContainer}>
        <h3 className={classes.title}>¿QUIENES SOMOS?</h3>
        <p className={classes.text}>
          ¡Bienvenido! Si estás aquí eres parte de la nueva generación, eres
          parte del cambio. Te invitamos a que conozcas nuestro portafolio y
          nuestros servicios.
          <br />
          <br />
          Somos Deek S.A.S una empresa dedicada a la comercialización de
          sistemas de energía solar, buscamos a través de nuestros servicios y
          nuestro talento humano altamente competente y capacitado lograr ser
          líder en soluciones, y además poder garantizar la calidad de todos
          nuestros procesos con un servicio eficiente y oportuno.
        </p>
      </div>
    </div>
  );
}
