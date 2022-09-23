import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUploadURL,
  updateCategory,
  setErrors,
  clearErrors,
  setLoading,
} from '../../store/category';
import errors from '../../services/errors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

export default function CategoryEditForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { category } = useSelector((state) => state.category);

  const [name, setName] = useState(category?.name);
  const [active, setActive] = useState(category?.isActive);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearErrors());

    const file = document.getElementById('fileInput').files[0];

    if (!file) {
      const res = await dispatch(
        updateCategory({
          id,
          name,
          isActive: active,
          image: category.image,
        })
      );
      if (res) {
        navigate('/categories');
      }
      return;
    }

    // get a signed url to upload to s3
    const uploadURL = await dispatch(
      getUploadURL({ filename: file.name, fileType: file.type })
    );

    // upload the file to s3
    try {
      dispatch(setLoading(true));
      const response = await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (response.status === 200) {
        const res = await dispatch(
          updateCategory({
            id,
            name,
            isActive: active,
            image: file.name,
          })
        );

        console.log(`Image updated and category updated.`);
        if (res) {
          navigate('/categories');
        }
      }
    } catch (err) {
      console.log(`Error while uploading file ${err}`);
      dispatch(setErrors([{ message: 'Error while uploading file' }]));
    }
  };

  const { errors: categoryErrors, isLoading } = useSelector(
    (state) => state.category
  );

  return (
    <>
      <Form onSubmit={onSubmit} className="container mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <h2>Edit Category</h2>
        </div>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">Category Name</label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>

          <Col>
            <Form.Label>Category Image</Form.Label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="form-control mb-3"
            />
            <div className="d-flex flex-column align-items-start justify-content-start">
              <img
                width="100%"
                src={category?.imageUrl}
                alt="category"
                className="img-fluid"
              />
              <p className="mt-2">
                <i>Old image</i>
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Check
              inline
              label="Active"
              name="group1"
              type={`checkbox`}
              value={active}
              defaultChecked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>{errors(categoryErrors)}</Col>
        </Row>

        {!isLoading && (
          <button className="btn btn-success">Save Changes</button>
        )}
        {isLoading && <Spinner animation="border" variant="success" />}
      </Form>
    </>
  );
}
