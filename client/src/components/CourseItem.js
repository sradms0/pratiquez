import React, { Component } from 'react'
import { List, Card, Button, Header, Modal, Form } from 'semantic-ui-react'

export default class CourseItem extends Component {
  state = {
    title:    {value: this.props.course.title, edit: false},
    sections: {data: null, count: 0, view: false},
    modal:    {open: false} 
  }

  modalOnClose = () => {
    if (this.state.title.edit) this.titleToggleEdit()
    if (this.state.modal.open) this.modalToggleOpen()
  }

  modalToggleOpen = () => {
    this.setState(prevState => (
      { modal: {open: !prevState.modal.open} }
    ));
  }

  sectionsToggleView = () => {
    this.props.api.sections.allCourseSections(this.props.course._id)
      .then(res => {
        this.setState(prevState => ({
          sections: {
            data: [...res.data], 
            count: res.data.length, 
            view: !prevState.sections.view
          } 
        }));
      });
  }

  sectionsAddView = () => { 
    const { data } = this.state.sections;
    if (data.length) {
      const listItems = data.map(section => (
        <List.Item key={this.props.course._id+section._id}>
          <List.Content>
            <List.Header onClick={() => console.log('coming soon..')}>
              {section.title}
            </List.Header>
          </List.Content>
        </List.Item>
      ));
      return (<List celled>{listItems}</List>);
    }
  }

  titleToggleEdit = () => this.setState(prevState => ({
    title: {value: prevState.title.value, edit: !prevState.title.edit}  
  }));

  titleOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState(prevState => ({
      title: {value: e.target.value, edit: prevState.title.edit}  
    }));
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
  };

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

            <Modal 
              size='tiny'
              open={this.state.modal.open}
              onClose={this.modalOnClose}
            >
              <Modal.Header align='center'>{this.props.course.title}</Modal.Header>
              <Modal.Content align='center'>
                <List divided>
                  <List.Item>
                      <List.Content>
                        <List.Header onClick={this.titleToggleEdit}>
                          <a>title</a>: {this.props.course.title}
                        </List.Header>
                        {
                          this.state.title.edit
                          ? this.titleAddForm()
                          : null
                        }
                      </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Header onClick={this.sectionsToggleView}>
                      <a>sections :</a>{this.props.course.sections.length}
                    </List.Header>
                    {
                      this.state.sections.view
                      ? this.sectionsAddView()
                      : null
                    }
                  </List.Item>
                </List>
              </Modal.Content>
            </Modal>

        </List.Content>
      </List.Item>
    );
  }
}
