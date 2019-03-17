import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateRegisterModal extends Component {
  render() {
    const {
      text,
      selectedImg,
      onChange,
      onUpload,
      onClick
    } = this.props;
    const foundImage = !selectedImg ? null : FAKEDATA.find((e) => selectedImg === e.id).img;
    const backgroundImage = require(`./images/${foundImage}`);
    return (
      <Modal show container={this} aria-labelledby="contained-modal-title">
        <Modal.Header className="template-register-modal-header-container">
          <Modal.Title id="contained-modal-title" className="template-register-modal-header-title">사진 등록</Modal.Title>
          <div className="template-register-modal-header-icon" onClick={onClick}>템플릿</div>
        </Modal.Header>
        <Modal.Body>
          <div className="template-register-modal-body-container">
            {selectedImg ?
              <>
                <img className="template-register-modal-img" src={backgroundImage} alt="bg"/>
                <textarea
                  className="template-register-modal-textarea" 
                  value={text}
                  onChange={onChange}
                  onKeyDown={this.handleKeyDown}
                />
              </>
                :
              <div className="template-register-modal-default">
                <span className="template-register-modal-default-text">이책반냥</span>
              </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            bsStyle="success" 
            disabled={!(selectedImg && text)}
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

  handleKeyDown(e) {
    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
    // e.target.style.paddingTop = `${Math.max(0, (height * 0.5)) - 100}px`;
  }
}

export default TemplateRegisterModal;
