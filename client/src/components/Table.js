import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import classes from './Table.module.scss';

function DataTable({ columns, rows }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const rowsData = rows?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  if (rows.length === 0) {
    return <p>No data</p>;
  }

  return (
    <>
      <Table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.tbody}>{rowsData}</tbody>
      </Table>
      <div className={classes.pagination}>
        <div className={classes.pagination__info}>
          <div>
            Showing {page * rowsPerPage - rowsPerPage + 1} to{' '}
            {page * rowsPerPage > rows.length
              ? rows.length
              : page * rowsPerPage}{' '}
            of {rows.length} entries
          </div>
        </div>
        <div className={classes.pagination__controls}>
          <div className={classes.pagination__controls__pages}>
            <label htmlFor="pages">Page:</label>
            <select
              name="pages"
              id="pages"
              value={page}
              onChange={handlePageChange}
              className={classes.pagination__controls__pages__select}
            >
              {Array.from(
                { length: Math.ceil(rows.length / rowsPerPage) },
                (_, i) => i + 1
              ).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;
