import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUploadURL,
  createCategory,
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
import Preview from '../../components/Preview';

export default function CategoryCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [active, setActive] = useState(true);

  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      dispatch(setLoading(false));
    };
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearErrors());

    dispatch(setLoading(true));
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

    // upload the file to s3
    try {
      const response = await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (response.status === 200) {
        // create the category in the db
        const res = await dispatch(
          createCategory({
            name,
            isActive: active,
            image: file.name,
          })
        );
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
          <h2>Create Category</h2>
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
          <Col>
            <Form.Label>Category Image</Form.Label>
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

        <Row className="mb-3">
          <Col>{errors(categoryErrors)}</Col>
        </Row>

        {!isLoading && <button className="btn btn-success">+ Create</button>}
        {isLoading && <Spinner animation="border" variant="success" />}
      </Form>
    </>
  );
}
