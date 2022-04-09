import { useState } from "react";

const useInput = (validationFunc) => {
  const [value, setValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = validationFunc(value);
  const valueIsInvalid = !valueIsValid && valueIsTouched;

  const valueChangeHandler = (e) => {
    setValueIsTouched(true);
    setValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setValueIsTouched(true);
  };

  return {
    setValue,
    value,
    valueIsValid,
    valueIsInvalid,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
