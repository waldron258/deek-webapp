import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { sideBarData } from "./SidebarData";
import { Auth } from "../../../../firebase";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Utils/Colors";
import { useWindowSize } from "../../../../Utils/Commons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    display: "flex",
    justifyContent: "center",
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    backgroundColor: colors.greenDark,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(70px *(${size.width}/320))`,
    },
  },
  appBarShift: {
    width: ({ size }) => `calc(100% - (400px *(${size.width}/1921)))`,
    marginLeft: ({ size }) => `calc(400px *(${size.width}/1921))`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: () => "100%",
      marginLeft: () => 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: ({ size }) => `calc(400px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      width: () => "100%",
    },
  },
  drawerPaper: {
    width: ({ size }) => `calc(400px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      width: () => "100%",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(70px *(${size.width}/320))`,
    },
  },
  content: {
    //flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: ({ size }) => `calc(100px * (${size.width}/1921)) * -1`,
    [theme.breakpoints.down("xs")]: {
      marginLeft: () => 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    height: ({ size }) => `calc(80px * (${size.width}/1921))`,
    "&:hover": {
      cursor: "pointer",
      transition: "all 0.4s ease-out",
      backgroundColor: colors.grayLight,
    },
    "& svg": {
      width: ({ size }) => `calc(30px *(${size.width}/1921))`,
      height: ({ size }) => `calc(30px *(${size.width}/1921))`,
      color: colors.greenDark,
      [theme.breakpoints.down("xs")]: {
        width: ({ size }) => `calc(20px *(${size.width}/320))`,
        height: ({ size }) => `calc(20px *(${size.width}/320))`,
      },
    },
    "& .MuiTypography-root": {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      marginLeft: ({ size }) => `calc(20px * (${size.width}/1921))`,
      color: colors.greenDark,
      fontSize: "1.2vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "5.2vw",
        marginLeft: ({ size }) => `calc(20px * (${size.width}/320))`,
      },
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(50px * (${size.width}/320))`,
    },
  },
  logo: {
    fontFamily: "'RymanEco-Regular'",
    color: colors.greenDark,
    fontSize: "4vw",
    marginLeft: ({ size }) => `calc(40px * (${size.width}/1921))`,
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16vw",
      marginLeft: ({ size }) => `calc(40px * (${size.width}/320))`,
    },
  },
  menuIcon: {
    width: ({ size }) => `calc(45px *(${size.width}/1921))`,
    height: ({ size }) => `calc(45px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(25px *(${size.width}/320))`,
      height: ({ size }) => `calc(25px *(${size.width}/320))`,
    },
  },
  navTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "bold",
    color: "white",
    fontSize: "1.6vw",
    marginLeft: ({ size }) => `calc(40px * (${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: { fontSize: "6vw" },
  },
}));

export default function SideBar(props) {
  const size = useWindowSize();
  const classes = useStyles({ size });
  const theme = useTheme();
  const [t] = useTranslation("common");
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (link) => {
    if (link === "/admin") {
      handleLogOut();
    } else {
      window.location.pathname = link;
    }
  };
  const handleLogOut = () => {
    signOut(Auth)
      .then(() => {
        // Sign-out successful.
        sessionStorage.clear();
        window.location.replace("/admin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography noWrap className={classes.navTitle}>
            {t(props.title)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        onClose={handleDrawerClose}
        //variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography className={classes.logo}>{t("navBar.title")}</Typography>
          <IconButton style={{ width: "20%" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sideBarData.map((value, key) => (
            <ListItem
              button
              className={classes.listItem}
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              component={NavLink}
              exact
              to={value.link}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                {value.icon} <Typography>{t(value.title)}</Typography>
              </ListItemIcon>
            </ListItem>
          ))}
          <ListItem
            button
            className={classes.listItem}
            id={window.location.pathname === "/admin" ? "active" : ""}
            onClick={() => {
              handleClick("/admin");
            }}
          >
            <ListItemIcon>
              <ExitToApp />
              <Typography>{t("adminPanel.logOut")}</Typography>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
