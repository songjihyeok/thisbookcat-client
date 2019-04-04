import React, { Component } from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";

import { FAKEDATA } from "./Template";

class TemplateSelectModal extends Component {

  handleHide=()=>{
    console.log("버튼이시작은 되냐?")
    this.props.handleHide()
  }

  render() {
    const { selectedImg, onConfirm } = this.props;
    console.log("false?",this.props.showmodal)
    return (
      <Modal 
        container={this} 
        dialogClassName="template-select-modal"
        aria-labelledby="contained-modal-title" 
        show
      >
        <Modal.Header>
          <button type="button" onClick={this.handleHide}className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <Modal.Title id="contained-modal-title">템플릿 고르기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="template-select-modal-body">
          <div className="template-select-modal-body-container">
            {FAKEDATA.map(({ id, img }) =>
              <div className="template-select-modal-card" key={id}>
                <img 
                  className={selectedImg === id ? "template-select-modal-selected-img" : "template-select-modal-img"}
                  src={require(`./images/${img}`)} alt={img} 
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

export default TemplateSelectModal;
