import React from "react";
import "./modal.css";
import API from "../../utils/fetch";
import Close from "../../assets/close.png";
import { useHistory } from "react-router-dom";

export default function ModalDreamer(props) {
  const { state, hideModal, id, type } = props;
  const newToken = localStorage.getItem("token");
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
          <h2>Deletar perfil</h2>
          <p>Você tem certeza que quer deletar este perfil?</p>
          <div className="buttons-modal">
            <button
              onClick={async () => {
				  const response = await API.deleteUser(id)
				  const data = response.data;
				  console.log(data)
				  if(response.status === 200 && type === 'dreamer'){
					history.push(`${process.env.PUBLIC_URL}/sonhadores`)
				}else if (response.status === 200 && type === 'supporter'){
					history.push(`${process.env.PUBLIC_URL}/apoiadores`)
				}
              }}
            >
              Deletar perfil
            </button>
            <button onClick={hideModal}>Cancelar</button>
          </div>
        </div>
      ) : state === "save" ? (
        <div className="modal-container">
          <h2>Perfil</h2>
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
