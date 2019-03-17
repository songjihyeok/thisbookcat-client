import React, { Component } from "react";
import html2canvas from "html2canvas";

import TemplateRegisterModal from "./TemplateRegisterModal";
import TemplateSelectModal from "./TemplateSelectModal";

export const ModalType = {
  Register: 'register',
  Select: 'select'
}

export const FAKEDATA = [{
    id: '1',
    img: 'stone.jpeg'
  },
  {
    id: '2',
    img: 'harry.jpg'
  },
  {
    id: '3',
    img: 'EW_Harry-Potter_Featured.jpg'
  },
  {
    id: '4',
    img: 'stone.jpeg'
  },
  {
    id: '5',
    img: 'harry.jpg'
  },
  {
    id: '6',
    img: 'EW_Harry-Potter_Featured.jpg'
  },
  {
    id: '7',
    img: 'stone.jpeg'
  },
  {
    id: '8',
    img: 'harry.jpg'
  }
];

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      text: '',
      selectedImg: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCurrentModal = this.handleCurrentModal.bind(this);
    this.handleSelectedImage = this.handleSelectedImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    const {
      activeModal,
      selectedImg,
      text,
    } = this.state;
    const showRegisterModal = activeModal === ModalType.Register;
    const showSelectModal = activeModal === ModalType.Select;
    return (
      <div className="template">
        {showSelectModal && 
          <TemplateSelectModal
            selectedImg={selectedImg}
            onSelect={this.handleSelectedImage}
            onConfirm={() => this.handleCurrentModal(ModalType.Register)}
        />}
        {showRegisterModal && 
          <TemplateRegisterModal
            text={text}
            selectedImg={selectedImg}
            onChange={this.handleInputChange}
            onUpload={this.handleUpload}
            onClick={() => this.handleCurrentModal(ModalType.Select)}
          />}
        {/* TODO: need to change icon */}
        <div className="template_icon" onClick={() => this.handleCurrentModal(ModalType.Select)} />
      </div>
    );
  }

  handleUpload() {
    // TODO : Upload image and text
    this.takeScreenshot();
  }

  handleCurrentModal(type) {
    this.setState({
      activeModal: type
    });
  }

  handleModalClear() {
    this.setState({
      activeModal: null
    });
  }

  handleSelectedImage(id) {
    this.setState({
      selectedImg: id,
      showWarning: false
    })
  }

  handleInputChange(evt) {
    const {
      value
    } = evt.target;
    this.setState({
      text: value
    })
  }

  clearState() {
    this.setState({
      activeModal: false,
      text: '',
      selectedImg: null,
    });
  }

  takeScreenshot() {
    let test = document.querySelector('.template-register-modal-body-container');
    html2canvas(test, {
        allowTaint: false,
        windowWidth: 300,
        windowHeight: 300
      }).then((canvas) => {
      let imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      this.clearState();
    });
  }
}

export default Template;
