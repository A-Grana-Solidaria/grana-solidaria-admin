import "./supporters.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import TableSupporter from "../../components/table-supporter/table";
import API from "../../utils/fetch"

export default function Supporters() {
  const [supporters, setSupporters] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [totalSupporters, setTotalSupporters] = React.useState();
  const headers = ["Nome", "Apoio", "Investimento"];

  // integração de sonhadores que pode ser refatorada para ser usada aqui para apoiadores
    React.useEffect(() => {
      setOffset(currentPage * 13 - 13);
      console.log("offset é:", currentPage * 13 - 13);
	  const getSupporters = async () =>{
		  const response = await API.supporters((currentPage * 13 - 13))
		  const data = response.data
		  console.log(data);
          setTotalPages(data.dados.totalDePaginas);
          setCurrentPage(data.dados.paginaAtual);
          setSupporters(data.dados.apoiadores);
          console.log(totalPages, currentPage);
          setTotalSupporters(data.dados.totalDeApoiadores);
	  }
getSupporters();
    }, [currentPage]);

  return supporters ?  (<div className="Supporters">
      <Sidebar dreamers={false} supporters={true} interests={false} />
      <div className="supporters-container">
        {
          //mudar 110 aqui pelo total de financiadores
        }
        <Header total={totalSupporters} owner="financiadores" single={false} />
        <div className="supporters-content">
          <TableSupporter supporters={supporters} headers={headers} />
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  ) : (<div></div>)
}
