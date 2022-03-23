import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Colors";

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  loaderContainer: {
    background: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(7px)",
    position: "fixed",
    width: "100%",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 2001,
    "& svg": {
      width: "calc(100 * (100vw / 1456))",
      height: "calc(100 * (100vw / 1456))",
      [theme.breakpoints.down("xs")]: {
        width: "calc(80 * (100vw / 370))",
        height: "calc(80 * (100vw / 370))",
      },
    },
  },
}));

export default function LoaderSpinner(props) {
  const classes = useStyles();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={classes.loaderContainer}>
      <Loader
        className={classes.loader}
        visible={props.isLoading}
        type="TailSpin"
        color={colors.greenDark}
      />
    </div>
  );
}
