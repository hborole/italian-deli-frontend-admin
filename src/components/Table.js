import Table from 'react-bootstrap/Table';

function DataTable({ columns, rows }) {
  if (rows.length === 0) {
    return <p>No data</p>;
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default DataTable;
