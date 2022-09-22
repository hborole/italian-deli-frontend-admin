import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={onSubmit} className="container mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <h1>Sign Up</h1>
        </div>

        <Row className="mb-3">
          <Col>
            <label className="mb-2">First Name</label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <label className="mb-2">Last Name</label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
        </Row>

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

        <button className="btn btn-success">Sign Up</button>
      </Form>

      <div className="container mt-5">
        <p className="mb-3">Already have an account?</p>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate('/login')}
        >
          Log In Here
        </button>
      </div>
    </>
  );
}
