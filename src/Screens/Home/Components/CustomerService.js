import React from "react";
import { makeStyles } from "@material-ui/core";
//import { useTranslation } from "react-i18next";

import headphonesIcon from "../../../Assets/icons/headphones.png";
import worldIcon from "../../../Assets/icons/world.png";
import emojiIcon from "../../../Assets/icons/emoji.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    height: "calc(205 * (100vw / 1456))",
    margin: "0px 5%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
      height: "calc(546 * (100vw / 370))",
      margin: "0px",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "33.3%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "calc(182 * (100vw / 370))",
    },
  },
  text: {
    margin: 0,
    padding: 0,
    width: "40%",
    marginTop: "calc(20 * (100vw / 1456))",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(14 * (100vw / 1456))",
    lineHeight: "calc(20 * (100vw / 1456))",
    textAlign: "center",
    color: "#D7A23F",
    [theme.breakpoints.down("xs")]: {
      lineHeight: "calc(20 * (100vw / 370))",
      fontSize: "calc(13 * (100vw / 370))",
    },
  },
  headphones: {
    width: "calc(61 * (100vw / 1456))",
    height: "calc(67 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(38.54 * (100vw / 370))",
      height: "calc(41.85 * (100vw / 370))",
    },
  },
  world: {
    width: "calc(72 * (100vw / 1456))",
    height: "calc(69 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(45.13 * (100vw / 370))",
      height: "calc(43.26 * (100vw / 370))",
    },
  },
  emoji: {
    width: "calc(72 * (100vw / 1456))",
    height: "calc(76 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(44.87 * (100vw / 370))",
      height: "calc(46.47 * (100vw / 370))",
    },
  },
}));

const CustomerService = () => {
  const classes = useStyles();
  // const [t] = useTranslation("common");

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <img
          alt="headphones"
          src={headphonesIcon}
          className={classes.headphones}
        />
        <h2 className={classes.text}>
          Atención de
          <br />
          primera
        </h2>
      </div>
      <div className={classes.section}>
        <img alt="world" src={worldIcon} className={classes.world} />
        <h2 className={classes.text}>
          Comprometidos
          <br />
          con el medio ambiente
        </h2>
      </div>
      <div className={classes.section}>
        <img alt="emoji" src={emojiIcon} className={classes.emoji} />
        <h2 className={classes.text}>
          Clientes
          <br />
          satisfechos
        </h2>
      </div>
    </div>
  );
};

export default CustomerService;
