import React, { Component } from "react";
import TemplateFirstModal from "./TemplateFirstModal";
import TemplateSecondModal from "./TemplateSecondModal";

export const ModalType = {
  First: 'first',
  Second: 'second'
}

export const FAKEDATA = [{
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
    const showFirstModal = activeModal === ModalType.First;
    const showSecondModal = activeModal === ModalType.Second;
    return (
      <div className="template">
        {showFirstModal && 
          <TemplateFirstModal
            text={text}
            selectedImg={selectedImg}
            onChange={this.handleInputChange}
            onUpload={this.handleUpload}
            onClick={() => this.handleCurrentModal(ModalType.Second)}
          />}
        {showSecondModal && 
          <TemplateSecondModal
            selectedImg={selectedImg}
            onSelect={this.handleSelectedImage}
            onConfirm={() => this.handleCurrentModal(ModalType.First)}
          />}
        {/* TODO: need to change icon */}
        <div className="template_icon" onClick={() => this.handleCurrentModal(ModalType.First)} />
      </div>
    );
  }

  handleUpload() {
    // TODO : Upload image and text
    const { selectedImg, text } = this.state;
    console.log('selectedImage, text : ', selectedImg, text);
    this.clearState();
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
}

export default Template;
