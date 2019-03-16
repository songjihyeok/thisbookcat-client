import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateSecondModal extends Component {
  render() {
    const { selectedImg, onConfirm } = this.props;
    return (
      <Modal 
        container={this} 
        dialogClassName="template-second-modal"
        aria-labelledby="contained-modal-title" 
        show
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title">템플릿 고르기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="template-second-modal-body-container">
            {FAKEDATA.map(({ id, img }) =>
              <div className="template-second-modal-card" key={id}>
                <img 
                  className={selectedImg === id ? "template-second-modal-selected-img" : "template-second-modal-img"}
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

export default TemplateSecondModal;
