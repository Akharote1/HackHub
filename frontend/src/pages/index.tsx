import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import DropFileUpload from "../components/common/DropFileUpload";
import FontSizeControls from "../components/common/FontSizeControls";
import axiosClient from "../services/axios-client";
import { uploadFilesToCloud } from "../utils";
import NavBar from "../components/common/NavBar";
import hackathonDummyData from "../../data/hackathonDummyData.json";
import moment from "moment";
import { Button } from "react-bootstrap";
import HackathonCard from "../components/common/HackathonCard";
import { useRouter } from "next/router";
import { useUser } from "../hooks/AuthContext";

export default function Home() {
	const [hackathons, setHackathons] = useState(null);
	const [hackathonData, setHackathonData] = useState({
		open: [],
		closed: [],
		upcoming: [],
	});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/list');
        setHackathons(res.data)
				setTimeout(() => seggregateHackathons(res.data), 500)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  

	const seggregateHackathons = (hackathons) => {
		let openHackathons = [];
		let closedHackathons = [];
		let upcomingHackathons = [];

		hackathons.forEach((hackathon) => {
			const { event_date: event_start, registration_start, registration_end } =
				hackathon;
			console.log(event_start, registration_start, registration_end);
			const today = moment().format("YYYY-MM-DD");
			console.log(moment("2023-02-17").isBetween("2023-02-16", "2023-02-18"));
			if (moment(today).isBetween(registration_start, registration_end)) {
				console.log("here");
				openHackathons.push(hackathon);
			} else if (moment(today).isAfter(registration_end)) {
				closedHackathons.push(hackathon);
			} else if (moment(today).isBefore(registration_start)) {
				upcomingHackathons.push(hackathon);
			}
		});
		openHackathons = openHackathons.slice(0, 4);
		closedHackathons = closedHackathons.slice(0, 4);
		upcomingHackathons = upcomingHackathons.slice(0, 4);
		setHackathonData({
			open: openHackathons,
			closed: closedHackathons,
			upcoming: upcomingHackathons,
		});
	};

  if (!hackathons) return null;

	return (
		<div
			className="d-flex flex-column h-100 w-100"
			style={{
				padding: "80px 200px",
			}}
		>
			<h1>Hackathons</h1>
			<div className="d-flex flex-column w-100 mt-4">
				<div className="w-100">
					<div className="d-flex justify-content-between w-100">
						<h2>Open</h2>
						<Button
							onClick={() => {
								router.push("/hackathons/open");
							}}
						>
							View All
						</Button>
					</div>
					<div className="d-flex flex-wrap justify-content-between mt-5 w-100">
						{hackathonData.open.length > 0 ? (
							hackathonData.open.map((hackathon, index) => (
								<HackathonCard key={index} hackathon={hackathon} />
							))
						) : (
							<div>No Open Hackathons Available</div>
						)}
					</div>
				</div>
				<div className="w-100">
					<div className="d-flex justify-content-between w-100">
						<h2>Upcoming</h2>
						<Button
							onClick={() => {
								router.push("/hackathons/upcoming");
							}}
						>
							View All
						</Button>
					</div>
					<div className="d-flex flex-wrap justify-content-between mt-5 w-100">
						{hackathonData.upcoming.length > 0 ? (
							hackathonData.upcoming.map((hackathon, index) => (
								<HackathonCard key={index} hackathon={hackathon} />
							))
						) : (
							<div>No Upcoming Hackathons Available</div>
						)}
					</div>
				</div>
				<div className="w-100">
					<div className="d-flex justify-content-between w-100">
						<h2>Closed</h2>
						<Button
							onClick={() => {
								router.push("/hackathons/closed");
							}}
						>
							View All
						</Button>
					</div>
					<div className="d-flex flex-wrap justify-content-between mt-5 w-100">
						{hackathonData.closed.length > 0 ? (
							hackathonData.closed.map((hackathon, index) => (
								<HackathonCard key={index} hackathon={hackathon} />
							))
						) : (
							<h5>No closed Hackathons Available</h5>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
