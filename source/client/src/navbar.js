import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './photo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

export default class Navcom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Shivani",
      description: "Hello everyone. Myself Shivani Atukuri. I have joined UAlbany in the year 2023. I am a talented, ambitious, and hardworking individual. I like to watch K-dramas, and I am a fan of BTS.",
      isEditingName: false,
      isEditingDescription: false
    };
  }

  handleEditNameClick = () => {
    this.setState({ isEditingName: !this.state.isEditingName });
  };

  handleEditDescriptionClick = () => {
    this.setState({ isEditingDescription: !this.state.isEditingDescription });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
      <div className='mb-5'>
        <Navbar bg="white" variant="white">
          <div className='ms-100' style={{ marginLeft: '100px' }}>
            <Navbar.Brand href="#home">
              <Container className="align-items-center">
                <Row>
                  <Col>
                    <img
                      alt=""
                      src={logo}
                      width="200"
                      height="200"
                      className="d-inline-block align-top"
                    />
                  </Col>
                  <Col>
                    {this.state.isEditingName ? (
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                      />
                    ) : (
                      <h1>{this.state.name}</h1>
                    )}
                    {this.state.isEditingDescription ? (
                      <input
                        type="text"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                      />
                    ) : (
                      <p>{this.state.description}</p>
                    )}
                    <button onClick={this.handleEditNameClick}>
                      {this.state.isEditingName ? 'Save Name' : 'Edit Name'}
                    </button>
                    <button onClick={this.handleEditDescriptionClick}>
                      {this.state.isEditingDescription ? 'Save Description' : 'Edit Description'}
                    </button>
                  </Col>
                </Row>
              </Container>
            </Navbar.Brand>
          </div>
        </Navbar>
      </div>
    );
  }
}
