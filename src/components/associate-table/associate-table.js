import AssociateRow from "../associate-row/associate-row";
import "./associate-table.css";

function AssociateTable(props) {
  const { headers, associates } = props;

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
        {associates.map((associate) => {
          return <AssociateRow associate={associate} />;
        })}
      </tbody>
    </table>
  );
}

export default AssociateTable;
