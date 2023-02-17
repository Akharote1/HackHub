import { Badge, Table } from "react-bootstrap";

function RegistrationTable() {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <TeamDataItem />
            </td>
            <td>
              <Badge>Shortlisted</Badge>
            </td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

function TeamDataItem() {
  return (
    <div className="d-flex align-items-center">
      <img 
        className=" rounded-circle me-3"
        style={{width: 36, height: 36}}
        src="https://via.placeholder.com/128"
      />

      <div className="d-flex flex-column text-black-50" style={{fontSize: '14px'}}>
        <b className="text-black" style={{fontSize: '14px'}}>Code of Duty</b>
        <span>Aditya Kharote | aditya.kharote@spit.ac.in | +91 9819360165</span>
      </div>
    </div>
  )
}

export default RegistrationTable;