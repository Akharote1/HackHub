import {
	Form,
	FormCheck,
	FormControl,
	FormGroup,
	FormLabel,
	FormSelect,
	Button,
	Container,
	Card,
} from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import organization from "../../../../data/organization.json";
import participant from "../../../../data/organization.json";
import DropFileUpload from "../../../components/common/DropFileUpload";
import { uploadFilesToCloud } from "../../../utils";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";
import { useUser } from "../../../hooks/AuthContext";

// function fetchDetails(){
//     const email="melonip@gmail.com"
//     if(participants.email==)
// }
function HackRegister() {
	const user = useUser();
	const router = useRouter();
	const teamId = router.query.slug;
	const [hackathon, setHackathon] = useState();
	const [teamName, setTeamName] = useState("");
	const [minSize, setMinSize] = useState();
	const [maxSize, setMaxSize] = useState();
	const [length, setLength] = useState();
	const [teamParticipants, setTeamParticipants] = useState([]);
	const [partemail, setpartemailInfo] = useState([
		{
			email: user?.user?.email,
			resumeFile: null
		},
	]);
	const fetchHackathon = async () => {
		const response = await axiosClient.get(`/hackathon/view/${teamId}`);
		console.log(response.data);
		setHackathon(response.data.event);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("submitting");
		const urls = []

		for (let i = 0; i < partemail.length; i++) {
			console.log(partemail[i])
			urls.push(await uploadFilesToCloud([partemail[i].resumeFile], "resume/"))
		}

		const temp = await Promise.all(
			partemail.map(async (item) => {
				let url;
				console.log("A1");
				url = await uploadFilesToCloud([item.resumeFile], "resume/");
				console.log("B1");
				return {
					email: item.email,
					resume: url[0],
				};
			})
		);
		console.log(temp);
		if (temp) {
			const res = await axiosClient.post(`/team/register/${teamId}`, {
				team_name: teamName,
				team_members: temp,
			});
			console.log(res);
		}
	};

	useEffect(() => {
		fetchHackathon();
	}, []);

	useEffect(() => {
		if (length) {
			const parts = [];
			for (let i = 0; i < length - 1; i++) {
				parts.push(i);
			}
			setTeamParticipants(parts);
		}
	}, [length]);

	useEffect(() => {
		if (hackathon) {
			setMinSize(hackathon.min_team_size);
			setMaxSize(hackathon.max_team_size);
			setLength(minSize);
		}
	}, [hackathon]);

	useEffect(() => {
		console.log(partemail);
	}, [partemail]);

	return (
		<div>
			{hackathon ? (
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
						<h2 className="">{hackathon?.name}</h2>
						<Form className="w-75" onSubmit={handleSubmit}>
							<FormGroup className="w-100 mb-3 required">
								<FormLabel>Team Name</FormLabel>
								<FormControl
									type="text"
									placeholder="Team Name"
									value={teamName}
									onChange={(e) => {
										setTeamName(e.target.value);
									}}
									required
								/>
							</FormGroup>
							<FormGroup className="w-100 mt-4 mb-2 required">
								<FormLabel>Team Leader Email:</FormLabel>
								<FormControl
									type="text"
									placeholder="Email Address"
									id="teamleader"
									disabled
									// onChange={(e) => {
									// 	let temp = [...partemail];
									// 	temp[0] = {
									// 		...temp[0],
									// 		email: e.target.value,
									// 	};
									// 	setpartemailInfo(temp);
									// }}
									value={user.user.email}
									required
								/>
							</FormGroup>

							<div className="mb-3">
								<FormGroup className="w-100 me-4">
									<FormLabel>Resume</FormLabel>
									<DropFileUpload
										text=" Resume"
										multiple={false}
										uploadFiles={async (files, rejected) => {
											// const urls = await uploadFilesToCloud(files, "testing/");
											let temp = [...partemail];
											temp[0] = {
												...temp[0],
												resumeFile: files[0],
											};
											setpartemailInfo(temp);
										}}
									/>
								</FormGroup>
								{partemail[0] && partemail[0].resumeFile && (
									<div>{partemail[0].resumeFile.name}</div>
								)}
							</div>

							{teamParticipants.map((participant, index) => {
								return (
									<div key={index}>
										<FormGroup className="w-100 mt-4 mb-2 required">
											<FormLabel>Team Member {index + 2} Email:</FormLabel>
											<FormControl
												type="text"
												placeholder="Email Address"
												onChange={(e) => {
													let temp = [...partemail];
													temp[index + 1] = {
														...temp[index + 1],
														email: e.target.value,
													};
													setpartemailInfo(temp);
												}}
												className="required"
											/>
										</FormGroup>
										<div className="mb-3">
											<FormGroup className="w-100 me-4">
												<FormLabel>Resume</FormLabel>
												<DropFileUpload
													text=" Resume"
													multiple={false}
													uploadFiles={async (files, rejected) => {
														// const urls = await uploadFilesToCloud(
														// 	files,
														// 	"testing/"
														// );
														let temp = [...partemail];
														temp[index + 1] = {
															...temp[index + 1],
															resumeFile: files[0],
														};
														setpartemailInfo(temp);
													}}
												/>
											</FormGroup>
											{partemail[index + 1] &&
												partemail[index + 1].resumeFile && (
													<div>{partemail[index + 1].resumeFile.name}</div>
												)}
										</div>
									</div>
								);
							})}
							{length < maxSize && (
								<div
									className="text-primary"
									style={{
										cursor: "pointer",
									}}
									onClick={() => {
										setLength(length + 1);
									}}
								>
									Add Participant
								</div>
							)}
							<Button className="mt-4" type="submit">
								Register
							</Button>
						</Form>
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
}

HackRegister.getLayout = (page) => {
	return page;
};

export default HackRegister;
