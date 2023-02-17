import React from "react";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Button } from "react-bootstrap";

function HackathonCard({ hackathon }) {
	return (
		<div
			className="bg-white mb-5"
			style={{
				height: "300px",
				width: "530px",
				boxShadow: "0px 4px 8px #040f3c4c",
				borderRadius: "10px",
				padding: "20px",
			}}
		>
			<h2>{hackathon.name}</h2>
			<div
				className=""
				style={{
					color: "#8e989c",
				}}
			>
				Hackathon
			</div>
			<div className="mt-5 d-flex align-items-center">
				<FontAwesomeIcon
					icon={faLocationDot}
					style={{
						width: "40px",
						height: "40px",
					}}
					className="text-primary"
				/>
				{
					<div
						className="text-primary"
						style={{
							fontSize: "20px",
							marginLeft: "10px",
						}}
					>
						{hackathon.venue}
					</div>
				}
			</div>
			<div className="d-flex justify-content-between w-100 mt-5">
				<div className="d-flex ">
					<div
						className="me-3"
						style={{
							backgroundColor: "#f5f5f5",
							padding: "5px 10px",
							borderRadius: "10px",
						}}
					>
						{hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)}
					</div>
					<div
						className="me-3"
						style={{
							backgroundColor: "#f5f5f5",
							padding: "5px 10px",
							borderRadius: "10px",
							fontWeight: "semi-bold",
						}}
					>
						Open
					</div>
					<div
						className="me-3"
						style={{
							backgroundColor: "#f5f5f5",
							padding: "5px 10px",
							borderRadius: "10px",
						}}
					>
						Starts {moment(hackathon.event_start).format("DD MMM YYYY")}
					</div>
				</div>
				<Button>Apply Now</Button>
			</div>
		</div>
	);
}

export default HackathonCard;
