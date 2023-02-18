import { Badge, Table } from "react-bootstrap";
import { getUserAvatar } from "../../utils";
import moment from "moment"

function CommunicationTable({communications}) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Target</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((comm, index) => (
            <tr key={index}>
              <td>{moment(comm.date).format('HH:mm, DD/MM/YYYY')}</td>
              <td>
                {comm.subject}
              </td>
              <td>
                {comm.target} ({comm.target_size} people)
              </td>
              <td>{comm.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CommunicationTable;