import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import DashboardLayout from "../../../components/common/DashboardLayout";
import RegistrationTable from "../../../components/registrations/RegistrationTable";
import { useState, useEffect } from "react";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";
import * as XLSX from "xlsx";

const Registrations = function () {
  const [registrations, setRegistrations] = useState(null);
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/registrations/'+router.query.slug);
        setRegistrations(res.data.registrations)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])
  
  if (!registrations) return null;

  const downloadSheet = () => {
    const rows = [];

    for (let i = 0; i < registrations.length; i++) {
      for (let j = 0; j < registrations[i].members.length; j++) {
        const member = registrations[i].members[j];
        const item = {
          "Team No.": (i + 1).toString(),
          "Team Name": registrations[i].team_name,
          "Member No.": (j + 1).toString(),
          "Name": member.user_id.name,
          "Email": member.user_id.email,
          "Phone": member.user_id.phone,
          "Gender": member.user_id.gender,
          "Resume Link": member.resume,
        }
        rows.push(item)
      }
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // const max_width1 = rows.reduce((w, r) => Math.max(w, r['Sr No.'].length), 10);
    // const max_width2 = rows.reduce((w, r) => Math.max(w, r.Name.length), 10);
    // const max_width3 = rows.reduce((w, r) => Math.max(w, r.Description.length), 10);
    // const max_width4 = rows.reduce((w, r) => Math.max(w, r.Amount.length), 10);
    // worksheet["!cols"] = [max_width1, max_width2, max_width3, max_width4].map(w => ({ wch: w }));
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "hackathon_registrations.xlsx");
  }

  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Registrations</h2>
      </div>

      <div className="d-flex w-100">
        <InputGroup
          className="mb-3"
        >
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          
          <Form.Control 
            type='text'
            placeholder='Search Items'
            // onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: '768px' }}
          />
        </InputGroup>

        <div className='ms-3'>
          <Button
            className='btn-md d-flex align-items-center'
            variant='success'
            onClick={downloadSheet}
          >
            <FontAwesomeIcon icon={faDownload} className='me-3' />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <Card>
        <RegistrationTable registrations={registrations} />
      </Card>
    </div>
  )
}

Registrations.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);

export default Registrations;