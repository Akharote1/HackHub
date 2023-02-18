import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import DashboardLayout from "../../../components/common/DashboardLayout";
import RegistrationTable from "../../../components/registrations/RegistrationTable";
import { useState, useEffect } from "react";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";
import { axiosDjangoClient } from "../../../services/axios-client";
import * as XLSX from "xlsx";

const Registrations = function () {
	const [registrations, setRegistrations] = useState(null);
	const { user } = useUser();
	const router = useRouter();

	const filters = [
		"all",
		"screening-submitted",
		"shortlisted",
		"ps-filled",
		"submitted",
	];
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (!user || !router.isReady) return;
		const fetchData = async () => {
			try {
				const res = await axiosClient.get(
					"/hackathon/registrations/" + router.query.slug
				);
				setRegistrations(res.data.registrations);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [user]);

	if (registrations == null) return null;

	const downloadSheet = () => {
		const rows = [];

		for (let i = 0; i < registrations.length; i++) {
			for (let j = 0; j < registrations[i].members.length; j++) {
				const member = registrations[i].members[j];
				const item = {
					"Team No.": (i + 1).toString(),
					"Team Name": registrations[i].team_name,
					"Member No.": (j + 1).toString(),
					Name: member.user_id.name,
					Email: member.user_id.email,
					Phone: member.user_id.phone,
					Gender: member.user_id.gender,
					"Resume Link": member.resume,
				};
				rows.push(item);
			}
		}

		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(rows);

		XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
		XLSX.writeFile(workbook, "hackathon_registrations.xlsx");
	};

	const filteredResults = registrations.filter((reg) => {
		if (selectedFilter == "all" && searchQuery.trim() == "") return true;
		if (selectedFilter == "shortlisted" && !reg.shortlisted) return false;
		if (selectedFilter == "screening-submitted" && !reg.screening_submitted)
			return false;

		const q = searchQuery.trim().toLowerCase();

		if (q == "") return true;
		if (reg.team_name.toLowerCase().includes(q)) return true;
		if (reg.members[0].user_id.name.toLowerCase().includes(q)) return true;

		return false;
	});

	return (
		<div className="p-5">
			<div className="d-flex align-items-center mb-3">
				<h2>Registrations</h2>
			</div>

			<div className="d-flex w-100">
				<InputGroup className="mb-3">
					<InputGroup.Text>
						<FontAwesomeIcon icon={faSearch} />
					</InputGroup.Text>

					<Form.Control
						type="text"
						placeholder="Search Items"
						onChange={(e) => setSearchQuery(e.target.value)}
						value={searchQuery}
						style={{ maxWidth: "768px" }}
					/>
				</InputGroup>

				<Form.Select
					className="mb-3 ms-4"
					value={selectedFilter}
					onChange={(e) => setSelectedFilter(e.target.value)}
				>
					{filters.map((filter) => (
						<option key={filter} value={filter}>
							{filter}
						</option>
					))}
				</Form.Select>
			</div>

			<div>
				<Button
					className="btn-md d-flex align-items-center"
					variant="success"
					onClick={downloadSheet}
				>
					<FontAwesomeIcon icon={faDownload} className="me-3" />
					<span>Download</span>
				</Button>
			</div>

			<Card className="mt-4">
				<RegistrationTable
					registrations={filteredResults}
					refresh={async () => {
						const res = await axiosClient.get(
							"/hackathon/registrations/" + router.query.slug
						);
						setRegistrations(res.data.registrations);
					}}
				/>
			</Card>
		</div>
	);
};

Registrations.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Registrations;
