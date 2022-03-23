import React from "react";
import { makeStyles } from "@material-ui/core";
//import { useTranslation } from "react-i18next";
import backgroundImage from "../../../Assets/StaticImages/ourphilosophy.png";
import trustImage from "../../../Assets/icons/trust.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    backgroundPosition: "5% 0%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginBottom: "calc(220 * (100vw / 370))",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "5% 4.5%",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      marginTop: "60vh",
    },
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "calc(360 * (100vw / 1456))",
    height: "calc(444 * (100vw / 1456))",
    marginTop: "8.5%",
    background: "#D7A23F",
    borderTopLeftRadius: "calc(27 * (100vw / 1456))",
    borderBottomLeftRadius: "calc(27 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(338 * (100vw / 370))",
      height: "calc(188 * (100vw / 370))",
      borderRadius: "calc(27 * (100vw / 370))",
    },
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "calc(433 * (100vw / 1456))",
    height: "calc(555 * (100vw / 1456))",
    backgroundColor: "#FFF",
    borderRadius: "calc(28 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      marginTop: "calc(-35 * (100vw / 370))",
      width: "calc(307 * (100vw / 370))",
      height: "calc(340 * (100vw / 370))",
      borderRadius: "calc(28 * (100vw / 370))",
    },
  },
  sectionTitle: {
    margin: 0,
    padding: 0,
    fontFamily: "'Rozha One', serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(60 * (100vw / 1456))",
    lineHeight: "calc(62 * (100vw / 1456))",
    textAlign: "center",
    color: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(26 * (100vw / 370))",
      lineHeight: "calc(20 * (100vw / 370))",
      width: "60%",
    },
  },
  trustIcon: {
    marginTop: "calc(98 * (100vw / 1456))",
    marginBottom: "calc(22 * (100vw / 1456))",
    width: "calc(46 * (100vw / 1456))",
    height: "calc(58 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      marginTop: "calc(36.58 * (100vw / 370))",
      width: "calc(27.33 * (100vw / 370))",
      height: "calc(36.88 * (100vw / 370))",
    },
  },
  contentTitle: {
    width: "100%",
    color: "#D7A23F",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "calc(22 * (100vw / 1456))",
    textAlign: "flex-start",
    borderBottom: "calc(2.5 * (100vw / 1456)) solid #D7A23F",
    lineHeight: "1px",
    margin: "calc(10 * (100vw / 1456)) 0 calc(20 * (100vw / 1456))",
    "& span": {
      background: "#fff",
      paddingRight: "calc(20 * (100vw / 1456))",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(15 * (100vw / 370))",
    },
  },
  contentInfo: {
    margin: 0,
    padding: 0,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(13 * (100vw / 1456))",
    lineHeight: "calc(15 * (100vw / 1456))",
    color: "#5F5D72",
    [theme.breakpoints.down("xs")]: {
      marginTop: "calc(10 * (100vw / 370))",
      lineHeight: "calc(15 * (100vw / 370))",
      fontSize: "calc(12 * (100vw / 370))",
    },
  },
  paragraph: {
    width: "85%",
  },
}));

const OurPhilosophy = () => {
  const classes = useStyles();
  // const [t] = useTranslation("common");

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <img alt="trust" src={trustImage} className={classes.trustIcon} />
          <h2 className={classes.sectionTitle}>CONFIA EN NOSOTROS</h2>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.paragraph}>
            <h3 className={classes.contentTitle}>
              <span>NUESTRA MISIÓN</span>
            </h3>
            <p className={classes.contentInfo}>
              Nuestra misión es promover y distribuir el uso de las fuentes de
              energía no convencionales en Colombia, logrando impactar no solo a
              hogares y empresas colombianos sino también lugares más
              vulnerables y brindarles toda la información, capacitación y
              herramientas necesaria para hacer uso de estos sistemas.
            </p>
          </div>
          <div className={classes.paragraph}>
            <h3 className={classes.contentTitle}>
              <span>NUESTRA VISIÓN</span>
            </h3>
            <p className={classes.contentInfo}>
              Nuestra visión es ser parte del desarrollo sostenible en la
              transición energética de mi país Colombia, aplicando sistemas de
              energía no convencionales como la mejor alternativa de fuente de
              energía y para ello inculcar conocimiento, alternativas y
              soluciones para que todas las personas puedan tener acceso y
              contribuir el progreso de la nación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPhilosophy;
