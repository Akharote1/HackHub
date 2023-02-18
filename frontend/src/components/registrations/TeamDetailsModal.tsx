import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { createRef, useEffect, useState, useContext } from "react";
import { Button, Form, Modal, Table, Row, Col, Card, Alert } from "react-bootstrap";
import DropFileUpload from "../common/DropFileUpload";
import ReactImageGallery from "react-image-gallery";
import RemoveButton from "../common/RemoveButton";
import { uploadFilesToCloud } from "../../utils";
import LoadingButton from "../common/LoadingButton";
import { useUser } from "../../hooks/AuthContext";
import axiosClient from "../../services/axios-client";

function TeamDetailsModal({ show, onClose, team }) {
  const [scores, setScores] = useState({
    'technical_knowledge': 0,
    'idea': 0,
    'practicality': 0,
    'feasibility': 0
  })
  
  useEffect(() => {
    setScores({
      'technical_knowledge': team.scores.technical_knowledge,
      'idea': team.scores.idea,
      'practicality': team.scores.practicality,
      'feasibility': team.scores.feasibility
    })
  }, [team])

  if (!team) return;

  return (
    <Modal size="xl" show={show}>
      <Modal.Header closeButton onHide={() => onClose(false)}>
        <Modal.Title>Team &quot;{team.team_name}&quot;</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>Links</th>
              <th>Resume Score</th>
            </tr>
          </thead>
          <tbody>
            {team.members.map((mem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{mem.user_id.name}</td>
                <td>{mem.user_id.email}</td>
                <td>{mem.user_id.phone}</td>
                <td>{mem.user_id.college}</td>
                <td>
                  <a target="_blank" href={mem.resume} rel="noreferrer">View Resume</a>
                </td>
                <td>128/160</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {!team.screening_submitted && (
          <Alert className="p-3" variant="warning">
            Screening round not submitted
          </Alert>
        )}

        {team.screening_submitted && team.abstract_text && (
          <Card className="p-3">
            <div className="fw-bold mb-3">Abstract Submission</div>
            <p>
              {team.abstract_text}
            </p>

            <span>
              <b className="me-1">Plagiarism Score:</b>8%
            </span>
          </Card>
        )}

        {team.screening_submitted && team.presentation_link && (
          <Card className="p-3">
            <div className="fw-bold mb-3">Presentation Link</div>
            <a href={team.presentation_link} target="_blank" rel="noreferrer">
              View Presentation
            </a>
          </Card>
        )}

        {team.shortlisted && (
          <Card className="p-3">
            <div className="fw-bold mb-3">Problem Statements</div>
            <span>Preference Order:&nbsp;
              {team.ps_preferences
                ? team.ps_preferences.map(x => 'PS ' + (x + 1)).join(', ')
                : 'Not filled'
              }</span>

            <span>Alloted Problem Statement:&nbsp;
              {team.ps_allotment
                ? `PS ${team.ps_allotment.number} - ${team.ps_allotment.title}`
                : 'Not alloted'
              }</span>
          </Card>
        )}

        <Table size="sm">
          <thead>
            <tr>
              {Object.keys(scores).map(key => (
                <th key={key}>{key} (10)</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(scores).map(key => (
                <td key={key}>
                  <Form.Control 
                    value={scores[key]}
                    type="number"
                    disabled={team.shortlisted}
                    onChange={(e) => {
                      setScores({
                        ...scores,
                        [key]: Number(e.target.value)
                      })
                    }}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        
      </Modal.Body>

      <Modal.Footer>
        {!team.shortlisted && (
          <Button variant="success" onClick={async () => {
            const res = await axiosClient.post('/team/shortlist/' + team._id)
            onClose(true)
          }}>
            Shortlist
          </Button>
        )}

        {team.shortlisted && (
          <Button variant="danger" onClick={async () => {
            const res = await axiosClient.post('/team/rollback/' + team._id)
            onClose(true)
          }}>
            Rollback
          </Button>
        )}

        <Button onClick={async () => {
            const res = await axiosClient.post('/team/update-scores/' + team._id, {
              scores: scores
            })
            onClose(true)
          }} variant="primary"
          disabled={team.shortlisted}
        >
          Save Scores
        </Button>

        <Button onClick={() => onClose(false)} variant="neutral">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TeamDetailsModal;