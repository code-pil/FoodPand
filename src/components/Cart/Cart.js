import React, { useContext, useState } from "react";
import CartContex from "../../context/cart-context";
import ModalContext from "../../context/show-hide-cart";
import Model from "../UI/Model";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import panda from "../../assets/deliver.png";

const Cart = (props) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const cartCtx = useContext(CartContex);
  const ctx = useContext(ModalContext);
  const hasItem = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [showForm, setShowForm] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const CartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          name={item.name}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const onClickHandler = () => {
    setShowForm(true);
  };

  const onSubmitHandler = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      fetch("https://fir-7bc54-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userDetails: data,
          orderedItems: cartCtx.items,
          totalAmount: cartCtx.totalAmount,
        }),
      });
      cartCtx.clearAll();
      setIsSubmited(true);
    }, 1000);
  };

  const orderPrepared = (
    <div className={style.actions}>
      <p>Preparing your order!</p>
      <p>Please Wait...</p>
    </div>
  );

  const finalSubmited = (
    <div className={style.actions}>
      <p>Your order is submited successfully.</p>
      <p>Our Panda will deliver your items Soon...</p>
      <div className={style.bike}>
        <img src={panda} alt="panda..." className={style.panda} />
      </div>
      <button className={style.button} onClick={ctx.closeModel}>
        Close
      </button>
    </div>
  );

  return (
    <Model>
      {!showForm && !isSubmiting && !isSubmited && CartItems}
      {!showForm && !isSubmiting && !isSubmited && (
        <div className={style.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {showForm && !isSubmiting && !isSubmited && (
        <Checkout onCancel={ctx.closeModel} onSubmit={onSubmitHandler} />
      )}
      {!showForm && !isSubmiting && !isSubmited && (
        <div className={style.actions}>
          <button className={style["button--alt"]} onClick={ctx.closeModel}>
            Close
          </button>
          {hasItem && (
            <button className={style.button} onClick={onClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
      {isSubmiting && orderPrepared}
      {isSubmited && finalSubmited}
    </Model>
  );
};

export default Cart;
