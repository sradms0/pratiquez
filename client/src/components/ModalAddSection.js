import React, { Component } from 'react';
import { Button, Form, Grid, Message, Modal, Segment } from 'semantic-ui-react'

export default class ModalAddSection extends Component {
  state = {
    title: '',
    courseId: '',
    courseOptions: []
  }

  componentDidMount() {
    this.setCourseData();
  }

  componentWillUnmount() {
    this.props.errState('clear');
  }

  setCourseData = () => {
    this.props.api.courses.all()
      .then(res => {
        const options = res.data.map(course => (
          {
            key: course._id, 
            text: course.title,
            value: course._id
          }
        ));

        this.setState({ courseOptions: [...options] })
      })
      .catch(err => this.props.errState('set', err));
  }

  titleOnChangeHandler = e => this.setState({ title: e.target.value });

  courseIdOnChangeHandler = (e, data) => this.setState({ courseId: data.value });

  submitHandler = e => {
    const data = { title: this.state.title };
    this.props.api.sections.register(this.state.courseId, data)
      .then(() => {
        this.props.updateList('sections');
        this.props.updateList('courses');
        this.props.modalAddSectionToggleOpen();
      })
      .catch(err => this.props.errState('set', err));
  };

  render() {
    return (
      <Modal 
        size='tiny'
        open={this.props.modalAddSectionOpen}
        onClose={this.props.modalAddSectionOnClose}
      >
        <Modal.Header align='center'>Create a Section</Modal.Header>
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
            <Form.Select
              fluid
              label='course'
              name='course'
              options={this.state.courseOptions}
              placeholder='select a course...'
              onChange={this.courseIdOnChangeHandler}
              required
            />
            <Button type="submit" size='small' color='teal'>
              Create Section
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
