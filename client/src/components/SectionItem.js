import React, { Component } from 'react'
import { List, Card, Button, Header, Modal, Form } from 'semantic-ui-react'

import ModalSectionItem from './ModalSectionItem';

export default class SectionItem extends Component {
  state = {
    title:    {value: this.props.section.title},
    notes:    {data: null, count: 0},
    terms:    {data: null, count: 0},
    course:   {data: null},
    modal:    {open: false} 
  }

  notesUpdate = () => {
    this.props.api.notes.allSectionNotes(this.props.section._id)
      .then(res => {
        this.setState(prevState => ({
          notes: {
            data: [...res.data], 
            count: res.data.length
          } 
        }));
      });
  }

  termsUpdate = () => {
    this.props.api.terms.allSectionTerms(this.props.section._id)
      .then(res => {
        this.setState(prevState => ({
          terms: {
            data: [...res.data], 
            count: res.data.length
          } 
        }));
      });
  }

  notesAddView = () => { 
    const { data } = this.state.notes;
    if (data) {
      const listItems = data.map(note => (
        <List.Item key={this.props.section._id+note._id}>
          <List.Content>
            <List.Header>
              <a onClick={() => console.log('coming soon..')}>{note.title}</a>
            </List.Header>
          </List.Content>
        </List.Item>
      ));
      return (<List celled>{listItems}</List>);
    }
  }

  termsAddView = () => { 
    const { data } = this.state.terms;
    if (data) {
      const listItems = data.map(term => (
        <List.Item key={this.props.section._id+term._id}>
          <List.Content>
            <List.Header>
              <a onClick={() => console.log('coming soon..')}>{term.question}</a>
            </List.Header>
          </List.Content>
        </List.Item>
      ));
      return (<List celled>{listItems}</List>);
    }
  }

  titleOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState({ title: {value: e.target.value} });
  }

  titleAddForm = () => (
    <Form onSubmit={this.titleFormSubmitHandler}>
      <Form.Field inline>
        <input defaultValue={this.props.section.title} onChange={this.titleOnChange}/>
      </Form.Field>
      <Button color='teal' type='submit' compact>Update</Button>
    </Form>
  );

  titleFormSubmitHandler = e => {
    this.props.api.sections.update(this.props.section._id, {title: this.state.title.value})
      .then(() => this.props.updateList('sections'));
  }

  modalOnClose = () => {
    if (this.state.title.edit) this.titleToggleEdit()
    if (this.state.modal.open) this.modalToggleOpen()
  }

  modalToggleOpen = () => {
    this.setState(prevState => ({ modal: {open: !prevState.modal.open} }));
    this.termsUpdate();
    this.notesUpdate();
  }


  render() {
    return (
      <List.Item>
        <List.Content>

          <List.Header as='a' onClick={this.modalToggleOpen}>
            {this.props.section.title}
          </List.Header>

          <List.Description>
            {`notes: ${this.props.section.notes.length}`}
          </List.Description>

          <List.Description>
            {`terms: ${this.props.section.terms.length}`}
          </List.Description>

          <ModalSectionItem 
            modalTitle={this.props.section.title}
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}

            titleOnChange={this.titleOnChange}
            titleAddForm={this.titleAddForm}
            titleFormSubmitHandler={this.titleFormSubmitHandler}

            notesAddView={this.notesAddView}
            notesCount={this.state.notes.count}

            termsAddView={this.termsAddView}
            termsCount={this.state.terms.count}
          />
        </List.Content>
      </List.Item>
    );
  }
}
