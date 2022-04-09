import React, { useState } from "react";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [orderValue, setOrderValue] = useState(1);

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = orderValue;
    const AMT = +amount;
    if (AMT < 1) {
      return;
    }
    props.onAddToCart(AMT);
  };

  const inputChangeHandler = (e) => {
    setOrderValue(e.target.value);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          value: orderValue,
          onChange: inputChangeHandler,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
