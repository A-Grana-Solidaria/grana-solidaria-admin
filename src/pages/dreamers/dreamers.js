import "./dreamers.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import Table from "../../components/table/table";
import API from "../../utils/fetch"

export default function Dreamers() {
  const [dreamers, setDreamers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [totalDreamers, setTotalDreamers] = React.useState();
  const headers = [
    "Nome",
    "Situação",
    "Score",
    "Risco",
    "Meta",
    "Progresso",
    "Dias",
    "Apoios",
  ];

  React.useEffect(() => {
    setOffset(currentPage * 13 - 13);

	const getDreamers = async () =>{
		const response = await API.dreamers((currentPage * 13 - 13))
		const data = response.data;
		setTotalPages(data.dados.totalDePaginas);
        setCurrentPage(data.dados.paginaAtual);
        setDreamers(data.dados.sonhadores);
        setTotalDreamers(data.dados.totalDeSonhadores);
	}
 getDreamers()
  }, [currentPage]);

  return dreamers ? (
    <div className="Dreamers">
      <Sidebar dreamers={true} supporters={false} interests={false} />
      <div className="dreamers-container">
        <Header total={totalDreamers} owner="empreendedores" single={false} />
        <div className="dreamers-content">
          <Table dreamers={dreamers} headers={headers} />
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
