import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/category';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from '../../components/Table';

const categoryColumns = [
  { key: 'name', label: 'Name' },
  { key: 'isActive', label: 'Active' },
  { key: 'actions', label: 'Actions' },
];

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Map the rows of the table
  const categoryRows = (categories) => {
    return categories?.map((row) => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.isActive ? 'Yes' : 'No'}</td>
        <td>
          <button
            className="btn btn-sm btn-outline-blue"
            onClick={() => navigate(`/categories/${row.id}/edit`)}
          >
            Edit
          </button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getCategories());
    };

    fetchCategories();
  }, [dispatch]);

  const {
    categories,
    errors: categoryErrors,
    isLoading: categoryLoading,
  } = useSelector((state) => state.category);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Categories</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/categories/new')}
        >
          +&nbsp;&nbsp;New Category
        </button>
      </div>

      <Row className="mb-3">
        <Col>{errors(categoryErrors)}</Col>
      </Row>

      {categoryLoading && <p>Loading...</p>}

      {!categoryLoading && (
        <DataTable
          columns={categoryColumns}
          rows={categoryRows(categories) || []}
        />
      )}
    </Container>
  );
}
