import "./sidebar.css";
import React from "react";
import Dreamers from "../../assets/sonhadores.png";
import Companies from "../../assets/apoiadores.png";
import Export from "../../assets/exportar.png";
import Modal from "react-modal";
import ModalGeneral from "../modal-general/modal";

export default function Sidebar(props) {
  const { dreamers, supporters, companies, interests, socinal } = props;
  const [activeDreamers, setActiveDreamers] = React.useState();
  const [activeCompanies, setActiveCompanies] = React.useState();
  const [activeSupporters, setActiveSupporters] = React.useState();
  const [activeInterests, setActiveInterests] = React.useState();
  const [exportModalIsOpen, setExportModalIsOpen] = React.useState(false);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = React.useState(false);

  const showExportModal = () => {
    setExportModalIsOpen(true);
  };

  const hideExportModal = () => {
    setExportModalIsOpen(false);
  };

  const showLogoutModal = () => {
    setLogoutModalIsOpen(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalIsOpen(false);
  };

  return (
    <div className="Sidebar">
      <div className="sidebar-top">
        {/* <a
          className={dreamers ? "active" : activeDreamers ? "active" : ""}
          href={`${process.env.PUBLIC_URL}/sonhadores`}
          onClick={() => {
            setActiveDreamers("active");
            setActiveSupporters("");
            setActiveInterests("");
          }}
        >
          <img src={Dreamers} alt="Empreendedores" />
        </a> */}
        {/* <a
          className={supporters ? "active" : activeSupporters ? "active" : ""}
          href={`${process.env.PUBLIC_URL}/apoiadores`}
          onClick={() => {
            setActiveDreamers("");
            setActiveSupporters("active");
            setActiveInterests("");
          }}
        >
          <img src={Supporters} alt="Apoiadores" />
        </a> */}
        <a
          className={companies ? "active" : activeCompanies ? "active" : ""}
          href={`${process.env.PUBLIC_URL}/empresas`}
          onClick={() => {
            setActiveCompanies("");
          }}
        >
          <img src={Companies} alt="Empresas" />
        </a> 
        {/* <img
          src={Export}
          alt="exportar"
          onClick={showExportModal}
          className="export"
        /> */}
      </div>

      <div className="sidebar-bottom">
        <span onClick={showLogoutModal}>Sair</span>
      </div>
      {/* <Modal
        isOpen={exportModalIsOpen}
        className="Modal"
        overlayClassName="Overlay"
      >
        <ModalGeneral state="export" hideModal={hideExportModal} />
      </Modal> */}

      <Modal
        isOpen={logoutModalIsOpen}
        className="Modal"
        overlayClassName="Overlay"
      >
        <ModalGeneral state="logout" hideModal={hideLogoutModal} />
      </Modal>
    </div>
  );
}
