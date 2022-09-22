import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCustomers, getCustomers } from '../store/customer';
import errors from '../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from '../components/Table';

export default function Customers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      await dispatch(getCustomers());
    };

    fetchCustomers();

    return () => {
      dispatch(clearCustomers());
    };
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
          columns={[
            { key: 'first_name', label: 'First Name' },
            { key: 'last_name', label: 'Last Name' },
            { key: 'email', label: 'Email' },
            { key: 'billing_address', label: 'Billing Address' },
            { key: 'shipping_address', label: 'Shipping Address' },
          ]}
          rows={customers}
        />
      )}
    </Container>
  );
}
