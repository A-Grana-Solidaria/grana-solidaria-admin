import "./quotas.css";
import React from "react";

export default function Quotas(props) {
  let { quotas, total = null } = props;
if(!total) total = 10

  const blocks = [];
  const buildBlocks = (total) => {
    for (let i = 1; i <= total; i++) {
      blocks.push(i);
    }
  };

  buildBlocks(total);
  // baseado no total criar as divs

  return (
    <div className="Quotas">
      {blocks.map((block) => {
        return <div className={block > Number(quotas) ? "quota" : "dark-blue quota"}></div>;
      })}
    </div>
  );
}
