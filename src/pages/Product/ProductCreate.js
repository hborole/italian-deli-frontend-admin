import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUploadURL,
  createProduct,
  setErrors,
  clearErrors,
  setLoading,
} from '../../store/product';
import { getCategories } from '../../store/category';
import errors from '../../services/errors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Preview from '../../components/Preview';
import axios from 'axios';

export default function ProductCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      dispatch(setLoading(false));
    };
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearErrors());

    if (categoryId === '') {
      dispatch(setErrors([{ message: 'Category is required' }]));
      dispatch(setLoading(false));
      return;
    }

    const file = document.getElementById('fileInput').files[0];

    if (!file) {
      dispatch(setErrors([{ message: 'Image is required' }]));
      dispatch(setLoading(false));
      return;
    }

    // get a signed url to upload to s3
    const uploadURL = await dispatch(
      getUploadURL({ filename: file.name, fileType: file.type })
    );

    console.log(uploadURL);

    // upload the file to s3
    try {
      dispatch(setLoading(true));
      const response = await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (response.status === 200) {
        // create the product in the db
        const res = await dispatch(
          createProduct({
            name,
            isActive: active,
            isFeatured: featured,
            price,
            description,
            image: file.name,
            category_id: categoryId,
          })
        );
        if (res) {
          navigate('/products');
        }
      }
    } catch (err) {
      console.log(`Error while uploading file ${err}`);
      dispatch(setErrors([{ message: 'Error while uploading file' }]));
    }
  };

  const { errors: productErrors, isLoading } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <Form onSubmit={onSubmit} className="container mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <h2>Create Product</h2>
        </div>

        {categoryLoading && <p>Fetching Data...</p>}

        {categoryErrors.length > 0 && errors(categoryErrors)}

        {!categoryLoading && categoryErrors.length === 0 && (
          <>
            <Row className="mb-3">
              <Col>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Label>Product Image</Form.Label>
                {/* <Form.Control id="fileInput" type="file" /> */}
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="form-control mb-3"
                  onChange={imageChange}
                />
                {selectedImage && <Preview selectedImage={selectedImage} />}
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <Form.Check
                  inline
                  label="Active"
                  name="active"
                  type={`checkbox`}
                  value={active}
                  defaultChecked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <span style={{ width: '4rem' }}></span>
                <Form.Check
                  inline
                  label="Featured"
                  name="featured"
                  type={`checkbox`}
                  value={featured}
                  defaultChecked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>{errors(productErrors)}</Col>
            </Row>

            {!isLoading && (
              <button className="btn btn-success">+ Create</button>
            )}
            {isLoading && <Spinner animation="border" variant="success" />}
          </>
        )}
      </Form>
    </>
  );
}
