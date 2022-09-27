import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../store/customer';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DataTable from '../../components/Table';

const customerColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'billing_address', label: 'Billing Address' },
  { key: 'shipping_address', label: 'Shipping Address' },
];

export default function Customers() {
  const dispatch = useDispatch();

  // Map the rows of the table
  const customerRows = (customers) => {
    return customers?.map((row) => (
      <tr key={row.id}>
        <td>{`${row.first_name} ${row.last_name}`}</td>
        <td>{row.email}</td>
        <td>{row.billing_address}</td>
        <td>{row.shipping_address}</td>
      </tr>
    ));
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      await dispatch(getCustomers());
    };

    fetchCustomers();
  }, [dispatch]);

  const {
    customers,
    errors: customerErrors,
    isLoading: customerLoading,
  } = useSelector((state) => state.customer);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Customers</h2>
      </div>

      <Row className="mb-3">
        <Col>{errors(customerErrors)}</Col>
      </Row>

      {customerLoading && <p>Loading...</p>}

      {!customerLoading && (
        <DataTable
          columns={customerColumns}
          rows={customerRows(customers) || []}
        />
      )}
    </Container>
  );
}
