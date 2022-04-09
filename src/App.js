import Cart from "./components/Cart/Cart";
import { Header } from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React, { useContext } from "react";
import CartContext from "./context/show-hide-cart";
import { CartProvider } from "./context/cart-context";

function App() {
  const ctx = useContext(CartContext);
  return (
    <CartProvider>
      {ctx.cart && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
