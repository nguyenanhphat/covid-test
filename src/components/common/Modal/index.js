import React from "react";
import "./styles.css";

const ModalCustom = ({
  show,
  children,
  title,
  onClose,
  width = '50%'
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section style={{ width: width}} className="modal-main">
        <div className="header-modal">
          <span className="title">{title}</span>
          <span className="icon-close" onClick={onClose}>
            <img width="30" src='images/cancel.png' alt="icon-close" />
          </span>
        </div>
        <div className="content-modal">
          {children}
        </div>
      </section>

    </div>
  );
}

export default ModalCustom;
