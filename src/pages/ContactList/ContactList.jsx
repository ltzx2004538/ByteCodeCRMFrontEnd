import React, { Component } from 'react';
import './ContactList.scss';
import PageWrapper from '../../components/List';

const tabs = [
  {
    id: 1,
    label: 'All contacts',
  },
  {
    id: 2,
    label: 'My contacts',
  },
  {
    id: 3,
    label: 'Unassigned contacts',
  },
];

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: 'Zoe Joey',
    };
  }

  render() {
    return (
      <div className="root" key="wrapper">
        <h1>Contacts</h1>
        <PageWrapper tabs={tabs} userAccount={this.state.userAccount} type="contact" />
      </div>
    );
  }
}

export default ContactList;
