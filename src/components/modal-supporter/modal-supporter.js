import React from "react";
import "./modal-supporter.css";
import Supporter from "../../assets/supporter.png";
import Close from "../../assets/close.png";
import SingleSupporterModal from "../single-supporter-modal/single-supporter-modal";

export default function ModalSupporter(props) {
  const { supporters, hideModal } = props;

  return (
    <div className="ModalSupporter">
      <div className="modal-container">
        <div className="close">
          <button onClick={hideModal}>
            <img src={Close} />
          </button>
        </div>
        <div>
          <h2>Financiadores deste projeto</h2>
          <div className="supporter-container">
            {supporters.map((supporter) => {
              return <SingleSupporterModal supporter={supporter} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
