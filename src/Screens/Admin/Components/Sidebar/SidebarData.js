import React from "react";
import {
  Category,
  Contacts,
  Dashboard,
  Info,
  Store,
  ViewCarouselOutlined,
} from "@material-ui/icons";

export const sideBarData = [
  // {
  //   title: "adminPanel.dashboard",
  //   icon: <Dashboard />,
  //   link: "/admin/dashboard",
  // },
  {
    title: "adminPanel.carousel",
    icon: <ViewCarouselOutlined />,
    link: "/admin/carouselSettings",
  },
  {
    title: "adminPanel.clients",
    icon: <Contacts />,
    link: "/admin/clientsSettings",
  },
  {
    title: "adminPanel.products",
    icon: <Store />,
    link: "/admin/productsSettings",
  },
  {
    title: "adminPanel.categories",
    icon: <Category />,
    link: "/admin/categoriesSettings",
  },
  {
    title: "adminPanel.aboutUs",
    icon: <Info />,
    link: "/admin/aboutUsSettings",
  },
];
