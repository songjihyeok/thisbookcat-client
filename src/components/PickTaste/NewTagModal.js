import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class NewTagModal extends Component {
	state = {
		tag: ''
	}

	_setTag = () => {
		const inputData = document.getElementsByClassName('getNewTag')[0].value
		// console.log('TasteBoard.js > _setUserName 함수에서 inputData___', inputData)
		this.setState ({
			tag:inputData
		})
		// console.log('NewTagModal.js > _setTag 함수에서 this.state.tag___', this.state.tag)
	}

	_handleNewTag = () => {
		if(window.confirm(`${this.state.tag}을(를) 태그에 추가하시겠습니까?`) === true) {
			this.props.callback(this.state.tag)
			this.props.hide()
		} else {
				return
		}
	}

  render() {
    return (
      <div>
				<Modal
					show={this.props.show}
					onHide={this.props.hide}
					container={this}
					aria-labelledby="contained-modal-title">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title">UploadModal</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className = 'NewTagUploadModal'>
							<input type="text" className='getNewTag' onChange={this._setTag}></input>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this._handleNewTag}>태그만들기</Button>
					</Modal.Footer>
        </Modal>
      </div>
    )
  }
}
