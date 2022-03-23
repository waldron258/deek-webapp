import React from "react";
import {
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { colors } from "../../../Utils/Colors";
import { useWindowSize } from "../../../Utils/Commons";
import { useTranslation } from "react-i18next";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginLeft: "10%",
    minHeight: "calc(100vh - 150px)",
    marginTop: 150,
    fontFamily: "'Open Sans', sans-serif",
    [theme.breakpoints.between(601, 1281)]: {
      minHeight: "calc(100vh - 105px)",
      marginTop: 105,
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 105px)",
      flexDirection: "column",
      marginLeft: "7.5%",
      width: "85%",
      marginTop: 115,
    },
  },
  emptyRoot: {
    height: "100vh",
  },
  accordeonContainer: {
    border: "1px solid rgba(192, 188, 188,0.7)",
    borderRadius: 0,
    boxShadow: "none",
    marginTop: -1,
  },
  accordeonFilterContainer: {
    marginTop: 20,
  },
  formControlLabel: {
    "& .MuiTypography-root": {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "0.9vw",
      [theme.breakpoints.down("xs")]: { fontSize: "3.7vw" },
    },
  },
  formControl: {
    width: "100%",
    "& label.Mui-focused": {
      color: colors.greenDark,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: colors.greenDark,
    },
  },
  gridTitle: {
    marginBottom: 50,
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
  gridContent: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  gridFiltersContainer: {
    top: 0,
    width: "25%",
    [theme.breakpoints.between(601, 1025)]: { width: "30%" },
    [theme.breakpoints.down("xs")]: {
      position: "static",
      width: "100%",
    },
  },
  gridFilters: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  gridProducts: {
    width: "73.5%",
    marginLeft: "1.5%",
    "& .MuiPagination-root": {
      display: "flex",
      justifyContent: "center",
      marginTop: 50,
    },
    "& .Mui-selected": {
      backgroundColor: colors.greenDark,
      color: "white",
    },
    [theme.breakpoints.between(601, 1025)]: { width: "68.5%" },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      width: "100%",
    },
  },
  gridNoProducts: {
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
  iconStyle: {
    width: 40,
    height: 40,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 30,
    },
  },
  typographyFilterProducts: {
    display: "flex",
    alignItems: "center",
    color: colors.greenDark,
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    fontSize: "1.7vw",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      fontSize: "6vw",
    },
  },
  typographyAccordeon: {
    fontFamily: "'Oswald', sans-serif",
    color: colors.greenDark,
    fontSize: "1.2vw",
    [theme.breakpoints.between(601, 1025)]: {
      fontSize: "1.7vw",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      fontSize: "5vw",
    },
  },
  labelRoot: {
    color: colors.grayDark,
    fontSize: "0.9vw",
    [theme.breakpoints.down("xs")]: { fontSize: "3.7vw" },
  },
}));

const CheckboxColor = withStyles({
  root: {
    color: colors.grayDark,
    "&$checked": {
      color: colors.greenDark,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RadioColor = withStyles({
  root: {
    color: colors.grayDark,
    "&$checked": {
      color: colors.greenDark,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//const distinct = (value, index, self) => {  return self.indexOf(value) === index;};

export default function ShopFilter(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  return (
    props.categoriesFilter && (
      <div className={classes.gridFiltersContainer}>
        <Typography
          component="span"
          className={classes.typographyFilterProducts}
        >
          <SearchOutlined className={classes.iconStyle} />
          {t("shopScreen.filterProducts")}
        </Typography>
        <Accordion className={classes.accordeonContainer}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              component="span"
              className={classes.typographyAccordeon}
            >
              {t("shopScreen.search")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              className={classes.formControl}
              noOptionsText={t("shopScreen.noOptions")}
              filterSelectedOptions={true}
              open={props.filtered}
              onClose={() => props.setFiltered(false)}
              options={
                props.isFiltered
                  ? props.contentPageFiltered
                      .filter((elem) => props.categoriesFilter[elem.category])
                      .map((elem) => elem.title)
                  : props.content.map((elem) => elem.title)
              }
              onChange={(event, value) => {
                console.log(value);
                if (value) {
                  props.handleContentFilteredChange(
                    props.content.filter((elem) => elem.title === value)
                  );
                  !props.isFiltered &&
                    props.setContentPageFiltered(props.contentFiltered);
                } else {
                  props.handleContentFilteredChange(
                    props.isFiltered
                      ? props.content.filter(
                          (elem) => props.categoriesFilter[elem.category]
                        )
                      : props.content
                  );
                  props.setContentPageFiltered(props.contentFiltered);
                }

                props.setFiltered(false);
                props.handleFirstPagination();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    props.setWord(e.target.value);
                    e.target.value.length > 1
                      ? props.setFiltered(true)
                      : props.setFiltered(false);
                  }}
                  value={props.word}
                  label={t("shopScreen.productName")}
                  variant="standard"
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    },
                  }}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordeonContainer}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              component="span"
              className={classes.typographyAccordeon}
            >
              {t("shopScreen.categories")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <FormGroup>
                {props.categories.length > 0 &&
                  props.categories.map((category, key) => (
                    <FormControlLabel
                      key={key}
                      className={classes.formControlLabel}
                      control={
                        <CheckboxColor
                          checked={props.categoriesFilter[category.value]}
                          onChange={props.handleCategoriesFilterChange}
                          name={category.value}
                        />
                      }
                      label={
                        <Typography
                          style={
                            props.categoriesFilter[category.value]
                              ? { color: colors.greenDark }
                              : { color: colors.grayDark }
                          }
                        >
                          {category.label}
                        </Typography>
                      }
                    />
                  ))}
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordeonContainer}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              component="span"
              className={classes.typographyAccordeon}
            >
              {t("shopScreen.sort")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={props.sortValue}
                onChange={props.handleSortValueChange}
              >
                {props.sortValues.map((sort, key) => (
                  <FormControlLabel
                    key={key}
                    className={classes.formControlLabel}
                    value={sort.value}
                    control={<RadioColor />}
                    label={
                      <Typography
                        style={
                          sort.value === props.sortValue
                            ? { color: colors.greenDark }
                            : { color: colors.grayDark }
                        }
                      >
                        {sort.label}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
}
