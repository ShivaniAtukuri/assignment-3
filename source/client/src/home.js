// Cardcom.js

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './navbar'; // Correct import

export default class Cardcom extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col sm={4}>
              <img src="/photo.jpg" alt="My Photo" height="300" width="300" />
            </Col>
            <Col sm={8}>
              <h1>Shivani</h1>
              <p>Hello everyone</p>
              <a href='/calculate' className='btn btn-primary'>Adder</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
