import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './NewQuiz.scss';

class NewQuiz extends Component {

  componentWillMount() {
    const script = document.createElement("script");

    script.src = "https://www.riddle.com/files/js/embed.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    const divStyle = {
      margin: "0 auto",
      maxWidth: "100%",
      width: "700px"
    };

    const iframeStyle = {
      margin: "0 auto",
      maxWidth: "100%",
      width: "100%",
      height: "100%",
      border: "1px solid #cfcfcf"
    };

    const riddleID = "271120";
    const riddleUrl = "//www.riddle.com/a/" + riddleID + "?wide=1";

    return (
      <Container fluid className="new-quiz-container p-0">
        <Row>
          <Col md={12} pt-2 p-md-0>
            <h1 className="quiz-title pt-3">
              Traveler Persona Quiz
            </h1>
            <div className="embed-container">
              <div className="riddle_target" data-rid-id={riddleID} data-fg="#252525" data-bg="#EDEDED" style={divStyle} data-auto-scroll="true">
                <iframe title="embed-test" style={iframeStyle} src={riddleUrl}></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewQuiz;
