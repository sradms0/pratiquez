import React, { Component } from 'react';
import { Button, Form, Grid, Message, Modal, Segment } from 'semantic-ui-react'

export default class ModalAddTerm extends Component {
  state = {
    question: '',
    answer: '',
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

  questionOnChangeHandler = e => this.setState({ question: e.target.value });

  answerOnChangeHandler = e => this.setState({ answer: e.target.value });

  sectionIdOnChangeHandler = (e, data) => this.setState({ sectionId: data.value });

  submitHandler = e => {
    const data = { question: this.state.question, answer: this.state.answer };
    this.props.api.terms.register(this.state.sectionId, data)
      .then(() => {
        this.props.updateList('terms');
        this.props.updateList('sections');
        this.props.modalAddTermToggleOpen();
      })
      .catch(err => this.props.errState('set', err));
  };

  render() {
    return (
      <Modal 
        size='tiny'
        open={this.props.modalAddTermOpen}
        onClose={this.props.modalAddTermOnClose}
      >
        <Modal.Header align='center'>Create a Term</Modal.Header>
        <Modal.Content align='center'>
          <Form size='large' onSubmit={this.submitHandler} error={this.props.err ? true : false}>
            <Message
              error
              content={this.props.err}
            />
            <Form.Input
              fluid
              label='question'
              name='question'
              onChange={this.questionOnChangeHandler}
              required
            />
            <Form.Input
              fluid
              label='answer'
              name='answer'
              onChange={this.answerOnChangeHandler}
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
              Create Term
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
