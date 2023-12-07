import "./row.css";
import { useHistory } from "react-router-dom";

export default function Row(props) {
  const { dreamer } = props;
  const history = useHistory();
  return (
    <tr
      class="tbody"
      onClick={() => {
        history.push(`${process.env.PUBLIC_URL}/sonhador/${dreamer.dream_id}`);
      }}
    >
      <td>{dreamer.name}</td>
	  {console.log(dreamer)}
      <td>{dreamer.status === 0 ? "Pendente" : "Aprovado"}</td>
      <td>{dreamer.total_score}</td>
      <td>
        {dreamer.risk === null
          ? "-"
          : dreamer.risk === 0
          ? "Alto"
          : dreamer.risk === 1
          ? "Médio"
          : "Baixo"}
      </td>
      <td>{!dreamer.cashgoal ? "-" : dreamer.cashgoal}</td>
      <td>{dreamer.progress}</td>
      <td>{dreamer.expiration_date === null ? "-" : 60 - dreamer.expiration_date}</td>
      <td>{dreamer.supporters} {dreamer.supporters === 1 ? "financiador" : "financiadores"}</td>
    </tr>
  );
}
