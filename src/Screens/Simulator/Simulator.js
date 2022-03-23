import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Colors";
import { useWindowSize } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Open Sans', sans-serif",
    width: "70%",
    marginLeft: "15%",
    marginTop: ({ size }) => `calc(100px + (50px *(${size.width}/1921)))`,
    minHeight: "calc(100vh - 150px)",
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
      flexDirection: "column",
      marginLeft: "7.5%",
      width: "85%",
      marginTop: () => 115,
    },
  },
  buttonStyle: {
    marginTop: ({ size }) => `calc(30px *(${size.width}/1921))`,
    width: "25%",
    height: "50%",
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
      marginTop: ({ size }) => `calc(15px *(${size.width}/320))`,
      width: "70%",
    },
  },
  formControlLabel: {
    "& .MuiTypography-root": {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "0.9vw",
      [theme.breakpoints.down("xs")]: { fontSize: "3.7vw" },
    },
  },
  gridContent: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  gridSystem: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
    [theme.breakpoints.down("xs")]: {
      marginBottom: ({ size }) => `calc(15px *(${size.width}/320))`,
      width: "100%",
    },
  },
  gridFormulary: {
    width: "75%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  gridTitle: {
    marginBottom: ({ size }) => `calc(50px *(${size.width}/1921))`,
    "& .MuiTypography-root": {
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
    [theme.breakpoints.between(601, 801)]: {
      width: "35%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  gridNotSelected: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      textAlign: "center",
      color: colors.greenDark,
      fontWeight: "bold",
      fontSize: "2.3vw",
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
        fontSize: "7.5vw",
      },
    },
    [theme.breakpoints.down("xs")]: { height: 250 },
  },
  labelRoot: {
    marginLeft: 10,
    top: "10%",
    transform: "translate(0,-50%)",
    height: "100%",
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "0.9vw",
    [theme.breakpoints.down("xs")]: { fontSize: "3.7vw" },
  },
  labelRootText: {
    fontFamily: "'Open Sans', sans-serif",
    color: colors.grayDark,
    fontSize: "1vw",
    [theme.breakpoints.down("xs")]: { fontSize: "4vw" },
  },
  textField: {
    width: "60%",
    margin: "10px 0px",
    "& label.Mui-focused": {
      color: colors.greenDark,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.grayLight,
      },
      "&:hover fieldset": {
        borderColor: colors.greenDark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.greenDark,
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: ({ size }) => `calc(30px *(${size.width}/520))`,
      width: "95%",
    },
  },
  textFieldMonth: {
    width: "47%",
    margin: "10px 0px",
    "& label.Mui-focused": {
      color: colors.greenDark,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.grayLight,
      },
      "&:hover fieldset": {
        borderColor: colors.greenDark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.greenDark,
      },
    },
  },
  textFieldArea: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1vw",
    padding: 0,
    height: ({ size }) => `calc(55px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(35px *(${size.width}/320))`,
      fontSize: "3.7vw",
    },
  },
  typographySelectSystem: {
    display: "flex",
    alignItems: "center",
    color: colors.greenDark,
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    fontSize: "1.7vw",
    marginBottom: ({ size }) => `calc(30px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      fontSize: "6vw",
    },
  },
  onGrid: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  monthGrid: {
    marginTop: ({ size }) => `calc(30px *(${size.width}/1921))`,
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      marginTop: ({ size }) => `calc(30px *(${size.width}/520))`,
      width: "95%",
    },
  },
  monthRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const RadioColor = withStyles({
  root: {
    color: colors.grayDark,
    "&$checked": {
      color: colors.greenDark,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function Simulator(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  const [systemValue, setSystemValue] = React.useState("none");

  const [months, setMonths] = React.useState({
    mes1: { label: "Mes 1", value: "" },
    mes2: { label: "Mes 2", value: "" },
    mes3: { label: "Mes 3", value: "" },
    mes4: { label: "Mes 4", value: "" },
    mes5: { label: "Mes 5", value: "" },
    mes6: { label: "Mes 6", value: "" },
    mes7: { label: "Mes 7", value: "" },
    mes8: { label: "Mes 8", value: "" },
    mes9: { label: "Mes 9", value: "" },
    mes10: { label: "Mes 10", value: "" },
    mes11: { label: "Mes 11", value: "" },
    mes12: { label: "Mes 12", value: "" },
  });

  const [location, setLocation] = React.useState("");

  const [locations, setLocations] = React.useState([]);

  const rows = [1, 2, 3, 4, 5, 6];

  const handleSortValueChange = (event) => {
    setSystemValue(event.target.value);
    setLocation("");
  };

  const handleMonthChange = (event, key) => {
    let monthsTemp = months;
    monthsTemp["mes" + key].value = event.target.value;
    setMonths(monthsTemp);
  };

  useEffect(() => {
    setLocations([
      { label: "Barranquilla", value: 5 },
      { label: "La Guajira", value: 4.5 },
      { label: "Cartagena", value: 4 },
    ]);
  }, []);

  return (
    <div className={classes.root}>
      <Grid className={classes.gridTitle}>
        <Typography component="span">{t("simulator.title")}</Typography>
      </Grid>

      <Grid className={classes.gridContent}>
        <Grid className={classes.gridSystem}>
          <Typography
            component="span"
            className={classes.typographySelectSystem}
          >
            {t("simulator.selectSystem")}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={systemValue} onChange={handleSortValueChange}>
              <FormControlLabel
                className={classes.formControlLabel}
                value={"onGrid"}
                control={<RadioColor />}
                label={
                  <Typography
                    style={
                      "onGrid" === systemValue
                        ? { color: colors.greenDark }
                        : { color: colors.grayDark }
                    }
                  >
                    {t("simulator.onGrid")}
                  </Typography>
                }
              />
              <FormControlLabel
                className={classes.formControlLabel}
                value={"offGrid"}
                control={<RadioColor />}
                label={
                  <Typography
                    style={
                      "offGrid" === systemValue
                        ? { color: colors.greenDark }
                        : { color: colors.grayDark }
                    }
                  >
                    {t("simulator.offGrid")}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid className={classes.gridFormulary}>
          {systemValue === "onGrid" ? (
            <Grid className={classes.onGrid}>
              <FormControl className={classes.textField}>
                <InputLabel className={classes.labelRoot}>
                  {t("simulator.selectLocation")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  className={classes.textFieldArea}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations &&
                    locations.map((location, key) => {
                      return (
                        <MenuItem value={location.value} key={key}>
                          {location.label}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              {location !== "" && (
                <Grid className={classes.monthGrid}>
                  <InputLabel className={classes.labelRoot}>
                    {t("simulator.energyConsumption")}
                  </InputLabel>
                  {rows.map((row, key) => (
                    <Grid className={classes.monthRow} key={key}>
                      <TextField
                        className={classes.textFieldMonth}
                        label={months[String("mes" + (row * 2 - 1))].label}
                        variant="outlined"
                        type="number"
                        InputProps={{
                          className: classes.textFieldArea,
                          inputProps: { min: 1, max: 99 },
                        }}
                        InputLabelProps={{
                          className: classes.labelRootText,
                          shrink: true,
                        }}
                        onChange={(e) => handleMonthChange(e, row * 2 - 1)}
                      />
                      <TextField
                        className={classes.textFieldMonth}
                        label={months[String("mes" + row * 2)].label}
                        variant="outlined"
                        type="number"
                        InputProps={{
                          className: classes.textFieldArea,
                          inputProps: { min: 1, max: 99 },
                        }}
                        InputLabelProps={{
                          className: classes.labelRootText,
                          shrink: true,
                        }}
                        onChange={(e) => handleMonthChange(e, row * 2)}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button className={classes.buttonStyle}>
                <Typography component="span">
                  {t("simulator.calculate")}
                </Typography>
              </Button>
            </Grid>
          ) : systemValue === "offGrid" ? (
            <Grid>off grid</Grid>
          ) : (
            <Grid className={classes.gridNotSelected}>
              <Typography component="span">
                {t("simulator.notSelected")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
