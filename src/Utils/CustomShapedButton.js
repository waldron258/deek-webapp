import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function CustomShapedButton(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontWeight: props.fontWeight,
      "&:hover": {
        cursor: "pointer",
        "& path": {
          transition: "all 0.4s ease-out",
          fill: props.hoverColor,
        },
      },
    },
  }));
  const classes = useStyles();

  const shapePath = `M ${props.width * 0.25} 0
    L 0 ${props.height * 0.4}
    L 0 ${props.height}
    L ${props.width * 0.75} ${props.height}
    L ${props.width} ${props.height * 0.6}
    L ${props.width} 0
    Z`;

  return (
    <svg
      width={props.width}
      height={props.height}
      style={{ marginLeft: props.separation }}
    >
      <a
        className={classes.root}
        href="javascript:void(0);"
        onClick={() => console.log("Esto hace algo")}
      >
        <path
          d={shapePath}
          fill={props.backgroundColor}
          stroke={props.strokeColor}
          strokeWidth={props.strokeWidth}
        />
        <text
          x={props.width / 2}
          y={props.height / 2}
          fill={props.color}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={props.fontSize}
        >
          {props.text}
        </text>
      </a>
    </svg>
  );
}
