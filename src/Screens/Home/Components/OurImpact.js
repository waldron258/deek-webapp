import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import lineImage from "../../../Assets/icons/line.svg";
import linexsImage from "../../../Assets/icons/linexs.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${lineImage})`,
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "calc(205 * (100vw / 1456))",
    boxShadow: "inset 0px 15px 20px rgba(0, 0, 0, 0.6)",
    color: "white",
    backgroundColor: "#7F9A4A",

    [theme.breakpoints.down("xs")]: {
      backgroundPosition: "right calc(25 * (100vw / 370))",
      backgroundImage: `url(${linexsImage})`,
      height: "calc(182 * (100vw / 370))",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "31%",
    marginLeft: "2.3%",
    height: "80%",
    textTransform: "uppercase",
    "& .MuiTypography-root": {
      textAlign: "center",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "calc(40 * (100vw / 1456))",
      lineHeight: "calc(35 * (100vw / 1456))",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "calc(20 * (100vw / 370))",
        fontSize: "calc(15 * (100vw / 370))",
      },
    },
    "& span": {
      margin: 0,
      textAlign: "center",
      fontSize: "calc(20 * (100vw / 1456))",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "calc(15 * (100vw / 370))",
        fontSize: "calc(11 * (100vw / 370))",
      },
    },
  },
  up: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "calc(40 * (100vw / 370))",
    },
  },
  down: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "calc(40 * (100vw / 370))",
    },
  },
}));

export default function OurImpact() {
  const classes = useStyles();
  const [t] = useTranslation("common");

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center">
        <Grid className={`${classes.section} ${classes.up}`}>
          <Typography component="p">{t("infoScreen.impact1")}</Typography>
          <span>{t("infoScreen.impact2")}</span>
        </Grid>
        <Grid className={`${classes.section} ${classes.down}`}>
          <Typography>{t("infoScreen.effectiveness1")}</Typography>
          <span>{t("infoScreen.effectiveness2")}</span>
        </Grid>
        <Grid
          className={`${classes.section} ${classes.up}`}
          style={{ width: "28%", marginLeft: "5.3%" }}
        >
          <Typography>{t("infoScreen.clients1")}</Typography>
          <span>{t("infoScreen.clients2")}</span>
        </Grid>
      </Grid>
    </div>
  );
}
