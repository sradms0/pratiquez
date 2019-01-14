import React, { Component } from 'react'
import { List, Card, Button, Header, Modal, Form } from 'semantic-ui-react'

export default class CourseItem extends Component {
  state = {
    title: {value: this.props.course.title, edit: false}
  }

  submitHandler = e => {
    this.props.api.courses.update(this.props.course._id, {title: this.state.title.value})
      .then(() => this.props.updateList('courses'))
  };

  toggleTitleEdit = () => this.setState(prevState => ({
    title: {value: prevState.title.value, edit: !prevState.title.edit}  
  }));

  titleHandler = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState(prevState => ({
      title: {value: e.target.value, edit: prevState.title.edit}  
    }));
  }

  addForm = () => (
    <Form onSubmit={this.submitHandler}>
      <Form.Field inline>
        <input defaultValue={this.props.course.title} onChange={this.titleHandler}/>
      </Form.Field>
      <Button color='teal' type='submit' compact>Update</Button>
    </Form>
  );

  render() {
    return (
      <Modal 
        size='tiny'
        trigger={
          <Card
            link
            header={this.props.course.title}
            meta={`Sections: ${this.props.course.sections.length}`}    
          />
        }
        onClose={() => (this.state.title.edit ? this.toggleTitleEdit() : null)}
      >
        <Modal.Header align='center'>{this.props.course.title}</Modal.Header>
        <Modal.Content align='center'>
          <List divided>
            <List.Item>
                <List.Content>
                  <List.Header onClick={this.toggleTitleEdit}>
                    <a>title</a>: {this.props.course.title}
                  </List.Header>
                  {
                    this.state.title.edit
                    ? this.addForm()
                    : null
                  }
                </List.Content>
            </List.Item>

            <List.Item>
              <List.Header>
                <a>sections :</a>{this.props.course.sections.length}
              </List.Header>
            </List.Item>
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}
