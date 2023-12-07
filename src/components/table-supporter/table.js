import RowSupporter from "../row-supporter/row";
import "./table.css";

function Table(props) {
  const { headers, supporters } = props;
  console.log(supporters);
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
        {supporters.length > 0 ? (
          supporters.map((supporter) => {
            return <RowSupporter supporter={supporter} />;
          })
        ) : (
          <RowSupporter />
        )}
      </tbody>
    </table>
  );
}

export default Table;
