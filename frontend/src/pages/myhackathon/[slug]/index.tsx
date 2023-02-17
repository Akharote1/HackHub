
import { Button, Card, Col, Row } from "react-bootstrap";
import Chart1 from "../../../components/dashboard/Chart1";
import Chart2 from "../../../components/dashboard/Chart2";
import StatsBar from "../../../components/dashboard/StatsBar";
import QRCode from "react-qr-code";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useState, useEffect } from "react";
import axiosClient from "../../../services/axios-client";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";

const Dashboard = function () {
  const [statistics, setStatistics] = useState(null);
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/statistics/'+router.query.slug);
        setStatistics(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])
  
  if (!statistics) return null;

  return (
    <div className="p-5 w-100">
      <div className="d-flex align-items-center mb-3">
        <h2>Dashboard</h2>
      </div>

      <StatsBar statistics={statistics} />

      <div className="mt-4"></div>

      <Row xs={12}>
        <Col xs={4}>
          <Chart1 statistics={statistics} />
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

Dashboard.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Dashboard;