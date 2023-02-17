import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import RegistrationTable from "../../../components/registrations/RegistrationTable";

const Registrations = function () {
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
          >
            <FontAwesomeIcon icon={faDownload} className='me-3' />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <Card>
        <RegistrationTable />
      </Card>
    </div>
  )
}

export default Registrations;