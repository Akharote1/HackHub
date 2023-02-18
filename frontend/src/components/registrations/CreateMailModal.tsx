import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { createRef, useEffect, useState, useContext } from "react";
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import DropFileUpload from "../common/DropFileUpload";
import ReactImageGallery from "react-image-gallery";
import RemoveButton from "../common/RemoveButton";
import { uploadFilesToCloud } from "../../utils";
import LoadingButton from "../common/LoadingButton";
import { useUser } from "../../hooks/AuthContext";
import axiosClient from "../../services/axios-client";

function CreateMailModal({ show, onClose, slug }) {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [target, setTarget] = useState("registered");

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axiosClient.post('/hackathon/send-mail/' + slug, {
        subject,
        content,
        target
      })

      onClose(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !isLoading && content != "" && subject != ""

  return (
    <Modal size="lg" show={show}>
      <Modal.Header closeButton onHide={() => onClose(false)}>
        <Modal.Title>New Email Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group id="form-content" className="mb-4">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group id="form-content" className="mb-4">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Post content here..."
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group id="form-content" className="mb-4">
            <Form.Label>Target Audience</Form.Label>
            <Form.Select
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              {["registered","shortlisted", "not-shortlisted", "screening-submitted", "screening-not-submitted", "final-submitted", "final-not-submitted"]
              .map(x => (
                <option value={x} key={x}>{x}</option>
              ))}
              
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => onClose(false)} variant="neutral">
          Close
        </Button>

        <LoadingButton
          onClick={(e) => handleSubmit()}
          disabled={!canSubmit}
          loading={isLoading}
        >
          Create
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateMailModal;
