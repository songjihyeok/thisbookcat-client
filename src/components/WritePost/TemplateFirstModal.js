import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateFirstModal extends Component {
  render() {
    const {
      text,
      selectedImg,
      onChange,
      onUpload,
      onClick
    } = this.props;
    
    const backgroundImage = !selectedImg ? null : FAKEDATA.find((e) => selectedImg === e.id).img;
    return (
      <Modal show container={this} aria-labelledby="contained-modal-title" centered={true}>
        <Modal.Header className="template-first-modal-header-container">
          <Modal.Title id="contained-modal-title" className="template-first-modal-header-title">사진 등록</Modal.Title>
          <div className="template-first-modal-header-icon" onClick={onClick}>템플릿</div>
        </Modal.Header>
        <Modal.Body>
          <div className="template-first-modal-body-container">
            {selectedImg ? 
              <>
                <img className="template-first-modal-img" src={backgroundImage} alt="bg"/>
                <textarea
                  className="template-first-modal-textarea" 
                  value={text}
                  onChange={onChange}
                />
              </>
                :
              <div className="template-first-modal-default">
                <span className="template-first-modal-default-text">이책반냥</span>
              </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            bsStyle="success" 
            disabled={!selectedImg}
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

export default TemplateFirstModal;
