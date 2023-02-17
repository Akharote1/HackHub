import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faCheckCircle, faBookmark, faChessKing } from "@fortawesome/free-regular-svg-icons"
import { Card, Col, Row } from "react-bootstrap";

export default function StatsBar() {
  return (
    <Row xs={12}>
      <Col xs={3}>
        <Card
         className="p-4">
          <span className=" fs-1">
            2500</span>
          <span className=" fw-semibold text-black-50 fs-5">
            <FontAwesomeIcon 
              icon={faBarChart}
              className="me-2"
            />
            Registrations</span>
        </Card>
      </Col>

      <Col xs={3}>
        <Card className="p-4">
          <span className=" fs-1">24</span>
          <span className=" fw-semibold text-black-50 fs-5">
            <FontAwesomeIcon 
              icon={faCheckCircle}
              className="me-2"
            />
            Shortlisted</span>
        </Card>
      </Col>

      <Col xs={3}>
        <Card className="p-4">
          <span className=" fs-1">6</span>
          <span className=" fw-semibold text-black-50 fs-5">
            <FontAwesomeIcon 
              icon={faChessKing}
              className="me-2"
            />
            Problem Statements</span>
        </Card>
      </Col>

      <Col xs={3}>
        <Card className="p-4">
          <span className=" fs-1">6</span>
          <span className=" fw-semibold text-black-50 fs-5">
            <FontAwesomeIcon 
              icon={faBookmark}
              className="me-2"
            />
            Submissions</span>
        </Card>
      </Col>
    </Row>
  )
}