import { useState, useEffect } from "react";
import {
	Form,
	FormCheck,
	FormControl,
	FormGroup,
	FormLabel,
	FormSelect,
} from "react-bootstrap";
import DropFileUpload from "../components/common/DropFileUpload";
import { uploadFilesToCloud } from "../utils";
import organization from "../../data/organization.json";
import { Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axiosClient from "../services/axios-client";

function Create() {
	const [hackathonInfo, setHackathonInfo] = useState({
		name: "",
		poster_image: "",
		header_image: "",
		venue: "",
		mode: "",
		domain: new Set(),
		description: "",
		event_date: "",
		registration_start: "",
		registration_end: "",
		min_team_size: "",
		max_team_size: "",
		resumeRequired: false,
		screening: false,
		screeningData: {
			start_date: "",
			end_date: "",
			resume_required: false,
			abstract_required: false,
			abstract_limit_start: "",
			abstract_limit_end: "",
			presentation_required: false,
		},
		submissionGuidelines: "",
		abstractRequired: false,
		abstractMinLength: "",
		abstractMaxLength: "",
		presentationRequired: false,
	});

	const [posterImage, setPosterImage] = useState();
	const [headerImage, setHeaderImage] = useState();

	const [mode, setMode] = useState("online");
	const { domains } = organization;

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(posterImage, headerImage);
		if (posterImage != null && headerImage != null) {
			const posterImageLink = await uploadFilesToCloud(
				[posterImage],
				"poster_images/"
			);
			const headerImageLink = await uploadFilesToCloud(
				[headerImage],
				"header_images/"
			);
			setHackathonInfo({
				...hackathonInfo,
				poster_image: posterImageLink[0],
				header_image: headerImageLink[0],
			});
		}

		console.log(hackathonInfo);
	};

	// useEffect(() => {
	// 	console.log(hackathonInfo);
	// }, [hackathonInfo]);

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
				<h2 className="">Organize a hackathon</h2>
				<Form
					className="w-75"
					onSubmit={(e) => {
						onSubmit(e);
					}}
				>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Name</FormLabel>
						<FormControl
							type="text"
							placeholder="Hackathon Name"
							onChange={(e) => {
								setHackathonInfo({
									...hackathonInfo,
									name: e.target.value,
								});
							}}
							value={hackathonInfo.name}
						/>
					</FormGroup>
					<div className="d-flex">
						<FormGroup className="w-50 mb-3 me-4">
							<FormLabel>Poster Image</FormLabel>
							<DropFileUpload
								height={"50px"}
								text=" Poster Image"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									setPosterImage(files[0]);
								}}
							/>
						</FormGroup>
						<FormGroup className="w-50 mb-3">
							<FormLabel>Header Image</FormLabel>
							<DropFileUpload
								height={"50px"}
								text=" Header Image"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									setHeaderImage(files[0]);
								}}
							/>
						</FormGroup>
					</div>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Location</FormLabel>
						<FormControl
							type="text"
							placeholder="Location of Hackathon"
							onChange={(e) => {
								setHackathonInfo({
									...hackathonInfo,
									venue: e.target.value,
								});
							}}
							value={hackathonInfo.venue}
						/>
					</FormGroup>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Mode</FormLabel>
						<div className="d-flex">
							<div
								className="px-3 rounded-2 me-3 text-center"
								onClick={() => setMode("online")}
								style={{
									height: "35px",
									width: "100px",
									fontSize: "20px",
									backgroundColor: mode === "online" ? "#0d6efd" : "white",
									color: mode === "online" ? "white" : "#0d6efd",
									border: mode === "online" ? "none" : "1px solid #0d6efd",
									cursor: "pointer",
								}}
							>
								Online
							</div>
							<div
								className="px-3 rounded-2 "
								onClick={() => setMode("offline")}
								style={{
									height: "35px",
									width: "100px",
									fontSize: "20px",
									backgroundColor: mode === "offline" ? "#0d6efd" : "white",
									color: mode === "offline" ? "white" : "#0d6efd",
									border: mode === "offline" ? "none" : "1px solid #0d6efd",
									cursor: "pointer",
								}}
							>
								Offline
							</div>
						</div>
					</FormGroup>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Domain</FormLabel>
						<div className="d-flex flex-wrap">
							{domains.map((domain, index) => (
								<Badge
									pill
									style={{
										// backgroundColor: hackathonInfo.domain.has(domain.id)
										// 	? "#FFF"
										// 	: "#FFF",
										cursor: "pointer",
										fontSize: "15px",
										border: "1px solid #0d6efd",
										color: hackathonInfo.domain.has(domain.id)
											? "white"
											: "#0d6efd",
									}}
									className="me-2 mb-2 px-3"
									bg={`${
										hackathonInfo.domain.has(domain.id) ? "primary" : "light"
									}`}
									key={index}
									onClick={() => {
										const newDomain = new Set(hackathonInfo.domain);
										if (hackathonInfo.domain.has(domain.id)) {
											newDomain.delete(domain.id);
										} else {
											newDomain.add(domain.id);
										}
										setHackathonInfo({
											...hackathonInfo,
											domain: newDomain,
										});
									}}
								>
									{/* {hackathonInfo.domain.has(domain.id)} */}
									{domain.label}
								</Badge>
							))}
						</div>
					</FormGroup>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Description</FormLabel>
						<FormControl
							as="textarea"
							rows={3}
							placeholder="Description of Hackathon"
							onChange={(e) => {
								setHackathonInfo({
									...hackathonInfo,
									description: e.target.value,
								});
							}}
						/>
					</FormGroup>
					<div className="d-flex justify-content-between">
						<FormGroup className="w-50 mb-3 me-5">
							<FormLabel>Event Start Date</FormLabel>
							<FormControl
								type="datetime-local"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										event_date: e.target.value,
									});
								}}
							/>
						</FormGroup>
						<FormGroup className="w-50 mb-3">
							{/* <FormLabel>Event End Date</FormLabel>
							<FormControl
								type="datetime-local"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										endDate: e.target.value,
									});
								}}
							/> */}
						</FormGroup>
					</div>
					<div className="d-flex justify-content-between">
						<FormGroup className="w-50 mb-3 me-5">
							<FormLabel>Registration Start Date</FormLabel>
							<FormControl
								type="datetime-local"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										registration_start: e.target.value,
									});
								}}
							/>
						</FormGroup>
						<FormGroup className="w-50 mb-3">
							<FormLabel>Registration End Date</FormLabel>
							<FormControl
								type="datetime-local"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										registration_end: e.target.value,
									});
								}}
							/>
						</FormGroup>
					</div>
					<div className="d-flex">
						<FormGroup className="w-50 mb-3 me-5">
							<FormLabel>Min Team Size</FormLabel>
							<FormControl
								type="number"
								placeholder="Team Size"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										min_team_size: e.target.value,
									});
								}}
							/>
						</FormGroup>
						<FormGroup className="w-50 mb-3">
							<FormLabel>Max Team Size</FormLabel>
							<FormControl
								type="number"
								placeholder="Team Size"
								onChange={(e) => {
									setHackathonInfo({
										...hackathonInfo,
										max_team_size: e.target.value,
									});
								}}
							/>
						</FormGroup>
					</div>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Is Resume of participant Required</FormLabel>
						<div>
							<FormCheck
								inline
								type="radio"
								label="Yes"
								name="resume"
								id="inline-radio-1"
								onClick={() =>
									setHackathonInfo({ ...hackathonInfo, resumeRequired: true })
								}
							></FormCheck>
							<FormCheck
								inline
								type="radio"
								label="No"
								name="resume"
								id="inline-radio-2"
								onClick={() =>
									setHackathonInfo({ ...hackathonInfo, resumeRequired: false })
								}
							></FormCheck>
						</div>
					</FormGroup>
					<FormGroup className="w-100 mb-3">
						<FormLabel>Is there a Screening Round</FormLabel>
						<div>
							<FormCheck
								inline
								type="radio"
								label="Yes"
								name="screening"
								id="inline-radio-1"
								onClick={() =>
									setHackathonInfo({ ...hackathonInfo, screening: true })
								}
							></FormCheck>
							<FormCheck
								inline
								type="radio"
								label="No"
								name="screening"
								id="inline-radio-2"
								onClick={() =>
									setHackathonInfo({ ...hackathonInfo, screening: false })
								}
							></FormCheck>
						</div>
					</FormGroup>
					{hackathonInfo.screening && (
						<div>
							<div className="d-flex">
								<FormGroup className="w-50 mb-3 me-5 ">
									<FormLabel>Screening Round Start Date</FormLabel>
									<FormControl
										type="datetime-local"
										onChange={(e) => {
											setHackathonInfo({
												...hackathonInfo,
												screeningData: {
													...hackathonInfo.screeningData,
													start_date: e.target.value,
												},
											});
										}}
									/>
								</FormGroup>
								<FormGroup className="w-50 mb-3">
									<FormLabel>Screening Round End Date</FormLabel>
									<FormControl
										type="datetime-local"
										onChange={(e) => {
											setHackathonInfo({
												...hackathonInfo,
												screeningData: {
													...hackathonInfo.screeningData,
													end_date: e.target.value,
												},
											});
										}}
									/>
								</FormGroup>
							</div>
							<FormGroup className="w-100 mb-3">
								<FormLabel>Submission Guidelines</FormLabel>
								<FormControl
									as="textarea"
									rows={3}
									onChange={(e) => {
										setHackathonInfo({
											...hackathonInfo,
											submissionGuidelines: e.target.value,
										});
									}}
									placeholder="Submission Guidelines for screening round of Hackathon"
								/>
							</FormGroup>
							<div className="w-100 mb-3">
								<FormLabel>Is Abstract Required</FormLabel>
								<div>
									<FormCheck
										inline
										type="radio"
										label="Yes"
										name="abstract"
										id="inline-radio-1"
										onClick={() =>
											setHackathonInfo({
												...hackathonInfo,
												abstractRequired: true,
											})
										}
									></FormCheck>
									<FormCheck
										inline
										type="radio"
										label="No"
										name="abstract"
										id="inline-radio-2"
										onClick={() =>
											setHackathonInfo({
												...hackathonInfo,
												abstractRequired: false,
											})
										}
									></FormCheck>
								</div>
							</div>
							{hackathonInfo.abstractRequired && (
								<div className="d-flex">
									<FormGroup className="w-50 mb-3 me-5">
										<FormLabel>Min Abstract Word Length</FormLabel>
										<FormControl
											type="number"
											onChange={(e) => {
												setHackathonInfo({
													...hackathonInfo,
													abstractMinLength: e.target.value,
												});
											}}
											placeholder="Min Length"
										/>
									</FormGroup>
									<FormGroup className="w-50 mb-3">
										<FormLabel>Min Abstract Word Length</FormLabel>
										<FormControl
											type="number"
											placeholder="Min Length"
											onChange={(e) => {
												setHackathonInfo({
													...hackathonInfo,
													abstractMaxLength: e.target.value,
												});
											}}
										/>
									</FormGroup>
								</div>
							)}
							<div className="w-100 mb-3">
								<FormLabel>Is Presentation Required</FormLabel>
								<div>
									<FormCheck
										inline
										type="radio"
										label="Yes"
										name="presentation"
										id="inline-radio-1"
										onClick={() =>
											setHackathonInfo({
												...hackathonInfo,
												presentationRequired: true,
											})
										}
									></FormCheck>
									<FormCheck
										inline
										type="radio"
										label="No"
										name="presentation"
										id="inline-radio-2"
										onClick={() =>
											setHackathonInfo({
												...hackathonInfo,
												presentationRequired: false,
											})
										}
									></FormCheck>
								</div>
							</div>
						</div>
					)}
					<Button type="submit" className="w-25">
						Create a Hackathon
					</Button>
				</Form>
			</div>
		</div>
	);
}

Create.getLayout = (page) => {
	return page;
};

export default Create;
