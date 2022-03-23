import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import cart from "../../Assets/icons/cart.png";

import { NavLink } from "react-router-dom";
import { IconButton, Badge, makeStyles } from "@material-ui/core";
import { CloseRounded, MenuRounded } from "@material-ui/icons";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    position: "fixed" /* Set the navbar to fixed position */,
    top: 0,
    zIndex: 2000,
    width: "100%",
    height: "calc(116 * (100vw / 1456))",
    background: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(7px)",
    transition: "all 0.3s ease-out",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      height: "calc(86 * (100vw / 370))",
    },
  },
  navbarActive: {
    [theme.breakpoints.down("xs")]: {
      //transition: "all 0.3s ease",
      height: "calc(336 * (100vw / 370))",
    },
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "calc(85% - (60 * (40vw / 370)))",
      height: "calc(86 * (100vw / 370))",
    },
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    width: "45%",
    height: "100%",
    paddingLeft: "calc(100 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "calc(60 * (40vw / 370))",
      width: "100%",
    },
  },

  navContainer: {
    width: "55%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
    },
  },

  navTitle: {
    fontFamily: "RymanEco-Regular",
    textDecoration: "none",
    fontSize: "calc(65 * (100vw / 1456))",
    color: "white",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4))",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(50 * (100vw / 370))",
    },
  },

  navMenu: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    listStyle: "none",
  },

  navItem: {
    color: "white",
    fontWeight: "normal",
    fontSize: "calc(18 * (100vw / 1456))",
    textDecoration: "none",
    "&.active": {
      borderRadius: "calc(50 * (100vw / 1456))",
      background: "rgba(0, 0, 0, 0.3)",
      padding: "0px calc(19 * (100vw / 1456))",
      lineHeight: "calc(35 * (100vw / 1456))",
    },
    "&:hover": {
      borderRadius: "calc(50 * (100vw / 1456))",
      background: "rgba(0, 0, 0, 0.3)",
      padding: "0px calc(19 * (100vw / 1456))",
      lineHeight: "calc(35 * (100vw / 1456))",
      transition: "all 0.3s ease",
    },
    "& .MuiBadge-badge": {
      backgroundColor: "red",
      borderRadius: "calc(50 * (100vw / 1456))",
    },
    "&, &:after": {
      transition: "all 0.3s ease-out",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(15 * (100vw / 370))",
      height: "calc(50 * (100vw / 370))",
      fontWeight: "bold",
      lineHeight: "calc(50 * (100vw / 370))",
      paddingLeft: "calc(60 * (100vw / 370))",
      width: "100%",
      "&:hover": {
        paddingLeft: "calc(60 * (100vw / 370))",
        borderRadius: "0px",
        background: "rgba(0, 0, 0, 0)",
        lineHeight: "calc(50 * (100vw / 370))",
        transition: "all 0.3s ease",
      },
      "&.active": {
        paddingLeft: "calc(60 * (100vw / 370))",
        borderRadius: "0px",
        background: "rgba(0, 0, 0, 0.3)",
        lineHeight: "calc(50 * (100vw / 370))",
      },
    },
  },

  navItemActive: {
    borderRadius: "calc(50 * (100vw / 1456))",
    background: "rgba(0, 0, 0, 0.3)",
    padding: "0px calc(19 * (100vw / 1456))",
    lineHeight: "calc(35 * (100vw / 1456))",
  },
  navIcon: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "15%",
      "& svg": {
        color: "white",
        width: "calc(35 * (100vw / 370))",
        height: "calc(35 * (100vw / 370))",
      },
    },
  },
  navCart: {
    height: "calc(30.72 * (100vw / 1456))",
    width: "calc(38.4 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      height: "calc(30.72 * (100vw / 370))",
      width: "calc(38.4 * (100vw / 370))",
    },
  },
  menuContainer: {
    display: "none",
  },
  navContainerActive: {
    [theme.breakpoints.down("xs")]: {
      display: ({ display }) => !display && "none",
      transition: "all 0.2s ease-out",
    },
  },
}));

function NavBar(props) {
  const [display, setDisplay] = useState(
    window.innerWidth < 600 ? false : true
  );
  const classes = useStyles({ display });
  const [t] = useTranslation("common");

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    props.cart.forEach((item) => {
      count += Number(item.qty);
    });
    setCartCount(count);
  }, [props.cart, cartCount]);

  const handleNavClick = () => {
    window.innerWidth < 600 && setDisplay((prevState) => !prevState);
    window[`scrollTo`]({ top: 0 });
  };

  const handleLogoClick = () => {
    window[`scrollTo`]({ top: 0 });
    setDisplay(false);
  };

  return (
    <nav
      className={`${classes.navbar} ${!display ? "" : classes.navbarActive}`}
    >
      <div className={classes.logoContainer}>
        <div className={classes.navLogo}>
          <NavLink
            exact
            to="/home"
            activeClassName="active"
            className={classes.navTitle}
            onClick={handleLogoClick}
          >
            {t("navBar.title")}
          </NavLink>
        </div>
        <div className={classes.navIcon}>
          <IconButton onClick={() => setDisplay((prevState) => !prevState)}>
            {display ? <CloseRounded /> : <MenuRounded />}
          </IconButton>
        </div>
      </div>
      <div className={classes.navContainer + " " + classes.navContainerActive}>
        <NavLink
          exact
          to="/home"
          activeClassName="active"
          className={classes.navItem}
          onClick={handleNavClick}
        >
          {t("navBar.start")}
        </NavLink>

        <NavLink
          exact
          to="/aboutUs"
          activeClassName="active"
          className={classes.navItem}
          onClick={handleNavClick}
        >
          {t("navBar.aboutUs")}
        </NavLink>

        <NavLink
          exact
          to="/simulator"
          activeClassName="active"
          className={classes.navItem}
          onClick={handleNavClick}
        >
          {t("navBar.simulator")}
        </NavLink>

        <NavLink
          exact
          to="/shop"
          activeClassName="active"
          className={classes.navItem}
          onClick={handleNavClick}
        >
          {t("navBar.shop")}
        </NavLink>

        <NavLink
          exact
          to="/cart"
          activeClassName="active"
          className={classes.navItem}
          onClick={handleNavClick}
        >
          <Badge badgeContent={Number(cartCount)} color="secondary">
            <img alt="cart" src={cart} className={classes.navCart} />
          </Badge>
        </NavLink>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(NavBar);
