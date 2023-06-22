import React from "react";
import { Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// import PdfViewer from "./PdfViewer";

import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "calc(80 * (100vw / 1456))",
    marginBottom: "calc(40 * (100vw / 1456))",

    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "0px 10%",
      marginBottom: "calc(60 * (100vw / 370))",
    },
  },
  specContainer: {
    width: "85%",
    margin: "calc(50 * (100vw / 1456)) 7.5%",
    [theme.breakpoints.down("xs")]: {},
  },
  specInfo: {
    color: "#00000",
    fontSize: "calc(16 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: { fontSize: "calc(14 * (100vw / 370))" },
  },

  specTitle: {
    textTransform: "uppercase",
    fontFamily: "'Secular One', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(24 * (100vw / 1456))",
    lineHeight: "calc(30 * (100vw / 1456))",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "calc(22 * (100vw / 370))",
      lineHeight: "calc(28 * (100vw / 370))",
    },
  },
  tab: {
    minHeight: "calc(35 * (100vw / 1456))",
    height: "calc(35 * (100vw / 1456))",
    minWidth: "calc(200 * (100vw / 1456))",
    width: "calc(200 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(35 * (100vw / 370))",
      height: "calc(35 * (100vw / 370))",
      minWidth: "calc(120 * (100vw / 370))",
      width: "calc(120 * (100vw / 370))",
    },
  },
  tabHead: {
    width: "70%",
    marginLeft: "2.5%",
    backgroundColor: " #A8A8A8",
    borderRadius: "calc(24 * (100vw / 1456))",
    height: "calc(35 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0px",
      borderRadius: "calc(24 * (100vw / 370))",
      height: "calc(35 * (100vw / 370))",
    },
  },
  tabContent: {
    marginTop: "calc(5 * (100vw / 1456))",
    padding: "calc(20 * (100vw / 1456)) 0px",
    borderRadius: "calc(33 * (100vw / 1456))",
    backgroundColor: "rgba(196, 196, 196, 0.44)",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "calc(33 * (100vw / 370))",
      marginTop: "calc(5 * (100vw / 370))",
      padding: "calc(20 * (100vw / 370)) 0px",
      width: "100%",
      height: "calc(600 * (100vw / 370))",
      overflow: "auto",
    },
  },
  tabContentResponsive: {
    [theme.breakpoints.down("xs")]: { padding: 0 },
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontFamily: "'Phetsarath', sans-serif",
    fontWeight: "bold",
    fontSize: "calc(16 * (100vw / 1456))",
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      height: "calc(35 * (100vw / 1456))",
      color: "#fff",
      backgroundColor: "#6F6F6F",
      transition: "all 0.3s ease-out",
      borderRadius: "calc(24 * (100vw / 1456))",
      [theme.breakpoints.down("xs")]: {
        height: "calc(35 * (100vw / 370))",
        borderRadius: "calc(24 * (100vw / 370))",
      },
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
    "&:hover": {
      transition: "all 0.3s ease-out",
      borderRadius: "calc(24 * (100vw / 1456))",
      backgroundColor: "#6F6F6F",
      [theme.breakpoints.down("xs")]: {
        borderRadius: "calc(24 * (100vw / 370))",
      },
    },
    "&, &:after": {
      transition: "all 0.3s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(12 * (100vw / 370))",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductSpecs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabHead}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab
            classes={{
              root: classes.tab,
            }}
            label="Descripción"
            {...a11yProps(0)}
          />
          <StyledTab
            classes={{
              root: classes.tab,
            }}
            label="Fincha Técnica"
            {...a11yProps(1)}
          />
        </StyledTabs>
      </div>
      <TabPanel value={value} className={classes.tabContent} index={0}>
        {props.productSpecs.map((productSpec, key) => (
          <div className={classes.specContainer} key={key}>
            <Typography className={classes.specTitle}>
              {productSpec.title}
            </Typography>
            {productSpec.description.split("\n").map((paragraph, key) => (
              <p className={classes.specInfo} key={key}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </TabPanel>
      <TabPanel
        value={value}
        className={`${classes.tabContent} ${classes.tabContentResponsive}`}
        index={1}
      >
        {/* <PdfViewer dataSheet={props.dataSheet} /> */}
      </TabPanel>
    </div>
  );
}
