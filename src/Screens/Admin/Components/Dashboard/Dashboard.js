import React from "react";
import SideBar from "../Sidebar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
//import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    marginTop: 100,
  },
  sideBarContainer: { width: "250px" },
  viewContainer: { backgroundColor: "blue", width: "100%", padding: 25 },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <SideBar title={"adminPanel.dashboard"} />
      </div>
      <div>Cualquier vaina</div>
    </div>
  );
}
