import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(800 * (100vw / 1456))",
    width: "90%",
    margin: "calc(20 * (100vw / 1456)) 5%",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "700px",
      height: "calc(600 * (100vw / 370))",
    },
  },
}));

export const PdfViewer = (props) => {
  const classes = useStyles();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={classes.root}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer
          fileUrl={props.dataSheet}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
