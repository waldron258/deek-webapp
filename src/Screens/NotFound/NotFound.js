import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Colors";
import { useWindowSize } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "'Open Sans', sans-serif",
    width: "70%",
    minHeight: "calc(100vh - 150px)",
    marginLeft: "15%",
    marginTop: ({ size }) => `calc(100px + (50px *(${size.width}/1921)))`,
    [theme.breakpoints.between(1025, 1281)]: {
      minHeight: "calc(100vh - 105px)",
      marginTop: ({ size }) => `calc(65px + (50px *(${size.width}/1921)))`,
    },
    [theme.breakpoints.between(601, 1025)]: {
      minHeight: "calc(100vh - 105px)",
      marginTop: ({ size }) => `calc(65px + (50px *(${size.width}/1921)))`,
      width: "80%",
      marginLeft: "10%",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 105px)",
      marginLeft: "5%",
      width: "90%",
      marginTop: () => 115,
    },
  },
  buttonStyle: {
    marginTop: ({ size }) => `calc(20px *(${size.width}/1921))`,
    width: "60%",
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
  gridContainer: {
    marginTop: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      marginTop: ({ size }) => `calc(50px *(${size.width}/320))`,
      width: "100%",
    },
  },
  typoTitle: {
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
  typoMessage: {
    color: colors.grayDark,
    fontSize: "1.1vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.5vw",
    },
  },
}));

export default function NotFound(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");
  return (
    <div className={classes.root}>
      <Grid className={classes.gridContainer}>
        <Grid>
          <Typography component="span" className={classes.typoTitle}>
            {t("notFound.title")}
          </Typography>
          <Typography component="span" className={classes.typoMessage}>
            {t("notFound.message")}
          </Typography>
        </Grid>
        <Grid>
          <NavLink exact to="/" style={{ textDecoration: "none" }}>
            <Button
              className={classes.buttonStyle}
              onClick={() => window[`scrollTo`]({ top: 0 })}
            >
              <Typography component="span">{t("notFound.back")}</Typography>
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </div>
  );
}
