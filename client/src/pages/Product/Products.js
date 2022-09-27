import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../store/product';
import errors from '../../services/errors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiFillEdit, AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

import DataTable from '../../components/Table';
import LaunchModal from '../../components/Modal';

const productColumns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'isActive', label: 'Active' },
  { key: 'isFeatured', label: 'Featured' },
  { key: 'actions', label: 'Actions' },
];

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Map the rows of the table
  const productRows = (products) => {
    return products?.map((row) => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.price}</td>
        <td>
          {row.isActive ? <AiOutlineCheck color="green" size="1.1rem" /> : ''}
        </td>
        <td>
          {row.isFeatured ? <AiOutlineCheck color="green" size="1.1rem" /> : ''}
        </td>
        <td style={{ cursor: `pointer` }}>
          <AiFillEdit
            onClick={() => navigate(`/products/${row.id}/edit`)}
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
  const [productId, setProductId] = useState('');

  // Delete a product
  const handleDelete = (id) => {
    setShow(true);
    setProductId(id);
  };

  const handleClose = () => setShow(false);

  const handleAction = async () => {
    await dispatch(deleteProduct(productId));
    setShow(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
    };

    fetchProducts();
  }, [dispatch]);

  const {
    products,
    errors: productErrors,
    isLoading: productLoading,
  } = useSelector((state) => state.product);

  return (
    <Container>
      <LaunchModal
        show={show}
        handleClose={handleClose}
        handleAction={handleAction}
        body={'Are you sure you want to delete?'}
        title={`Delete Product`}
      />
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Products</h2>
        <button
          className="btn btn-success"
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
          columns={productColumns}
          rows={productRows(products) || []}
        />
      )}
    </Container>
  );
}
