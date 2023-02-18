import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { createRef, useEffect, useState, useContext } from "react";
import { Button, Form, Modal, Table, Row, Col, Badge } from "react-bootstrap";
import DropFileUpload from "../common/DropFileUpload";
import ReactImageGallery from "react-image-gallery";
import RemoveButton from "../common/RemoveButton";
import { uploadFilesToCloud } from "../../utils";
import LoadingButton from "../common/LoadingButton";
import { useUser } from "../../hooks/AuthContext";
import axiosClient from "../../services/axios-client";
import { Accordion } from "react-bootstrap";

function ViewPSModal({ show, onClose, statements }) {

  return (
    <Modal size="lg" show={show}>
      <Modal.Header closeButton onHide={() => onClose(false)}>
        <Modal.Title>Problem Statements</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => onClose(false)} variant="neutral">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPSModal;
