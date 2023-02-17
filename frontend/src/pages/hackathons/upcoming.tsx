import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import hackathonDummyData from "../../../data/hackathonDummyData.json";
import moment from "moment";
import { useRouter } from "next/router";
import HackathonCard from "../../components/common/HackathonCard";

function Upcoming() {
	const { hackathons } = hackathonDummyData;
	const router = useRouter();
	const [upcomingHackathons, setUpcomingHackathons] = useState([]);
	const seggregateHackathons = () => {
		const upcomingHackathonsTemp = [];

		hackathons.forEach((hackathon) => {
			const { event_start, event_end, registration_start, registration_end } =
				hackathon;
			console.log(event_start, event_end, registration_start, registration_end);
			const today = moment().format("YYYY-MM-DD");
			if (moment(today).isBefore(registration_start)) {
				upcomingHackathonsTemp.push(hackathon);
			}
		});
		setUpcomingHackathons(upcomingHackathonsTemp);
	};

	useEffect(() => {
		seggregateHackathons();
	}, []);

	return (
		<div
			className=""
			style={{
				minHeight: "100vh",
				minWidth: "100vw",
			}}
		>
			<Navbar />
			<div className="d-flex flex-column h-100 w-100">
				<div
					className="bg-primary w-100"
					style={{
						height: "300px",
						padding: "50px 100px",
					}}
				>
					<div
						className="bg-white text-primary"
						style={{
							height: "50px",
							width: "220px",
							backgroundColor: "white",
							borderRadius: "10px",
							padding: "10px 20px",
							opacity: "0.8",
							cursor: "pointer",
						}}
						onClick={() => router.push("/")}
					>
						&lt; Back to all hackathons
					</div>
					<div
						className="mt-3"
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							color: "white",
						}}
					>
						Upcoming Hackathons
					</div>
				</div>
			</div>
			<div
				className="d-flex flex-wrap justify-content-between mt-5 w-100"
				style={{
					padding: "80px 200px",
				}}
			>
				{upcomingHackathons.length > 0 ? (
					upcomingHackathons.map((hackathon, index) => (
						<HackathonCard key={index} hackathon={hackathon} />
					))
				) : (
					<div>No Upcoming hackathons Available</div>
				)}
			</div>
		</div>
	);
}

Upcoming.getLayout = (page) => {
	return <>{page}</>;
};

export default Upcoming;
