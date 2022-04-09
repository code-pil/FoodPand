import React, { useReducer } from "react";

const CartContex = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearAll: () => {},
});

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];
    let newItems;
    if (existingItem) {
      const newItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      newItems = [...state.items];
      newItems[existingItemIndex] = newItem;
    } else {
      newItems = state.items.concat(action.item);
    }

    return {
      items: newItems,
      totalAmount: newAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const removeItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    let removeItem = state.items[removeItemIndex];

    removeItem = {
      ...removeItem,
      amount: removeItem.amount - 1,
    };
    let newItems = [...state.items];

    newItems[removeItemIndex] = removeItem;

    newItems = newItems.filter((item) => item.amount > 0);
    const newAmount = state.totalAmount - removeItem.price;
    return {
      items: newItems,
      totalAmount: newAmount,
    };
  }

  if (action.type === "CLEAR_ALL") {
    return initialState;
  }
  return initialState;
};

export const CartProvider = (props) => {
  const clearAll = () => {
    dispatchAction({ type: "CLEAR_ALL" });
  };
  const [cartState, dispatchAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearAll: clearAll,
  };

  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
};

export default CartContex;
