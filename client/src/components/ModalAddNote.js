import React, { Component } from 'react';
import { Button, Form, Grid, Message, Modal, Segment } from 'semantic-ui-react'

export default class ModalAddNote extends Component {
  state = {
    title: '',
    text: '',
    sectionId: '',
    sectionOptions: []
  }

  componentDidMount() {
    this.setSectionData();
  }

  componentWillUnmount() {
    this.props.errState('clear');
  }

  setSectionData = () => {
    this.props.api.sections.all()
      .then(res => {
        const options = res.data.map(section => (
          {
            key: section._id, 
            text: section.title,
            value: section._id
          }
        ));

        this.setState({ sectionOptions: [...options] })
      })
      .catch(err => this.props.errState('set', err));
  }

  titleOnChangeHandler = e => this.setState({ title: e.target.value });

  textOnChangeHandler = e => this.setState({ text: e.target.value });

  sectionIdOnChangeHandler = (e, data) => this.setState({ sectionId: data.value });

  submitHandler = e => {
    const data = { title: this.state.title, text: this.state.text };
    this.props.api.notes.register(this.state.sectionId, data)
      .then(() => {
        this.props.updateList('notes');
        this.props.updateList('sections');
        this.props.modalAddNoteToggleOpen();
      })
      .catch(err => this.props.errState('set', err));
  };

  render() {
    return (
      <Modal 
        size='tiny'
        open={this.props.modalAddNoteOpen}
        onClose={this.props.modalAddNoteOnClose}
      >
        <Modal.Header align='center'>Create a Note</Modal.Header>
        <Modal.Content align='center'>
          <Form size='large' onSubmit={this.submitHandler} error={this.props.err ? true : false}>
            <Message
              error
              content={this.props.err}
            />
            <Form.Input
              fluid
              label='title'
              name='title'
              onChange={this.titleOnChangeHandler}
              required
            />
            <Form.Input
              fluid
              label='text'
              name='text'
              onChange={this.textOnChangeHandler}
              required
            />
            <Form.Select
              fluid
              label='section'
              name='section'
              options={this.state.sectionOptions}
              placeholder='select a section...'
              onChange={this.sectionIdOnChangeHandler}
              required
            />
            <Button type="submit" size='small' color='teal'>
              Create Note
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
