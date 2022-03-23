import React from "react";

import WhoAreWe from "./Components/WhoAreWe";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundImage: `url(${aboutUsBG})`,
//     backgroundSize: "cover",
//     width: "100%",
//     height: "100vh",
//     [theme.breakpoints.down("xs")]: {},
//   },
// }));

export default function AboutUs() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <WhoAreWe />
    </React.Fragment>
  );
}
