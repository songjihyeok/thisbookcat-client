import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateFirstModal extends Component {
  render() {
    const { selectedImg, onConfirm } = this.props;
    return (
      <Modal show container={this} aria-labelledby="contained-modal-title">
        <Modal.Header>
          <Modal.Title id="contained-modal-title">템플릿 고르기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="template-first-modal-body-container">
            {FAKEDATA.map(({ id, img }) =>
              <div className="template-first-modal-card" key={id}>
                <img 
                  className={selectedImg === id ? "template-first-modal-selected-img" : "template-first-modal-img"}
                  src={img} alt="card-img" 
                  onClick={() => this.handleSelectImage(id)}
                />
              </div>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            bsStyle="success" 
            disabled={!selectedImg}
            onClick={onConfirm}
          >
            선택완료
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleSelectImage(id) {
    const {
      onSelect
    } = this.props;
    onSelect(id);
  }
}

export default TemplateFirstModal;
