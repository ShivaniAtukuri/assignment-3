import React, { Component } from 'react';
import {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Cal() {
    const [fn1,sfn1] = useState("");
    const [fn2,sfn2] = useState("");
    const [res, setRes] = useState("");
    const [result, setSResult] = useState("");
    const url = "http://localhost:3001/calculate/submit/"+fn1+"/"+fn2;
    const Handlefn1change = (event) => {
        sfn1(event.target.value);
      };
    
      const handlefn2change = (event) => {
        sfn2(event.target.value);
      };
    
      const handleResult =  (event) => {
        setRes(Number(fn1) + Number(fn2));

        event.preventDefault();
        axios.get(url).then( res => {
        setSResult(Number(res.data.result));
      })
      }
    return (
      <div className='m-4'>
      <Row>
        <Col>
          <p>Enter First Number</p>
        </Col>
        <Col>
        <input type="number" value={fn1} onChange={Handlefn1change} />
        </Col>
      </Row>
      <Row>
      <Col>
          <p>Enter Second Number</p>
        </Col>
        <Col>
        <input type="number" value={fn2} onChange={handlefn2change} />
        </Col>
      </Row>
      <Button className='m-4' onClick={handleResult}>
            Submit
      </Button>
      <h2>
            Your Addition Result (ReactJS) is: {res}
      </h2>
      <h2>
            Your Addition Result (Server) is: {result}
      </h2>
      <a href='/' className='btn btn-primary'>Go back</a>
      </div>
      
    )
    };
export default Cal;