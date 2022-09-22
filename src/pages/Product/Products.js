import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts, getProducts } from '../../store/product';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from '../../components/Table';

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
    };

    fetchProducts();

    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  const {
    products,
    errors: productErrors,
    isLoading: productLoading,
  } = useSelector((state) => state.product);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Products</h2>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate('/products/new')}
        >
          +&nbsp;&nbsp;New Product
        </button>
      </div>

      <Row className="mb-3">
        <Col>{errors(productErrors)}</Col>
      </Row>

      {productLoading && <p>Loading...</p>}

      {!productLoading && (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'isActive', label: 'Active' },
            { key: 'isFeatured', label: 'Featured' },
            { key: 'price', label: 'Price' },
          ]}
          rows={products}
        />
      )}
    </Container>
  );
}
