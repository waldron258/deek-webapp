import React, { useEffect, useCallback, useState } from "react";
import ProductCard from "./Components/Products";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Colors";
import { getCollection } from "../../handlers/handlers";
import { useWindowSize } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import Loader from "../LoaderSpinner/LoaderSpinner";
import Swal from "sweetalert2";

import ShopFilter from "./Components/ShopFilter";

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
  gridContent: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
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
}));

let contentFiltered;

export default function Shop() {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const [t] = useTranslation("common");

  const [content, setContent] = useState(null);
  const [page, setPage] = useState(1);
  const [elementsPerPage] = useState(12);
  const [pageContent, setPageContent] = useState(null);
  const [contentPageFiltered, setContentPageFiltered] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortValue, setSortValue] = useState("none");
  const [word, setWord] = useState("");
  const [filtered, setFiltered] = useState(false);

  const [checked, setChecked] = React.useState(false);

  const handleContentFilteredChange = (value) => {
    contentFiltered = value;
  };

  const handleGetCategories = useCallback(async () => {
    let response = await getCollection("categories");
    setCategories(response.data.sort((a, b) => (a.label > b.label ? 1 : -1)));
  }, []);

  const handleGetSortValues = () => {
    let sortValues = [
      { label: "Ninguno", value: "none" },
      { label: "Alfabético", value: "alphabetical" },
      { label: "Precio más bajo al más alto", value: "lowestToHighest" },
      { label: "Precio más alto al más bajo", value: "highestToLowest" },
    ];
    return sortValues;
  };

  const handleGetCategoriesFilter = useCallback(async () => {
    let categoriesFilterTemp = await getCollection("categoriesBool");

    delete categoriesFilterTemp.data[0].id;
    setCategoriesFilter(categoriesFilterTemp.data[0]);
    categoriesFilter && setIsLoading(false);
  }, [categoriesFilter]);

  const handleFirstPagination = useCallback(() => {
    setPage(1);
    let contentTemp = [];
    if (elementsPerPage - contentFiltered.length > 0) {
      for (let i = 0; i < contentFiltered.length; i++) {
        contentTemp.push(contentFiltered[i]);
      }
    } else {
      for (let i = 0; i < elementsPerPage; i++) {
        contentTemp.push(contentFiltered[i]);
      }
    }
    setPageContent(contentTemp);
  }, [elementsPerPage]);

  const handleCategoriesFilterChange = (event) => {
    setSortValue("none");
    let categoriesFilterTemp = {
      ...categoriesFilter,
      [event.target.name]: event.target.checked,
    };
    setCategoriesFilter(categoriesFilterTemp);
    let isFilteredTemp = false;
    for (let category of categories) {
      if (categoriesFilterTemp[category.value]) {
        isFilteredTemp = true;
        break;
      }
    }
    setIsFiltered(isFilteredTemp);
    contentFiltered = content.filter(
      (product) => categoriesFilterTemp[product.category]
    );
    setContentPageFiltered(contentFiltered);
    if (contentFiltered.length === 0) {
      setContentPageFiltered(content);
      contentFiltered = content;
    }
    handleFirstPagination();
  };

  const handleSortValueChange = (event) => {
    setChecked(() => false);
    let sorter = event.target.value;
    let sortedContent =
      sorter === "alphabetical"
        ? contentFiltered.sort((a, b) => (a.title > b.title ? 1 : -1))
        : sorter === "highestToLowest"
        ? contentFiltered.sort((a, b) => (b.price > a.price ? 1 : -1))
        : sorter === "lowestToHighest"
        ? contentFiltered.sort((a, b) => (a.price > b.price ? 1 : -1))
        : contentFiltered;
    contentFiltered = sortedContent;
    setContentPageFiltered(sortedContent);
    handleFirstPagination();
    setSortValue(event.target.value);
  };

  const handlePaginationChange = (event, value) => {
    setChecked(false);
    setPage(value);
    window[`scrollTo`]({ top: 0, behavior: "smooth" });
    let index = elementsPerPage * value;
    let contentTemp = [];
    if (index - contentFiltered.length > 0) {
      for (let i = index - elementsPerPage; i < contentFiltered.length; i++) {
        contentTemp.push(contentFiltered[i]);
      }
    } else {
      for (let i = index - elementsPerPage; i < index; i++) {
        contentTemp.push(contentFiltered[i]);
      }
    }
    setPageContent(contentTemp);
  };

  const handleGetProducts = useCallback(async () => {
    let response = await getCollection("products");
    if (response.status) {
      setContent(response.data);
      setContentPageFiltered(response.data);
      contentFiltered = response.data;
      handleFirstPagination();
      handleGetCategoriesFilter();
      handleGetCategories();
      setChecked(true);
    } else {
      Swal.fire({
        text: "Ha ocurrido un error en el servidor, por favor refresque la página",
        icon: "error",
      });
    }
  }, [handleFirstPagination, handleGetCategories, handleGetCategoriesFilter]);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const sortValues = handleGetSortValues();

  return categoriesFilter ? (
    <div className={classes.root}>
      <Typography component="span">{t("shopScreen.title")}</Typography>
      <div className={classes.gridContent}>
        <ShopFilter
          sortValues={sortValues}
          content={content}
          setContent={setContent}
          setPage={setPage}
          elementsPerPage={elementsPerPage}
          setPageContent={setPageContent}
          contentPageFiltered={contentPageFiltered}
          setContentPageFiltered={setContentPageFiltered}
          categories={categories}
          setCategories={setCategories}
          categoriesFilter={categoriesFilter}
          setCategoriesFilter={setCategoriesFilter}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
          setIsLoading={setIsLoading}
          sortValue={sortValue}
          setSortValue={setSortValue}
          word={word}
          setWord={setWord}
          filtered={filtered}
          setFiltered={setFiltered}
          setChecked={setChecked}
          handleFirstPagination={handleFirstPagination}
          handleCategoriesFilterChange={handleCategoriesFilterChange}
          handleSortValueChange={handleSortValueChange}
          contentFiltered={contentFiltered}
          handleContentFilteredChange={handleContentFilteredChange}
        />
        {content !== null && content.length > 0 ? (
          <div className={classes.gridProducts}>
            <ProductCard
              content={pageContent}
              checked={checked}
              setChecked={setChecked}
            />
            <Pagination
              count={
                !isFiltered
                  ? Math.ceil(contentPageFiltered.length / elementsPerPage)
                  : Math.ceil(contentFiltered.length / elementsPerPage)
              }
              page={page}
              size="small"
              onChange={handlePaginationChange}
            />
          </div>
        ) : (
          <div className={classes.gridNoProducts}>
            <Typography component="span">
              {t("shopScreen.noProducts")}
            </Typography>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={classes.emptyRoot}>
      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
}
