import React, { useState } from "react";

const ModalContext = React.createContext({
  closeModel: () => {},
  showModel: () => {},
  cart: false,
});

export const ModalContextProvider = (props) => {
  const [cart, setCart] = useState(false);
  const closeModel = () => {
    setCart(false);
  };
  const showModel = () => {
    setCart(true);
  };
  
  return (
    <ModalContext.Provider
      value={{
        closeModel: closeModel,
        showModel: showModel,
        cart: cart,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
