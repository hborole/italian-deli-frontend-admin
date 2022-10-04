import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/order';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DataTable from '../../components/Table';

const orderColumns = [
  { key: 'name', label: 'Name' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
  { key: 'note', label: 'Delivery Note' },
  { key: 'items', label: 'Items' },
];

export default function Orders() {
  const dispatch = useDispatch();

  // Map the rows of the table
  const orderRows = (orders) => {
    return orders?.map((row) => (
      <tr key={row.id}>
        <td>{`${row.first_name} ${row.last_name}`}</td>
        <td>£&nbsp;{row.total}</td>
        <td>{row.status}</td>
        <td>{row.note ? row.note : 'None'}</td>
        <td>{new Date(row.order_date).toLocaleDateString('en-UK')}</td>
        <td>
          {row.order_items?.map((item, index) => {
            return (
              <div key={index}>
                {item.quantity} x {item.name}
              </div>
            );
          })}
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getOrders());
    };

    fetchOrders();
  }, [dispatch]);

  const {
    orders,
    errors: orderErrors,
    isLoading: orderLoading,
  } = useSelector((state) => state.order);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Orders</h2>
      </div>

      <Row className="mb-3">
        <Col>{errors(orderErrors)}</Col>
      </Row>

      {orderLoading && <p>Loading...</p>}

      {!orderLoading && (
        <DataTable columns={orderColumns} rows={orderRows(orders) || []} />
      )}
    </Container>
  );
}
