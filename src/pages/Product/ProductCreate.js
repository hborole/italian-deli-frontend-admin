import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, clearErrors, setLoading } from '../../store/product';
import errors from '../../services/errors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function ProductCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      dispatch(setLoading(false));
    };
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(createProduct({ name, description }));
    if (response) {
      navigate('/');
    }
  };

  const { errors: productErrors, isLoading: productLoading } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <Form onSubmit={onSubmit} className="container mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <h2>Create Product</h2>
        </div>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">Product Name</label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">Description</label>
            <Form.Control
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>{errors(productErrors)}</Col>
        </Row>

        <button className="btn btn-success" disabled={productLoading}>
          {productLoading ? 'Logging you in...' : 'Login'}
        </button>
      </Form>
    </>
  );
}
