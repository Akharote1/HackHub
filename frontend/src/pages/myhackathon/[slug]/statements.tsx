import DashboardLayout from "../../../components/common/DashboardLayout";
import { useState, useEffect } from "react";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";
import { Accordion, Badge, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const Statements = function () {
  const [statements, setStatements] = useState(null);
  const [statementsEdit, setStatementsEdit] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/ps/'+router.query.slug);
        setStatements(res.data.statements)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])
  
  if (!statements) return null;

  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Problem Statements</h2>

        {!isEditing && (
          <Button className="btn-sm ms-4"
            onClick={() => {
              setEditing(true)
              setStatementsEdit(statements)
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </Button>
        )}

        {isEditing && (
          <Button className="btn-sm ms-4"
            onClick={async () => {
              setEditing(false)
              setStatements(statementsEdit)
              await axiosClient.post('/hackathon/ps-update/'+router.query.slug, {
                statements: statementsEdit
              });
            }}
          >
            <FontAwesomeIcon icon={faSave} />
            Save
          </Button>
        )}

        {isEditing && (
          <Button className="btn-sm ms-2" variant="outline-primary"
            onClick={async () => {
              setStatementsEdit([...statementsEdit, {
                title: '',
                description: '',
                domains: []
              }])
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
            Add
          </Button>
        )}

        {isEditing && (
          <Button className="btn-sm ms-2" variant="outline-primary"
            onClick={async () => {
              setEditing(false)
            }}
          >
            Cancel
          </Button>
        )}
      </div>

      <div>
        {!isEditing && (
          <Accordion>
            {statements.map((ps, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>PS {index + 1}: {ps.title} (Limit: {ps.allot_limit})
                  {ps.domains.map(dm => (<Badge className="ms-2" pill key={dm}>{dm}</Badge>))}
                </Accordion.Header>
                <Accordion.Body>
                  {ps.description}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}

        {isEditing && (
          statementsEdit.map((ps, index) => (
            <Card key={index} className="p-4 mb-3" style={{maxWidth: '768px'}}>

              <Form.Label className="fw-semibold">PS {index + 1} Title</Form.Label>
              <Form.Control type="text" 
                value={ps.title}
                onChange={ev => {
                  const newStatements = [...statementsEdit];
                  newStatements[index].title = ev.target.value;
                  setStatementsEdit(newStatements)
                }}
              />

              <Form.Label className="fw-semibold mt-3">PS {index + 1} Description</Form.Label>
              <Form.Control type="textarea" 
                value={ps.description}
                as="textarea" rows={4}
                onChange={ev => {
                  const newStatements = [...statementsEdit];
                  newStatements[index].description = ev.target.value;
                  setStatementsEdit(newStatements)
                }}
              />

            <Form.Label className="fw-semibold mt-3">PS {index + 1} Allotment Limit (-1 for no limit)</Form.Label>
              <Form.Control type="number" 
                value={ps.allot_limit}
                onChange={ev => {
                  const newStatements = [...statementsEdit];
                  newStatements[index].allot_limit = ev.target.value;
                  setStatementsEdit(newStatements)
                }}
              />
              
              <div className="d-flex mt-3">
                <Button variant="outline-danger" className="ms-auto"
                  onClick={() => {
                    setStatementsEdit(statementsEdit.filter(s => s != ps))
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

Statements.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Statements;