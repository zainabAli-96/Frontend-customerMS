import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CustomerForm = ({ customer, handleInputChange, handleSubmit, formMode }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={customer.first_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={customer.last_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={customer.birthday}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="success" type="submit">
          {formMode === 'add' ? 'Add Customer' : 'Save Changes'}
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm;