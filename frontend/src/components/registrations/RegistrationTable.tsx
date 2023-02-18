import { Badge, Button, Table } from "react-bootstrap";
import { getUserAvatar } from "../../utils";
import { useEffect, useState } from "react";
import TeamDetailsModal from "./TeamDetailsModal";

function RegistrationTable({ registrations, refresh = null }) {
	const [teamModalVisible, setTeamModalVisible] = useState(false);
	const [teamData, setTeamData] = useState(null);

	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Team Name</th>
						<th>Score</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{registrations.map((team, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>
								<TeamDataItem team={team} />
							</td>
							<td>
								{team.scores.technical_knowledge +
									team.scores.idea +
									team.scores.practicality +
									team.scores.feasibility}
								/40
							</td>
							<td>
								{!team.screening_submitted && !team.shortlisted && (
									<Badge bg="danger">Not Submitted</Badge>
								)}
								{team.screening_submitted && !team.shortlisted && (
									<Badge bg="warning">Not Submitted</Badge>
								)}
								{team.shortlisted && <Badge bg="success">Shortlisted</Badge>}
							</td>
							<td>
								<Button
									onClick={() => {
										setTeamData(team);
										setTeamModalVisible(true);
									}}
								>
									View
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{teamData && (
				<TeamDetailsModal
					show={teamModalVisible}
					team={teamData}
					onClose={(success) => {
						setTeamModalVisible(false);
						if (refresh) refresh();
					}}
				/>
			)}
		</div>
	);
}

function TeamDataItem({ team }) {
	return (
		<div className="d-flex align-items-center">
			<img
				className=" rounded-circle me-3"
				style={{ width: 36, height: 36 }}
				src={getUserAvatar(team.team_name)}
			/>

			<div
				className="d-flex flex-column text-black-50"
				style={{ fontSize: "14px" }}
			>
				<b className="text-black" style={{ fontSize: "14px" }}>
					{team.team_name}
				</b>
				{team.members.map((member) => (
					<span key={member._id}>
						{member.user_id.name} | {member.user_id.email} |{" "}
						{member.user_id.phone} | {member.user_id.gender}
					</span>
				))}
			</div>
		</div>
	);
}

export default RegistrationTable;
