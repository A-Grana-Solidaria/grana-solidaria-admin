import "./associates.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import AssociateTable from "../../components/associate-table/associate-table";
import API from "../../utils/fetch"

function Associates(props) {
  const companyId = props.companyId;
  const [associates, setAssociates] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [totalAssociates, setTotalAssociates] = React.useState();
  const headers = [
    "Nome",
    "Cpf",
    "Sócio Administrador",
    "Assina pela empresa"
  ];

  React.useEffect(() => {
    setOffset(currentPage * 13 - 13);
	  const getAssociates = async () =>{
		const response = await API.associates((currentPage * 13 - 13), companyId)
		const data = response.data;
		setTotalPages(data.dados.totalDePaginas);
    setCurrentPage(data.dados.paginaAtual);
    setAssociates(data.dados.socios);
    setTotalAssociates(data.dados.totalDeSocios);
	}
 getAssociates()
}, [currentPage, setCurrentPage, companyId]);

  return associates ? (
    <div className="Dreamers">
      <div className="dreamers-container">
        <Header total={totalAssociates} owner="sócios" single={false} />
        <div className="dreamers-content">
          <AssociateTable associates={associates} headers={headers} />
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        </div>
      </div>
  ) : (
    <div></div>
  );
}

export default Associates;