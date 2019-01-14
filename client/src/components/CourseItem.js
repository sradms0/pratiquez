import React, { Component } from 'react'
import { List, Card, Button, Header, Modal, Form } from 'semantic-ui-react'

import ModalCourseItem from './ModalCourseItem';

export default class CourseItem extends Component {
  state = {
    title:    {value: this.props.course.title},
    sections: {data: null, count: 0},
    modal:    {open: false} 
  }

  sectionsUpdate = () => {
    this.props.api.sections.allCourseSections(this.props.course._id)
      .then(res => {
        this.setState(prevState => ({
          sections: {
            data: [...res.data], 
            count: res.data.length
          } 
        }));
      });
  }

  sectionsAddView = () => { 
    const { data } = this.state.sections;
    if (data) {
      const listItems = data.map(section => (
        <List.Item key={this.props.course._id+section._id}>
          <List.Content>
            <List.Header>
              <a onClick={() => console.log('coming soon..')}>{section.title}</a>
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
        <input defaultValue={this.props.course.title} onChange={this.titleOnChange}/>
      </Form.Field>
      <Button color='teal' type='submit' compact>Update</Button>
    </Form>
  );

  titleFormSubmitHandler = e => {
    this.props.api.courses.update(this.props.course._id, {title: this.state.title.value})
      .then(() => this.props.updateList('courses'));
  }

  modalOnClose = () => {
    if (this.state.title.edit) this.titleToggleEdit()
    if (this.state.modal.open) this.modalToggleOpen()
  }

  modalToggleOpen = () => {
    this.setState(prevState => ({ modal: {open: !prevState.modal.open} }));
    this.sectionsUpdate();
  }


  render() {
    return (
      <List.Item>
        <List.Content>

          <List.Header as='a' onClick={this.modalToggleOpen}>
            {this.props.course.title}
          </List.Header>

          <List.Description>
            {`sections: ${this.props.course.sections.length}`}
          </List.Description>

          <ModalCourseItem 
            modalTitle={this.props.course.title}
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}

            titleOnChange={this.titleOnChange}
            titleAddForm={this.titleAddForm}
            titleFormSubmitHandler={this.titleFormSubmitHandler}

            sectionsAddView={this.sectionsAddView}
            sectionsCount={this.state.sections.count}
          />
        </List.Content>
      </List.Item>
    );
  }
}
