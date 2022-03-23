import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";

import Product from "./Components/Product";
import ProductSpecs from "./Components/ProductSpecs";
import RelatedProducts from "./Components/RelatedProducts";

import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import NotFound from "../NotFound/NotFound";

import { getDocument, getDocumentsByQuery } from "../../handlers/handlers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    minHeight: "100vh",
    margin: "0px 12.5%",
    marginTop: "calc(116 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      marginTop: "calc(86 * (100vw / 370))",
      margin: "0px",
      width: "100%",
    },
  },
}));

export default function SingleProduct(props) {
  const classes = useStyles();

  const [product, setProduct] = useState(null);
  const [productExist, setProductExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const handleGetData = async (id) => {
    let response = await getDocument("products", id);
    if (response.status) {
      let responseRelated = await getDocumentsByQuery(
        "products",
        "category",
        response.data.category
      );
      if (responseRelated.status) {
        let relatedProducts = responseRelated.data.filter(
          (product) => product.id !== response.data.id
        );
        setProductExist(true);
        setProduct(response.data);
        setRelatedProducts(relatedProducts);
        setIsLoading(false);
      } else {
        Swal.fire({
          text: "Ha ocurrido un error en el servidor, por favor refresque la página",
          icon: "error",
        });
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className={classes.root}>
      {product === null && isLoading ? (
        <LoaderSpinner isLoading={isLoading} />
      ) : product !== null && relatedProducts && productExist ? (
        <React.Fragment>
          <Product product={product} />
          <ProductSpecs
            productSpecs={product.specs}
            dataSheet={product.dataSheet}
          />
          <RelatedProducts relatedProducts={relatedProducts} />
        </React.Fragment>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
