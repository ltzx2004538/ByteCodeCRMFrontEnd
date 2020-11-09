import React from 'react';
import './EmailModal.scss';
import EmailFunctionBar from './components/EmailFunctionBar';
import EmailHeader from './components/EmailHeader';
import EmailInput from './components/EmailInput';
import EmailSendBar from './components/EmailSend';
import store from '../../../../../../../store';

class EmailModal extends React.Component {
  constructor(props) {
    super(props);
    const { contact } = store.getState().contact;
    let contacts = [];
    contact ? contacts.push(contact) : contacts = [];
    const items = [
      { key: 'Templates', value: 'Templates' },
      { key: 'Sequences', value: 'Sequences' },
      { key: 'Documents', value: 'Documents' },
      { key: 'Meetings', value: 'Meetings' },
      { key: 'Quotes', value: 'Quotes' },
    ];

    this.state = {
      items,
      contacts,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  checkValidation(text) {
    const { contacts } = this.state;
    const checkInput = text.replaceAll(' ', '').replaceAll('<br>', '').replaceAll('<p></p>', '');
    if (contacts.length >= 1 && checkInput !== '') {
      return true;
    }

    return false;
  }

  handleEditorChange(text) {
    if (this.checkValidation(text) && this.state.contacts.length > 0) {
      this.setState({
        description: text,
        btnDisable: false,
      });
    } else {
      this.setState({
        description: text,
        btnDisable: true,
      });
    }
  }

  render() {
    const { items, contacts } = this.state;
    return (
      <div className="emailModal">
        <EmailFunctionBar
          items={items}
        />
        <EmailHeader
          contacts={contacts}
        />
        <EmailInput handleEditorChange={this.handleEditorChange} />
        <EmailSendBar />
      </div>
    );
  }
}

export default EmailModal;
