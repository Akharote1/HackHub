import {
	Form,
	FormCheck,
	FormControl,
	FormGroup,
	FormLabel,
	FormSelect,
    Button,
    Container,
    Card
} from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import organization from "../../../../organization.json";
import participants from "../../../../organization.json"
import DropFileUpload from "../../../components/common/DropFileUpload";
import { uploadFilesToCloud } from "../../../utils";
// function fetchDetails(){
//     const email="melonip@gmail.com"
//     if(participants.email==)
// }
function hackRegister() {
    const [partemail, setpartemailInfo] = useState({
		email:""
	});
    const [mode, setMode] = useState("online");
	const { domains } = organization;
    const participants =[1,2,3,4,5];
	useEffect(() => {
		console.log(partemail);
	}, [partemail]);

    

	return (
		<div
			className="d-flex justify-content-center align-items-center shadow-lg py-5"
			style={{
				minHeight: "100vh",
				width: "100vw",
				color: "#19339b",
			}}
		>
			<div
				className=" w-75 bg-white rounded-5 d-flex flex-column justify-content-center align-items-center"
				style={{
					boxShadow: "0px 4px 8px #040f3c4c",
					minHeight: "75%",
					padding: "2rem",
				}}
			>
				<h2 className="">Hackathon</h2>
				<Form className="w-75">
                <FormGroup className="w-100 mb-3 required">
						<FormLabel>Team Name</FormLabel>
						<FormControl type="text" placeholder="Team Name" />
					</FormGroup>
					<FormGroup className="w-100 mt-4 mb-2 required">
						<FormLabel>Team Leader Email:</FormLabel>
						<FormControl type="text" placeholder="Email Address" id="teamleader" onChange={(e) => {
							setpartemailInfo({ ...partemail, email: e.target.value });
						}}/>
					</FormGroup>
                    
                    <div className="" >
                    <FormGroup className="w-100 mb-3 me-4">
							<FormLabel>Resume</FormLabel>
							<DropFileUpload
								text=" Resume"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                    
                    <FormGroup className="w-100 mt-4 mb-2 required">
						<FormLabel>Team Member 1 Email:</FormLabel>
						<FormControl type="text" placeholder="Email Address" onChange={(e) => {
							setpartemailInfo({ ...partemail, email: e.target.value });
						}}/>
					</FormGroup>
                    <div className="" >
                    <FormGroup className="w-100 mb-3 me-4">
							<FormLabel>Resume</FormLabel>
							<DropFileUpload
								text=" Resume"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                    <FormGroup className="w-100 mt-4 mb-2 required">
						<FormLabel>Team Member 2 Email:</FormLabel>
						<FormControl type="text" placeholder="Email Address" onChange={(e) => {
							setpartemailInfo({ ...partemail, email: e.target.value });
						}}/>
					</FormGroup>
                    <div className="" >
                    <FormGroup className="w-100 mb-3 me-4">
							<FormLabel>Resume</FormLabel>
							<DropFileUpload
								text=" Resume"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                    <FormGroup className="w-100 mt-4 mb-2 required">
						<FormLabel >Team Member 3 Email:</FormLabel>
						<FormControl type="text" placeholder="Email Address" onChange={(e) => {
							setpartemailInfo({ ...partemail, email: e.target.value });
						}} />
					</FormGroup>
                    <div className="" >
                    <FormGroup className="w-100 mb-4 me-4">
							<FormLabel>Resume</FormLabel>
							<DropFileUpload
								text=" Resume"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                   <div>
                    
                    </div> 
                    <Button>Submit</Button>
				</Form>
			</div>
		</div>
	);
}

hackRegister.getLayout = (page) => {
	return page;
};

export default hackRegister;