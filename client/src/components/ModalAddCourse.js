import React, { Component } from 'react';
import { Button, Form, Grid, Message, Modal, Segment } from 'semantic-ui-react'

export default class ModalAddCourse extends Component {
  state = {
    title: '',
  }

  componentWillUnmount() {
    this.props.errState('clear');
  }

  titleOnChangeHandler = e => this.setState({ title: e.target.value });

  submitHandler = e => {
    this.props.api.courses.register(this.state)
      .then(() => {
        this.props.updateList('courses');
        this.props.modalAddCourseToggleOpen();
      })
      .catch(err => this.props.errState('set', err));
  };

  render() {
    return (
      <Modal 
        size='tiny'
        open={this.props.modalAddCourseOpen}
        onClose={this.props.modalAddCourseOnClose}
      >
        <Modal.Header align='center'>Create a Course</Modal.Header>
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
            <Button type="submit" size='small' color='teal'>
              Create Course
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
