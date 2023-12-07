import CompanyRow from "../company-row/company-row";
import "./company-table.css";

function CompanyTable(props) {
  const { headers, companies } = props;

  return (
    <table class="table">
      <thead>
        <tr>
          {headers.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => {
          return <CompanyRow company={company} />;
        })}
      </tbody>
    </table>
  );
}

export default CompanyTable;
