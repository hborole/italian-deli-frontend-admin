import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../store/category';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiFillEdit, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';

import DataTable from '../../components/Table';
import LaunchModal from '../../components/Modal';

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
        <td>
          {row.isActive ? <AiOutlineCheck color="green" size="1.1rem" /> : ''}
        </td>
        <td style={{ cursor: `pointer` }}>
          <AiFillEdit
            onClick={() => navigate(`/categories/${row.id}/edit`)}
            size="1.2rem"
          />
          <span style={{ marginRight: `2rem` }}></span>
          <AiOutlineDelete
            color="#e83939"
            onClick={() => handleDelete(row.id)}
            size="1.2rem"
          />
        </td>
      </tr>
    ));
  };

  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  // Delete a category
  const handleDelete = (id) => {
    setShow(true);
    setCategoryId(id);
  };

  const handleClose = () => setShow(false);

  const handleAction = async () => {
    await dispatch(deleteCategory(categoryId));
    setShow(false);
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
      <LaunchModal
        show={show}
        handleClose={handleClose}
        handleAction={handleAction}
        body={'Are you sure you want to delete?'}
        title={`Delete Category`}
      />
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
