import { Badge, Table } from "react-bootstrap";
import { getUserAvatar } from "../../utils";

function CommunicationTable({communications}) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Target</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <TeamDataItem team={team} />
              </td>
              <td>
                <Badge>Shortlisted</Badge>
              </td>
              <td>@mdo</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

function TeamDataItem({team}) {
  return (
    <div className="d-flex align-items-center">
      <img 
        className=" rounded-circle me-3"
        style={{width: 36, height: 36}}
        src={getUserAvatar(team.team_name)}
      />

      <div className="d-flex flex-column text-black-50" style={{fontSize: '14px'}}>
        <b className="text-black" style={{fontSize: '14px'}}>{team.team_name}</b>
        {team.members.map(member => (
          <span key={member._id}>
            {member.user_id.name} | {member.user_id.email}  | {member.user_id.phone} | {member.user_id.gender}  
          </span>
        ))}
      </div>
    </div>
  )
}

export default RegistrationTable;