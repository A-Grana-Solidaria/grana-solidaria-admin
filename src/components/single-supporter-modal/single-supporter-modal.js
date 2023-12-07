import React from "react";
import "./single-supporter-modal.css";
import Supporter from "../../assets/supporter.png";

export default function SingleSupporterModal(props) {
  const { supporter } = props;


  return (
    <div className="SingleSupporterModal">
      <img
        src={supporter.picture ? supporter.picture : Supporter}
        alt="foto do apoiador"
      />
      <div className="supporter-content">
        <h5>{supporter.name}</h5>
        <span>{supporter.quotas}</span>
      </div>
    </div>
  );
}
