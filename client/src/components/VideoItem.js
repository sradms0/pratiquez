import React, { Component } from 'react'
import { Button, Container, Image, List } from 'semantic-ui-react';

import ModalVideoItem from './ModalVideoItem'

export default class VideoItem extends Component {
  state = {
    modal: {open: false}
  }

  modalToggleOpen = () => {
    this.setState(prevState => ({ modal: {open: !prevState.modal.open} }));
  }

  modalOnClose = () => this.modalToggleOpen();

  render() {
    const { video } = this.props;
    return (
      <List.Item >
        <Image src={video.snippet.thumbnails.default.url} />
        <List.Content>
          <List.Header>
            {video.snippet.title}
          </List.Header>

          <List.Description>
            <Container>
              {video.snippet.description}
            </Container>
          </List.Description>

          <Container>
            <Button size='mini' primary onClick={this.modalToggleOpen}>
              Watch
            </Button>          
            <Button size='mini' secondary onClick={this.modalToggleOpen}>
              Add
            </Button>          
          </Container>

          <ModalVideoItem 
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}
            videoId={video.id.videoId}
          />

        </List.Content>
      </List.Item>
    );
  }
}


