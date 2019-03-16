import React, { Component } from "react";

import {
  Modal,
  Button,
} from "react-bootstrap";

class TemplateModal extends Component {
  render() {
    const fakeData = [
      {
        id: '1',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '2',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '3',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '4',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '5',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '6',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '7',
        img: 'http://placehold.it/400x20&text=slide1'
      },
      {
        id: '8',
        img: 'http://placehold.it/400x20&text=slide1'
      }
    ]
    return (
      <Modal show container={this} aria-labelledby="contained-modal-title">
        <Modal.Header>
          <Modal.Title id="contained-modal-title">템플릿 고르기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="template-container">
            {fakeData.map((data) => <div className="template-card" key={data.id}><img className="template-img" style={{width: 120, height: 120}} src={data.img} alt={"사진"}/></div>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" disabled={false}
                  onClick={() => {
                    console.log("선택완료")
                  }}>
            선택완료
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TemplateModal;
