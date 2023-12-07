import "./companies.css";
import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import CompanyTable from "../../components/company-table/company-table";
import API from "../../utils/fetch"

export default function Companies() {
  const [companies, setCompanies] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [totalCompanies, setTotalCompanies] = React.useState();
  const headers = [
    "Razão Social",
    "Nome Fantasia",
    "Cnpj",
  ];

  React.useEffect(() => {
    setOffset(currentPage * 13 - 13);

	const getCompanies = async () =>{
		const response = await API.companies((currentPage * 13 - 13))
		const data = response.data;
		setTotalPages(data.dados.totalDePaginas);
        setCurrentPage(data.dados.paginaAtual);
        setCompanies(data.dados.empresas);
        setTotalCompanies(data.dados.totalDeEmpresas);
	}
 getCompanies()
  }, [currentPage]);

  return companies ? (
    <div className="Companies">
      <Sidebar companies={true} />{/* Todo */}
      <div className="companies-container">
        <Header total={totalCompanies} owner="empresas" single={false} />
        <div className="companies-content">
          <CompanyTable companies={companies} headers={headers} />{/* Todo */}
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
