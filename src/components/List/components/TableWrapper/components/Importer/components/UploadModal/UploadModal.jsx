import React, { Component } from "react";
import Uploader from '../Uploader';
import "./UploadModal.scss";

export default class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  closeModal = () => {
    this.props.changeModalVisible(false);
  };

  maskClick = () => {
    this.props.changeModalVisible(false);
  };

  getNewData = (data) => {
    this.props.getNewData(data);
    this.props.changeModalVisible(false);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="body">
          <Uploader getNewData={this.getNewData} />
          <div className="operator">
            <button className="operator-close" onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        </div>
        <div className="mask" onClick={this.maskClick} />
      </div>
    );
  }
}
