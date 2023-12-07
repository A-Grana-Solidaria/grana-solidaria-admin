import "./company-row.css";
import { useHistory } from "react-router-dom";

export default function Row(props) {
  const { company } = props;
  const history = useHistory();
  return (
    <tr
      class="tbody"
      onClick={() => {
        history.push(`${process.env.PUBLIC_URL}/empresa/${company.id}`);
      }}
    >
      <td>{company.razaoSocial}</td>
      <td>{company.nomeFantasia}</td>
      <td>{company.cnpj}</td>
    </tr>
  );
}
