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
import Preview from '../../components/Preview';

export default function CategoryEditForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { category } = useSelector((state) => state.category);

  const [name, setName] = useState(category?.name);
  const [active, setActive] = useState(category?.isActive);

  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

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
          oldImage: category.image,
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
            oldImage: category.image,
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
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="form-control mb-3"
              onChange={imageChange}
            />
            <div className="d-flex flex-wrap justify-content-between mt-2">
              {category?.imageUrl && (
                <Preview selectedImage={category?.imageUrl} url={true} />
              )}
              {selectedImage && <Preview selectedImage={selectedImage} />}
            </div>
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
