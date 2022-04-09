import React from "react";
import useInput from "../../hooks/use-input";
import style from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const picodeIsValid = (code) => code.trim().length === 6;

const Checkout = (props) => {
  let formIsValid = false;
  const {
    setValue: setName,
    value: name,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput(isEmpty);

  const {
    setValue: setStreet,
    value: street,
    valueIsValid: streetIsValid,
    valueIsInvalid: streetIsInvalid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput(isEmpty);

  const {
    setValue: setPostalCode,
    value: postalCode,
    valueIsValid: postalCodeIsValid,
    valueIsInvalid: postalCodeIsInvalid,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
  } = useInput(picodeIsValid);

  const {
    setValue: setCity,
    value: city,
    valueIsValid: cityIsValid,
    valueIsInvalid: cityIsInvalid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput(isEmpty);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      street,
      postalCode,
      city,
    };
    props.onSubmit(data);
    setName("");
    setCity("");
    setPostalCode("");
    setStreet("");
    // ctx.closeModel();
  };

  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const nameClasses = !nameIsInvalid
    ? style.control
    : `${style.control} ${style.invalid}`;

  const streetClasses = !streetIsInvalid
    ? style.control
    : `${style.control} ${style.invalid}`;

  const postalCodeClasses = !postalCodeIsInvalid
    ? style.control
    : `${style.control} ${style.invalid}`;

  const cityClasses = !cityIsInvalid
    ? style.control
    : `${style.control} ${style.invalid}`;

  return (
    <form className={style.form} onSubmit={onSubmitHandler} autoComplete="off">
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          placeholder="John Doe"
        />
      </div>
      <div className={streetClasses}>
        <label htmlFor="name">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
          placeholder="7 Bala street"
        />
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="name">Postal Code</label>
        <input
          type="text"
          id="pincode"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          placeholder="ACX586"
        />
      </div>
      <div className={cityClasses}>
        <label htmlFor="name">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          placeholder="Los Angeles"
        />
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={style.submit} disabled={!formIsValid}>
          Confirm Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
