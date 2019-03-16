import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateSecondModal extends Component {
  render() {
    const {
      text,
      selectedImg,
      onChange,
      onUpload
    } = this.props;
    const backgroundImage = FAKEDATA.find((e) => selectedImg === e.id).img;
    return (
      <Modal show container={this} aria-labelledby="contained-modal-title">
        <Modal.Header>
          <Modal.Title id="contained-modal-title">사진 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="template-second-modal-body-container">
            <img className="template-second-modal-img" src={backgroundImage} alt="bg"/>
            <textarea
              className="template-second-modal-textarea" 
              value={text}
              onChange={onChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            bsStyle="success" 
            disabled={false}
            onClick={onUpload}
          >
            등록
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleSelectImage(id) {
    const { onSelect } = this.props;
    onSelect(id);
  }
}

export default TemplateSecondModal;
