import { useRouter } from "next/router";
import {
	Card,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	Button,
} from "react-bootstrap";
import { useUser } from "../../../hooks/AuthContext";
import axiosClient from "../../../services/axios-client";
import { useEffect, useState } from "react";

function AbstractSub() {
	const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [abstractText, setAbstractText] = useState("");
  const [presentationLink, setPresentationLink] = useState("");
  const {user} = useUser();


  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/view/'+router.query.slug);
        setEventData(res.data.event)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [router.asPath])
  
  if (!eventData) return null;
	
	return (
		<div className="d-flex flex-column justify-content-center align-items-center  py-5">
			<Card
				className="shadow bg-primary"
				style={{ width: "70%", border: "none", height: "45px", color: "white" }}
			>
				<Card.Header style={{ border: "none" }}>
					<b>Screening Round Submission for {eventData.name}</b>
				</Card.Header>
			</Card>
			<Card className="mt-3 shadow" style={{ width: "70%", border: "none" }}>
				<Card.Body>
					<b>Guidelines</b>
					<p>{eventData.screening.guidelines_text || "This is a dummy problem statement"}</p>

					<Form className="mt-3"
						onSubmit={async (e) => {
							e.preventDefault()
							await axiosClient.post('/team/submit-screening/' + router.query.slug, {
								presentation_link: presentationLink,
								abstract_text: abstractText
							})
							router.push(`/events/${router.query.slug}`)
						}}
					>
						<FormGroup>
							<FormLabel>Abstract Solution</FormLabel>
							<FormControl
								as="textarea"
								value={abstractText}
								onChange={(e) => setAbstractText(e.target.value)}
								rows={10}
								placeholder="Enter your solution here"
							/>
						</FormGroup>

						<FormGroup className="mt-2">
							<FormLabel>Presentation Link</FormLabel>
							<FormControl
								type="text"
								value={presentationLink}
								onChange={(e) => setPresentationLink(e.target.value)}
								placeholder="Enter presentation link"
							/>
						</FormGroup>

						<Button type="submit" className="mt-3">
							Submit
						</Button>
					</Form>
					{/* </Card.Body> */}
				</Card.Body>
			</Card>
		</div>
	);
}

export default AbstractSub;
