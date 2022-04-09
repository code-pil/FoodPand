import React, { useContext } from "react";
import style from "./Model.module.css";
import ReactDOM from "react-dom";
import ModalContext from "../../context/show-hide-cart";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onClick} />;
};

const ModelOverlay = (props) => {
  return <div className={style.modal}>{props.children}</div>;
};

const Model = (props) => {
  const ctx = useContext(ModalContext);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={ctx.closeModel} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};
export default Model;
