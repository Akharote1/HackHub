import { faClock, faEye, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import ReactImageGallery from "react-image-gallery";
import Link from "next/link";
import Chip from "../../../components/common/Chip";
import axiosClient from "../../../services/axios-client";
import { useUser } from "../../../hooks/AuthContext";
import moment from 'moment'
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import ViewPSModal from "../../../components/registrations/ViewPSModal";

const Event = () => {
  const router = useRouter();
  const [isPSModalVisible, setPSModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const {user} = useUser();

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/view/'+router.query.slug);
        setEventData(res.data.event)
        const res2 = await axiosClient.get('/team/find/'+router.query.slug);
        setTeamData(res2.data.team)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [router.asPath])
  
  if (!eventData) return null;

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{
          backgroundColor: "black",
          height: "40vh",
        }}
      >
        <Image
          className=""
          style={{
            width: "100%",
            height: "40vh",
            opacity: "0.5",
            objectFit: "cover",
            objectPosition: "center",
            // filter: "blur(8px)",
            position: "absolute",
          }}
          src={eventData.header_image}
        />

        <h1
          className=""
          style={{
            zIndex: 111,
            color: "#FFF",
            textShadow: "0 4px 8px rgba(0,0,0,0.5)",
          }}
        >
          {eventData.name}
        </h1>

        <span
          className="text-white fw-semibold"
          style={{
            fontSize: "1.125rem",
            textShadow: "0 4px 8px rgba(0,0,0,0.5)",
          }}
        >
          By {eventData.organizer_name}
        </span>
      </div>

      <div className="d-flex justify-content-center px-4 py-3 align-items-center text-center ">
        <Card
          style={{ height: "auto", width: "100%", maxWidth: "1292px" }}
          className="shadow"
        >
          <Container className="d-flex justify-content-start align-items-center flex-row mt-2 border-none">
            <HighlightItem icon={faClock} name="Start Date" value={moment(eventData.event_date).format('DD/MM/YY HH:mm')} />
            
            <HighlightItem
              icon={faClock}
              name="Registration Deadline"
              value={moment(eventData.registration_end).format('DD/MM/YY HH:mm')}
            />

            <HighlightItem icon={faMapMarker} name="Location" value={
              eventData.online ? "Online" : eventData.venue
            } />

            <span className="ms-auto px-3 text-secondary">{eventData.registration_count} registered</span>

            {!teamData && (
              <Link href={`/events/${eventData.slug}/register`}>
                {" "}
                <Button className="me-3">
                  {"Register Now"}
                </Button>
              </Link>
            )}

            {teamData && ("You have already registered")}
          </Container>
          
          <div className="d-flex justify-content-center align-items-center flex-row mt-2">
            {eventData.domains.map(domain => (
              <Chip key={domain} name={domain} />
            ))}
          </div>

          <div className="mb-3 mt-2">
            {eventData.ps_list_released && (
              <Button className="me-3" onClick={() => setPSModalVisible(true)}>
                <FontAwesomeIcon icon={faEye} className="me-2" />
                View Problem Statements
              </Button>
            )}

            {teamData && !teamData.shortlisted && (
              <Link href={teamData?.screening_submitted ? '#' : `/events/${router.query.slug}/abstractsub`}>
                <Button disabled={teamData?.screening_submitted} className="me-3">
                  <FontAwesomeIcon icon={faWpforms} className="me-2" />
                  {teamData?.screening_submitted ? 'Already Submitted' : 'Make Screening Submission'}
                  
                </Button>
              </Link>
            )}

            {eventData.ps_form_released && teamData && (
              <Link href={teamData?.ps_preferences ? '#' : `/events/${router.query.slug}/preference`}>
                <Button disabled={teamData?.ps_preferences}>
                  <FontAwesomeIcon icon={faWpforms} className="me-2" />
                  {teamData?.ps_preferences ? 'PS Preference Filled' : 'Fill PS Preferences'}
                  
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>

      <div>
        <Container>
          <Card
            className="mb-2 shadow border-none rounded-3 p-4"
          >
            <h3>
              About {eventData.name}
            </h3>

            <p>
              {eventData.description}
            </p>
          </Card>
        </Container>
        <ViewPSModal 
          show={isPSModalVisible}
          onClose={setPSModalVisible}
          statements={eventData.ps_list}
        />
      </div>
    </>
  );
};

const HighlightItem = ({ icon, name, value }) => {
  return (
    <div className="d-flex align-items-center justify-item-center flex-column px-3 border-end">
      <div
        className="d-flex align-items-center h-100 text-secondary fw-semibold"
        style={{ fontSize: "12px" }}
      >
        <FontAwesomeIcon
          className="text-primary"
          style={{ width: "28px" }}
          icon={icon}
        />
        {name}
      </div>
      <span className="fw-semibold">{value}</span>
    </div>
  );
};

Event.getLayout = (page) => {
  return <>{page}</>;
};

export default Event;
