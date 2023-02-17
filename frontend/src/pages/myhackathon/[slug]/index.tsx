
import { Button, Card, Col, Row } from "react-bootstrap";
import Chart1 from "../../../components/dashboard/Chart1";
import Chart2 from "../../../components/dashboard/Chart2";
import StatsBar from "../../../components/dashboard/StatsBar";
import QRCode from "react-qr-code";

const Dashboard = function () {
  return (
    <div className="p-5 w-100">
      <div className="d-flex align-items-center mb-3">
        <h2>Dashboard</h2>
      </div>

      <StatsBar />

      <div className="mt-4"></div>

      <Row xs={12}>
        <Col xs={4}>
          <Chart1 />
        </Col>

        <Col xs={4}>
          <Chart2 />
        </Col>

        <Col xs={4}>
          <Card className="p-3 d-flex align-items-center justify-center flex-column"
            style={{height: 320}}
          >
            <span 
              style={{
                fontSize: "0.825rem",
                fontWeight: 'bold',
                opacity: '0.75'
              }}
              className=" mb-5"
            >Share Link</span>
            <QRCode size={120} value="hey" />

            <Button size="sm" className="mt-4">
              Copy Link
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;