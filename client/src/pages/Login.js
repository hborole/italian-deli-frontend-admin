import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, clearErrors, setLoading } from '../store/auth';
import errors from '../services/errors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      dispatch(setLoading(false));
    };
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(signIn({ email, password }));
    if (response) {
      navigate('/');
    }
  };

  const { errors: authErrors, isLoading: authLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <Form onSubmit={onSubmit} className="container mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <h1>Login</h1>
        </div>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">Email Address</label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">Password</label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>{errors(authErrors)}</Col>
        </Row>

        {!authLoading && <button className="btn btn-success">Login</button>}
        {authLoading && <Spinner animation="border" variant="success" />}
      </Form>

      <div className="container mt-5">
        <p className="mb-3">Don't have an account?</p>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate('/signup')}
        >
          Sign Up Here
        </button>
      </div>
    </>
  );
}
