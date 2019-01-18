import React, { Component } from 'react';
import { Button, Container, List, Modal } from 'semantic-ui-react';

// Components
import ModalVideoSearch from './ModalVideoSearch';

export default class ModalNoteItem extends Component {
  state = { 
    modalVideoSearch: { open: false } 
  }

  modalVideoSearchOnClose = () => {
    if (this.state.modalVideoSearch.open) this.modalVideoSearchToggleOpen()
  }

 modalVideoSearchToggleOpen = () => {
    this.setState(prevState => ({ modalVideoSearch: {open: !prevState.modalVideoSearch.open} }));
  }

  render() {
    return (
      <Modal 
        size='tiny'
        open={this.props.modalOpen}
        onClose={this.props.modalOnClose}
      >
        <Modal.Header align='center'>{this.props.modalTitle}</Modal.Header>
        <Modal.Content align='center'>
          <List divided>
            <List.Item>
                <List.Content>
                  <List.Header>
                    title: {this.props.modalTitle}
                  </List.Header>
                  {this.props.noteAddForm()}
                </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header>
                  videos: {this.props.videoCount}
                  <Container align='center'>
                    <Button onClick={this.modalVideoSearchToggleOpen}color='green' icon='plus' size='mini' />
                  </Container>
                </List.Header>
                {this.props.videoCount ? this.props.videosAddView() : null}

                <ModalVideoSearch
                  modalVideoSearchOnClose={this.modalVideoSearchOnClose}
                  modalVideoSearchOpen={this.state.modalVideoSearch.open}
                  modalVideoSearchToggleOpen={this.modalVideoSearchToggleOpen}
                /> 
      
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Header>
                {/*TODO: something...*/}
              </List.Header>
              <List.Content>
                {this.props.sectionCourseAddView()}
              </List.Content>
            </List.Item>
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}
