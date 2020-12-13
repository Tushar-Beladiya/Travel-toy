import React, { Component } from "react";
import { Container, Row, Col, ResponsiveEmbed } from 'react-bootstrap';
import '../newQuiz/NewQuiz.scss';
import video from '../../assets/video/buildervideo.mp4';

class VideoPage extends Component {
  render() {
    return (
      <Container fluid className="new-quiz-container p-0">
        <Row>
          <Col md={12} pt-2 p-md-0>
            <h1 className="video-title pt-3">
              Itinerary Builder
            </h1>
            <ResponsiveEmbed aspectRatio='16by9' className="video-container">
                <video width="560" height="315" controls >
                  <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </ResponsiveEmbed>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default VideoPage;
