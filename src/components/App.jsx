import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  formSubmitHandler = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const contact = { id: nanoid(), name, number };
      const newContact = [...this.state.contacts, contact];
      this.setState({ contacts: newContact });
    }
  };

  handleDeleteContact = contactId => {
    const updateContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: updateContacts });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}

export default App;
