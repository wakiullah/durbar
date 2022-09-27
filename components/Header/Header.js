import classes from "./Header.module.css";
import Logo from "../../Img/logo.png";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PlusIcon = ({ className, color }) => (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    width="45.402px"
    className={className}
    height="45.402px"
    viewBox="0 0 45.402 45.402"
  >
    <g fill={color}>
      <path
        d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
      />
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);


function Header() {
  const [iconColor, setIconColor] = useState("#fff");
  const HoverHandler = () => {
    iconColor = "#0071BC";
  };
  return (
    <header className={classes.header}>
      
      <div class={classes.container}>
        <div className={classes.logoWrapper}>
          <Image width={500} height={50} className={classes.logo} src={Logo} alt="Durbar Logo" />
        </div>
     
      <div className={classes.buttonWrapper}>
        <Link href='/adduser'>
          <button className={classes.button}>
            <p>New User</p>
            <PlusIcon
              className={classes.icon}
              onHover={HoverHandler}
              color={iconColor}
            />
          </button>
        </Link>
      </div> </div>
    </header>
  );
}

export default Header;
