import React from "react";
import mealImage from "../../assets/meals.jpg";
import style from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = (props) => {
  return (
    <>
      <header className={style.header}>
        <h2>Food Panda</h2>
        <HeaderCartButton showModel={props.showModel} />
      </header>
      <div className={style["main-image"]}>
        <img src={mealImage} alt="Loading..." />
      </div>
    </>
  );
};
