import "./associate-row.css";
import { useHistory } from "react-router-dom";

export default function Row(props) {
  const { associate } = props;
  const history = useHistory();
  return (
    <tr
      class="tbody"
      onClick={() => {
        history.push(`${process.env.PUBLIC_URL}/socioempresa/${associate.id}`);
      }}
    >
      <td>{associate.name}</td>
      <td>{associate.cpf}</td>
      <td>{associate.companyAdm === '1' ? "Sim" : "Não"}</td>
      <td>{associate.signs === '1' ? "Sim" : "Não"}</td>
    </tr>
  );
}
