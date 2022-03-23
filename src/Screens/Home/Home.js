import React, { useState, useEffect, useCallback } from "react";
import Carousel from "./Components/Carousel";
import Swal from "sweetalert2";

import SizeKitScreen from "./Components/SizeKit";
import OurImpact from "./Components/OurImpact";
import OurClients from "./Components/OurClients";
import OurPhilosophy from "./Components/OurPhilosophy";
import CustomerService from "./Components/CustomerService";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

import { getCollection, getDocumentsByQuery } from "../../handlers/handlers";

export default function Home() {
  const [carouselData, setCarouselData] = useState([]);
  const [kitsData, setKitsData] = useState([]);

  const getCarouselData = useCallback(() => {
    getCollection("carouselData").then((response) => {
      if (response.status) {
        setCarouselData(response.data);
      } else {
        Swal.fire({
          text: "Ha ocurrido un error en el servidor, por favor refresque la página",
          icon: "error",
        });
      }
    });
  }, []);

  const getKitsData = useCallback(async () => {
    let response = await getDocumentsByQuery("products", "type", "kit");
    if (response.status) {
      setKitsData(response.data);
    } else {
      Swal.fire({
        text: "Ha ocurrido un error en el servidor, por favor refresque la página",
        icon: "error",
      });
    }
  }, []);

  useEffect(() => {
    getCarouselData();
    getKitsData();
  }, [getCarouselData, getKitsData]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {carouselData.length > 0 && kitsData.length > 0 ? (
        <React.Fragment>
          <Carousel carouselData={carouselData} />
          <OurImpact />
          <OurPhilosophy />
          <CustomerService />
          <SizeKitScreen kitsData={kitsData} />
          <OurClients />
        </React.Fragment>
      ) : (
        <LoaderSpinner />
      )}
    </div>
  );
}
