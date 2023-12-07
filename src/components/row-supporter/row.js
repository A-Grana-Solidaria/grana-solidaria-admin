import "./row.css";
import { useHistory } from "react-router-dom";

export default function RowSupporter(props) {
  const { supporter } = props;
  const history = useHistory();

  // remover ternária quando integrar com back
  return supporter ? (
    <tr
      class="tbody"
      onClick={() => {
        history.push(`${process.env.PUBLIC_URL}/apoiador/${supporter.id}`);
      }}
    >
      <td>{supporter.name}</td>
      <td>{supporter.totalSupport} Projetos Apoiados</td>
      <td>R$ {supporter.invested},00</td>
    </tr>
  ) : (
    <tr
      class="tbody"
      onClick={() => {
        history.push(`${process.env.PUBLIC_URL}/apoiador`);
      }}
    >
      <td>Carregando...</td>
      <td>2 projetos apoiados</td>
      <td>R$ 200</td>
    </tr>
  );
}
