import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { useTranslation } from "react-i18next";
// import { getCollection } from "../../../../../handlers/handlers";

import clientsImage from "../../../Assets/StaticImages/clients.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },
  sectionTitle: {
    marginTop: "calc(100 * (100vw / 1456))",
    "& .MuiTypography-root": {
      display: "flex",
      fontFamily: "'Secular One', sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "calc(35 * (100vw / 1456))",
      lineHeight: "calc(40 * (100vw / 1456))",
      textAlign: "center",
      color: "#111309",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: "calc(21 * (100vw / 370))",
        lineHeight: "calc(21 * (100vw / 370))",
        marginBottom: "calc(80 * (100vw / 370))",
      },
    },
  },
  imageContainer: {
    width: "calc(894 * (100vw / 1456))",
    height: "calc(495 * (100vw / 1456))",
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      width: "calc(307* (100vw / 370))",
      height: "calc(80 * (100vw / 370))",
    },
  },
}));

export default function OurClients() {
  const classes = useStyles();
  // const [t] = useTranslation("common");
  // const [clients, setClients] = useState([]);

  // // const getClients = async () => {
  // //   getCollection("clients").then((response) => {
  // //     if (response.status) {
  // //       setClients(response.data);
  // //     }
  // //   });
  // // };

  // // useEffect(() => {
  // //   getClients();
  // // }, []);

  return (
    <div className={classes.root}>
      <div className={classes.sectionTitle}>
        <Typography component="span">
          Nuestros Clientes Y
          <br />
          Aliados
        </Typography>
      </div>
      <img
        alt="clients"
        src={clientsImage}
        className={classes.imageContainer}
      />
    </div>
  );
}
