import React from "react";

import { Button, makeStyles, Typography } from "@material-ui/core";
import { colors } from "../../Utils/Colors";
import { Facebook, WhatsApp, YouTube } from "@material-ui/icons";

import { useTranslation } from "react-i18next";

import textcloudImage from "../../Assets/icons/textcloud.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "calc(444 * (100vw / 1456))",
    backgroundColor: "#272725",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-evenly ",
    alignItems: "center",
    width: "100%",
    height: "92.5%",
    margin: "0px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  rightsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "7.5%",
    "& .MuiTypography-root": {
      color: colors.grayLight,
      textAlign: "center",
      fontFamily: "'Petrona'",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "calc(12 * (100vw / 1456))",
      lineHeight: "calc(20 * (100vw / 1456))",
      [theme.breakpoints.down("xs")]: {
        fontSize: "calc(12 * (100vw / 370))",
        lineHeight: "calc(20 * (100vw / 370))",
        height: "auto",
      },
    },
  },
  title: {
    color: "#FFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(25 * (100vw / 1456))",
    lineHeight: "calc(20 * (100vw / 1456))",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(18 * (100vw / 370))",
      lineHeight: "calc(14 * (100vw / 370))",
      marginBottom: "calc(-15 * (100vw / 370))",
    },
  },
  section: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(17 * (100vw / 1456))",
    lineHeight: "calc(25 * (100vw / 1456))",
    marginTop: "calc(10 * (100vw / 1456))",
    color: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(14 * (100vw / 370))",
      lineHeight: "calc(17 * (100vw / 370))",
      marginTop: "calc(25 * (100vw / 370))",
      marginBottom: "calc(5 * (100vw / 370))",
    },
  },

  contactUs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "calc(5 * (100vw / 1456))",
    listStyle: "none",
    paddingLeft: "0px",
    color: "white",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "calc(13 * (100vw / 1456))",
    lineHeight: "calc(15 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(13 * (100vw / 370))",
      lineHeight: "calc(15 * (100vw / 370))",
      alignItems: "center",
      textAlign: "center",
    },
  },

  mediaLink: {
    marginRight: "calc(23* (100vw / 1456))",
    width: "calc(35* (100vw / 1456))",
    height: "calc(35 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(35 * (100vw / 370))",
      height: "calc(35 * (100vw / 370))",
      marginRight: "calc(11 * (100vw / 370))",
    },
  },
  mediaLinkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "calc(-2.5 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "calc(9 * (100vw / 370))",
    },
  },
  mediaIcon: {
    width: "100%",
    height: "100%",
    color: "white",
    "&:hover": {
      color: colors.grayLight,
      transition: "all 0.3s ease-out",
    },
    "&, &:after": {
      transition: "all 0.3s ease-out",
    },
  },
  logo: {
    fontFamily: "'RymanEco-Regular'",
    color: "white",
    fontSize: "calc(110 * (100vw / 1456))",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4))",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(70 * (100vw / 370))",
    },
  },
  contactUsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  chatUsContainer: {
    display: "flex",
    flexDirection: "column",
    //justifyContent: "space-evenly",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  message: {
    padding: "calc(5 * (100vw / 1456)) calc(10 * (100vw / 1456))",
    resize: "none",
    color: "#ADB492",
    fontSize: "calc(13 * (100vw / 1456))",
    fontFamily: "'Phetsarath-Regular', sans-serif",
    backgroundColor: "transparent",
    border: "2px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "calc(10 * (100vw / 1456))",
    width: "calc(383 * (100vw / 1456))",
    height: "calc(147 * (100vw / 1456))",
    marginTop: "calc(5 * (100vw / 1456))",
    marginLeft: "calc(5 * (100vw / 1456))",
    "&, &:focus": {
      color: "#ADB492",
      outline: "none",
      border: `calc(2 * (100vw / 1456)) solid ${colors.grayLight}`,
      transition: "all 0.3s ease-out",
      [theme.breakpoints.down("xs")]: {
        border: `calc(2.5 * (100vw / 370)) solid ${colors.grayLight}`,
      },
    },
    "&, &:after": {
      color: "white",
      outline: "none",
      border: "calc(2 * (100vw / 1456)) solid #FFFFFF",
      transition: "all 0.3s ease-out",
      [theme.breakpoints.down("xs")]: {
        border: "calc(2.5 * (100vw / 370)) solid #FFFFFF",
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: "calc(5 * (100vw / 370)) calc(10 * (100vw / 370))",
      fontSize: "calc(13 * (100vw / 370))",
      width: "calc(293 * (100vw / 370))",
      height: "calc(147 * (100vw / 370))",
      borderRadius: "calc(16 * (100vw / 370))",
      marginTop: "calc(10 * (100vw / 370))",
      marginLeft: "0px",
    },
  },
  email: {
    display: "flex",
    width: "calc(383 * (100vw / 1456))",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "calc(15 * (100vw / 1456))",
    marginLeft: "calc(5 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      width: "auto",
      marginTop: "calc(15 * (100vw / 370))",
      //marginLeft: "calc(5 * (100vw / 370))",
    },
  },
  emailLabel: {
    fontSize: "calc(13.5 * (100vw / 1456))",
    marginTop: 0,
    [theme.breakpoints.down("xs")]: { display: "none" },
  },
  emailInput: {
    padding: "0px calc(10 * (100vw / 1456))",
    color: "white",
    fontSize: "calc(13 * (100vw / 1456))",
    fontFamily: "'Phetsarath-Regular', sans-serif",
    backgroundColor: "transparent",
    border: "2px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "calc(15.5 * (100vw / 1456))",
    width: "calc(242 * (100vw / 1456))",
    height: "calc(30 * (100vw / 1456))",
    "&, &:focus": {
      color: "#ADB492",
      outline: "none",
      border: `calc(2 * (100vw / 1456)) solid ${colors.grayLight}`,
      transition: "all 0.3s ease-out",
      [theme.breakpoints.down("xs")]: {
        border: `calc(2.5 * (100vw / 370)) solid ${colors.grayLight}`,
      },
    },
    "&, &:after": {
      color: "white",
      outline: "none",
      border: "calc(2 * (100vw / 1456)) solid #FFFFFF",
      transition: "all 0.3s ease-out",
      [theme.breakpoints.down("xs")]: {
        border: "calc(2.5 * (100vw / 370)) solid #FFFFFF",
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px calc(10 * (100vw / 370))",
      fontSize: "calc(13 * (100vw / 370))",
      width: "calc(290 * (100vw / 370))",
      height: "calc(30 * (100vw / 370))",
      borderRadius: "calc(15.5 * (100vw / 370))",
    },
  },
  buttonStyle: {
    width: "calc(81 * (100vw / 1456))",
    height: "calc(33 * (100vw / 1456))",
    //background: "#555E30",
    color: "#FFF",
    border: "calc(2 * (100vw / 1456)) solid #FFF",
    boxSizing: "border-box",
    borderRadius: "calc(22 * (100vw / 1456))",
    "&:hover": {
      background: "#FFF",
      color: "#272725",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(81 * (100vw / 370))",
      height: "calc(33 * (100vw / 370))",
      border: "calc(2.5 * (100vw / 370)) solid #FFF",
      borderRadius: "calc(370 * (100vw / 1456))",
    },
  },
  buttonText: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "calc(14 * (100vw / 1456))",
    lineHeight: "calc(120 * (100vw / 1456))",
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(14 * (100vw / 370))",
      lineHeight: "calc(120 * (100vw / 370))",
    },
  },
  icon: {
    width: "calc(48 * (100vw / 1456))",
    height: "calc(44 * (100vw / 1456))",
    marginLeft: "calc(11.5 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      width: "calc(29.75 * (100vw / 370))",
      height: "calc(26.92 * (100vw / 370))",
      marginLeft: "calc(5 * (100vw / 370))",
    },
  },
  sendButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "calc(15 * (100vw / 1456))",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      marginTop: "calc(30 * (100vw / 370))",
      marginBottom: "calc(50 * (100vw / 370))",
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  const [t] = useTranslation("common");

  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography component="h2" className={classes.logo}>
          {t("navBar.title")}
        </Typography>
        <div className={classes.contactUsContainer}>
          <Typography component="h1" className={classes.title}>
            {t("footer.contact")}
          </Typography>
          <ul className={classes.contactUs}>
            <Typography component="h2" className={classes.section}>
              Dirección principal
            </Typography>
            <li>
              Carrera 67 #68-2
              <br />
              Barranquilla, Colombia
            </li>
            <Typography component="h2" className={classes.section}>
              Tel
            </Typography>
            <li>+57 350 261 3883</li>
            <Typography component="h2" className={classes.section}>
              Email
            </Typography>
            <li>deekco19@gmail.com</li>
            <Typography component="h2" className={classes.section}>
              {t("footer.followUs")}
            </Typography>
            <li className={classes.mediaLinkContainer}>
              <a
                className={classes.mediaLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/deekco.tocosas"
              >
                <Facebook className={classes.mediaIcon} />
              </a>
              <a
                className={classes.mediaLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtube.com/channel/UClmH0xsdCUAZ4kF8R9g6xFA"
              >
                <YouTube className={classes.mediaIcon} />
              </a>
              <a
                className={classes.mediaLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/message/E3U6IKGY5G6IA1 "
              >
                <WhatsApp className={classes.mediaIcon} />
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.chatUsContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography component="h1" className={classes.title}>
              Chatea con Nosotros
            </Typography>
            <img
              alt="textcloud"
              src={textcloudImage}
              className={classes.icon}
            />
          </div>

          <div className={classes.email}>
            <Typography
              component="h2"
              className={`${classes.section} ${classes.emailLabel}`}
            >
              Correo electrónico
            </Typography>
            <input
              type="text"
              className={classes.emailInput}
              placeholder="Correo electrónico"
            />
          </div>
          <textarea
            maxLength="5000"
            className={classes.message}
            placeholder="¡Hola!, quisiera hacer una cotización..."
          />
          <div className={classes.sendButtonContainer}>
            <Button className={classes.buttonStyle}>
              <span component="span" className={classes.buttonText}>
                {t("buttons.send")}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.rightsContainer}>
        <Typography>
          Copyright © 2021 Deek S.A.S. Todos los derechos reservados
        </Typography>
      </div>
    </div>
  );
}
