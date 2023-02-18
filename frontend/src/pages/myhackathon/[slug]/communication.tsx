import DashboardLayout from "../../../components/common/DashboardLayout";
import CommunicationTable from "../../../components/registrations/CommunicationTable";
import { useState, useEffect } from "react";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";
import { Button } from "react-bootstrap";
import CreateMailModal from "../../../components/registrations/CreateMailModal";

const Communication = function () {
  const [communications, setCommunications] = useState(null);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/communications/'+router.query.slug);
        setCommunications(res.data.communications)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])
  
  if (communications == null) return null;

  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Communication</h2>

        <Button className="btn-sm ms-3"
          onClick={() => setSendModalVisible(true)}
        >
          Send
        </Button>
      </div>

      <CommunicationTable communications={communications} />
      <CreateMailModal 
        show={sendModalVisible}
        onClose={(success) => {
          setSendModalVisible(false)
          if (!success) return;
          const fetchData = async () => {
            try {
              const res = await axiosClient.get('/hackathon/communications/'+router.query.slug);
              setCommunications(res.data.communications)
            } catch (error) {
              console.log(error)
            }
          }
      
          fetchData()
        }}
        slug={router.query.slug}
      />
    </div>
  )
}

Communication.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Communication;