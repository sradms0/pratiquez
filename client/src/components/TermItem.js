import React, { Component } from 'react'
import { List, Card, Button, Header, Modal, Form } from 'semantic-ui-react'

import ModalTermItem from './ModalTermItem';

export default class TermItem extends Component {
  state = {
    question: {value: this.props.term.question},
    answer:   {value: this.props.term.answer},
    modal:    {open: false} 
  }

  sectionCourseAddView = () => { 
    const { section } = this.props.term;
    return (
      <List celled>
        <List.Item>
          <List.Content>
            <a onClick={() => console.log('coming soon..')}>section: {section.title}</a>
          </List.Content>

        </List.Item>

        <List.Item>
          <List.Content>
            <a onClick={() => console.log('coming soon..')}>course: {section.course.title}</a>
          </List.Content>
        </List.Item>
      </List>
    );
  }

  questionOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState({ question: {value: e.target.value} });
  }

  answerOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState({ answer: {value: e.target.value} });
  }

  termAddForm = () => (
    <Form onSubmit={this.termFormSubmitHandler}>
      <Form.Field inline>
        <label>question</label>
        <input defaultValue={this.props.term.question} onChange={this.questionOnChange}/>
      </Form.Field>
      <Form.Field inline>
        <label>answer</label>
        <input defaultValue={this.props.term.answer} onChange={this.answerOnChange}/>
      </Form.Field>
      <Button color='teal' type='submit' compact>Update</Button>
    </Form>
  );

  termFormSubmitHandler = e => {
    const { question, answer } = this.state;
    this.props.api.terms.update(this.props.term._id, 
      {
        question: question.value,
        answer: answer.value
      })
      .then(() => this.props.updateList('terms'));
  }

  modalOnClose = () => {
    if (this.state.question.edit) this.questionToggleEdit()
    if (this.state.modal.open) this.modalToggleOpen()
  }

  modalToggleOpen = () => {
    this.setState(prevState => ({ modal: {open: !prevState.modal.open} }));
  }


  render() {
    return (
      <List.Item>
        <List.Content>

          <List.Header as='a' onClick={this.modalToggleOpen}>
            {this.props.term.question}
          </List.Header>

          <List.Description>
            {`course: ${this.props.term.section.course.title}`}
          </List.Description>

          <List.Description>
            {`section: ${this.props.term.section.title}`}
          </List.Description>

          <ModalTermItem 
            modalTitle={this.props.term.question}
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}

            questionOnChange={this.questionOnChange}
            answerOnChange={this.questionOnChange}
            termAddForm={this.termAddForm}
            termFormSubmitHandler={this.termFormSubmitHandler}
            sectionCourseAddView={this.sectionCourseAddView}
          />
        </List.Content>
      </List.Item>
    );
  }
}
