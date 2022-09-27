import Table from 'react-bootstrap/Table';
import classes from './Table.module.scss';

function DataTable({ columns, rows }) {
  if (rows.length === 0) {
    return <p>No data</p>;
  }

  return (
    <Table className={classes.table}>
      <thead className={classes.thead}>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className={classes.tbody}>{rows}</tbody>
    </Table>
  );
}

export default DataTable;
