import React from "react";
import "./modal-company.css";
import API from "../../utils/fetch";
import Close from "../../assets/close.png";
import { useHistory } from "react-router-dom";

export default function ModalCompany(props) {
  const { state, hideModal, id, type } = props;
  const history = useHistory();

  return (
    <div className="Modal">
      <div className="close">
        <button onClick={hideModal}>
          <img src={Close} />
        </button>
      </div>
      {state === "delete" ? (
        <div className="modal-container">
          <h2>Deletar empresa</h2>
          <p>Você tem certeza que quer deletar esta empresa?</p>
          <div className="buttons-modal">
            <button
              onClick={
                async () => {
				        const response = await API.deleteCompany(id)
				        if(response.status === 200 && type === 'company') history.push(`${process.env.PUBLIC_URL}/empresas`)
                }
              }
            >
              Deletar empresa
            </button>
            <button onClick={hideModal}>Cancelar</button>
          </div>
        </div>
      ) : state === "save" ? (
        <div className="modal-container">
          <h2>Empresa</h2>
          <p>As alterações foram salvas com sucesso.</p>
          <div className="single">
            <button onClick={hideModal}>Ok</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
