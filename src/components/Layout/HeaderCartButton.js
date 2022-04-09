import React, { useContext, useEffect, useState } from "react";
import CartContex from "../../context/cart-context";
import ModalContext from "../../context/show-hide-cart";
import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";

export const HeaderCartButton = (props) => {
  const ctx = useContext(ModalContext);
  const cartCtx = useContext(CartContex);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [bump, setBump] = useState(false);

  const classes = `${style.button} ${bump ? style.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setBump(true);

    const Timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(Timer);
    };
  }, [cartCtx.items]);
  return (
    <button className={classes} onClick={ctx.showModel}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};
