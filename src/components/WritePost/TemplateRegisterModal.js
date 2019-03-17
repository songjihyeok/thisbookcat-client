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
          <div  className="template-register-modal-header-left" onClick={onClick}>
            <div className="template-register-modal-header-left-icon" />
            <div className="template-register-modal-header-left-text">템플릿</div>
          </div>
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
                  onKeyPress={this.preventEnter}
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

  preventEnter(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
    }
  }
}

export default TemplateRegisterModal;
