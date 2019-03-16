import React, { Component } from "react";
import TemplateModal from "./TemplateModal";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this._handleModalOpen = this._handleModalOpen.bind(this);
    this._handleModalClose = this._handleModalClose.bind(this);
  }

  _handleModalOpen() {
    this.setState({
      showModal: true
    });
  }

  _handleModalClose() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const { showModal } = this.state;
    console.log(showModal);
    return (
      <div className="bookApi">
        {showModal && <TemplateModal />}
        {/* TODO: need to change icon */}
        <div className="searchBook" onClick={this._handleModalOpen} />
      </div>
    );
  }
}

export default Template;
