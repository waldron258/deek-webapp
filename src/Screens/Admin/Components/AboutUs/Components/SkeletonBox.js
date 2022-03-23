import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, CardContent, CardMedia, Card } from "@material-ui/core";
import { useWindowSize } from "../../../../../Utils/Commons";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
    paddingLeft: 0,
    height: ({ size }) => `calc(40px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(40px *(${size.width}/320))`,
    },
  },
  cardContainer: {
    width: ({ size }) => `calc(450px *(${size.width}/1921))`,
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: {
      width: ({ size }) => `calc(280px *(${size.width}/320))`,
    },
  },
  cardContent: {
    width: "100%",
    paddingRight: 0,
    paddingLeft: 0,
    height: ({ size }) => `calc(100px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(100px *(${size.width}/320))`,
    },
  },
  cardMedia: {
    height: ({ size }) => `calc(300px *(${size.width}/1921))`,
    [theme.breakpoints.down("xs")]: {
      height: ({ size }) => `calc(320px *(${size.width}/320))`,
    },
  },
  title: {
    height: "40%",
  },
  info: {
    height: "70%",
  },
}));

export default function CarouselCard() {
  const size = useWindowSize();
  const classes = useStyles({ size });

  return (
    <div>
      <Card className={classes.cardContainer} square={true}>
        <CardMedia className={classes.cardMedia}>
          <Skeleton style={{ height: "100%", width: "100%", padding: 0 }} />
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Skeleton className={classes.title} />
          <Skeleton className={classes.info} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Skeleton
            style={{
              height: "100%",
              width: "30%",
            }}
          />
        </CardActions>
      </Card>
    </div>
  );
}
