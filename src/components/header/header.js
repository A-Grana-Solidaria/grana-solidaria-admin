import "./header.css";
import React from "react";

export default function Header(props) {
  const { total, owner, single } = props;
  return (
    <div className="Header">
      <div className="header-left">
        <span>{owner === "sócios" ? "" : "Dashboard administrativo"}</span>
        <span>
          {owner === "sócios" ? "Lista de sócios" : owner === "empresas" ? "Lista das empresas" : owner === "sócio" ? "Página do sócio" : owner === "empresa" ? "Página da empresa" : ""}
        </span>
      </div>

      {!single ? (
        <div className="header-right">
          <span>{total}</span>
          {owner === "sócios" ? '' : "Empresas Registradas"}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
