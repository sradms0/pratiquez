import React, { Component } from 'react'
import { Container, List, Button, Modal, Form } from 'semantic-ui-react'
import styled from 'styled-components';

import ModalNoteItem  from './ModalNoteItem';
import VideoList      from './VideoList';
import ImageList      from './ImageList';

const ScrollableContainer = styled(Container)`
  &&& {
    height: 250px;
    overflow: scroll;
  }
`
export default class NoteItem extends Component {
  state = {
    title: {value: this.props.note.title},
    text: {value: this.props.note.text},
    modal:    {open: false} 
  }

  videosAddView = () => {
    return (
      <ScrollableContainer>
        <VideoList 
          searched={false} 
          data={this.props.note.videos} 
          api={this.props.api} 
          note={this.props.note}
          updateList={this.props.updateList}
        />
      </ScrollableContainer>
    );
  }

  imagesAddView = () => {
    return (
      <ScrollableContainer>
        <ImageList 
          searched={false} 
          data={this.props.note.images} 
          api={this.props.api} 
          note={this.props.note}
          updateList={this.props.updateList}
        />
      </ScrollableContainer>
    );
  }

  sectionCourseAddView = () => { 
    const { section } = this.props.note;
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

  titleOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState({ title: {value: e.target.value} });
  }

  textOnChange = e => {
    //disable event polling to void null value
    e.persist(); 
    this.setState({ text: {value: e.target.value} });
  }

  noteAddForm = () => (
    <Form onSubmit={this.noteFormSubmitHandler}>
      <Form.Field inline>
        <label>title</label>
        <input defaultValue={this.props.note.title} onChange={this.titleOnChange}/>
      </Form.Field>
      <Form.Field inline>
        <label>text</label>
        <input defaultValue={this.props.note.text} onChange={this.textOnChange}/>
      </Form.Field>
      <Button color='teal' type='submit' compact>Update</Button>
    </Form>
  );

  noteFormSubmitHandler = e => {
    const { title, text } = this.state;
    this.props.api.notes.update(this.props.note._id, 
      {
        title: title.value,
        text: text.value
      })
      .then(() => this.props.updateList('notes'));
  }

  modalOnClose = () => {
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
            {this.props.note.title}
          </List.Header>

          <List.Description>
            {`videos: ${this.props.note.videos.length}`}
          </List.Description>

          <List.Description>
            {`images: ${this.props.note.images.length}`}
          </List.Description>

          <ModalNoteItem 
            modalTitle={this.props.note.title}
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}

            titleOnChange={this.titleOnChange}
            textOnChange={this.textOnChange}
            noteAddForm={this.noteAddForm}
            noteFormSubmitHandler={this.noteFormSubmitHandler}

            sectionCourseAddView={this.sectionCourseAddView}

            videosAddView={this.videosAddView}
            videoCount={this.props.note.videos.length}

            imagesAddView={this.imagesAddView}
            imagesCount={this.props.note.images.length}

            api={this.props.api}
            note={this.props.note}
            updateList={this.props.updateList}
          />
        </List.Content>
      </List.Item>
    );
  }
}
