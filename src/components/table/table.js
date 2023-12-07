import Row from "../row/row";
import "./table.css";

function Table(props) {
  const { headers, dreamers } = props;

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
        {dreamers.map((dreamer) => {
          return <Row dreamer={dreamer} />;
        })}
      </tbody>
    </table>
  );
}

export default Table;
