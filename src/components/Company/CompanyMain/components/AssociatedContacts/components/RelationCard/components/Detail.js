import React from 'react';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailModal from '../../../../../../../Activities/components/Email/components/Modal/CreateEmail';
import { ModalContext } from '../../../../../../../Modal/components/ModalContext';
import { addContactAction } from '../../../../../../../../action';
import store from '../../../../../../../../store';
import Modal from '../../../../../../../../js/Modal';
import RemoveBtn from '../../../../../../../RemoveBtn';
import NavigationButton from '../../../../../../../NavigationButton';
import Avatar from '../../../../../../../Avatar';

import './Detail.scss';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveModal: false,
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.onClickConfirmBtn = this.onClickConfirmBtn.bind(this);
    this.onClickCancelBtn = this.onClickCancelBtn.bind(this);
    this.onClickEmailLink = this.onClickEmailLink.bind(this);
  }

  handleModalToggle() {
    this.setState((prevState) => ({
      showRemoveModal: !prevState.showRemoveModal,
    }));
  };

  onClickConfirmBtn() {
    this.props.handleRemoveRef(this.props.contact.id, this.props.company.id);
    this.setState({
      showRemoveModal: false,
    });
  };

  onClickEmailLink() {
    const action = addContactAction(this.props.contact);
    store.dispatch(action);
  }

  onClickCancelBtn() {
    this.handleModalToggle();
  };

  render() {
    const { showRemoveModal } = this.state;
    const { contact, company } = this.props;
    let jobTitle = '';
    if (contact.jobTitle) {
      jobTitle = `${contact.jobTitle} at`;
    }

    const createModal = new Modal('Email', 'Email', EmailModal);

    return (
      <ModalContext.Consumer>
        { (modalController) => (
          <div className="relatedContacts">
            <div className="relatedContactsWrapper">
              <div className="relatedContactsWrapper__header">
                <div className="relatedContactsWrapper__header__avatar">
                  <Avatar>
                    {`${contact.firstName[0]}${contact.lastName[0]}`}
                  </Avatar>
                </div>
                <div className="relatedContactsWrapper__header__basicInfo">
                  <NavigationButton
                    path="/contacts/main"
                    id={contact.id}
                  >
                    {contact.fullName}
                  </NavigationButton>
                  <div className="relatedContactsWrapper__header__basicInfo__jobTitle">
                    {`${jobTitle} ${company.name}`}
                  </div>
                </div>
              </div>
              <div className="relatedContactsWrapper__activityContainer">
                <div className="relatedContactsWrapper__activityContainer__icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="relatedContactsWrapper__activityContainer__activity" onClick={() => {
                  modalController.open(createModal);
                  this.onClickEmailLink();
                }}>{contact.email}</div>
              </div>
              <div className="relatedContactsWrapper__activityContainer">
                <div className="relatedContactsWrapper__activityContainer__icon">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
                <span className="relatedContactsWrapper__activityContainer__activity">{contact.phoneNo}</span>
              </div>
            </div>
            <div className="relatedContacts__removeBtn">
              <RemoveBtn
                showRemoveModal={showRemoveModal}
                contactName={contact.fullName}
                companyName={company.name}
                handleModalToggle={this.handleModalToggle}
                onClickConfirmBtn={this.onClickConfirmBtn}
                onClickCancelBtn={this.onClickCancelBtn}
              />
            </div>
          </div>
        )}
      </ModalContext.Consumer>
    );
  }
}

export default Detail;
