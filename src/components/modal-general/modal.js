import React from "react";
import "./modal.css";
import API from "../../utils/fetch";
import Close from "../../assets/close.png";
import { useHistory } from "react-router-dom";

export default function ModalGeneral(props) {
  const { state, hideModal } = props;
  const [isSheetsReady, setSheetsReady] = React.useState(false)
  const [sheetLinks, setSheetLinks] = React.useState([])
  const history = useHistory();

  return (
    <div className="Modal">
      <div className="close">
        <button onClick={hideModal}>
          <img src={Close} />
        </button>
      </div>
      {state === "export" ? (
        <div className="modal-container">
          <h2>Exportar</h2>
          <p>Deseja exportar todos os dados do Dashboard?</p>
          <div className="buttons-modal">
            <button
              onClick={async () => {
                try {
                  const res = await API.export();                  

                  const sheetLinks = await res.data.dados.sheetsUrl;

                  setSheetsReady(true)
                  setSheetLinks(sheetLinks)
                  
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Exportar
            </button>
            <button onClick={hideModal}>Cancelar</button>
          </div>
          {
            isSheetsReady && 
            <div className="download-sheets-button-area">
              <button 
                onClick={ () => {
                  window.open(sheetLinks[0])
                  }
                }
              > Baixar relação de Empreendedores</button>
              <button 
                onClick={ () => {
                  window.open(sheetLinks[1])
                  }
                }
              > Baixar relação de Financiadores</button>
              <button 
                onClick={ () => {
                  window.open(sheetLinks[2])
                  }
                }
              > Baixar relação de Match</button>
            </div>
          }
          
        </div>
      ) : state === "logout" ? (
        <div className="modal-container">
          <h2>Sair</h2>
          <p>Deseja sair do dashboard?</p>
          <div className="buttons-modal">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                history.push(`${process.env.PUBLIC_URL}/`);
              }}
            >
              Sair
            </button>
            <button onClick={hideModal}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
