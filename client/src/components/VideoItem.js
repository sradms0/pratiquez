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

  placeThumbnail = url => (
    <Image src={url} />
  )

  render() {
    const { video, searched } = this.props;
    return (
      // place image next to or in content based on if youtube api search was used
      <List.Item >
        {searched ? this.placeThumbnail(video.thumbnailURL) : null}
        <List.Content>
          {!searched ? this.placeThumbnail(video.thumbnailURL) : null}
          <List.Header>
            {video.title}
          </List.Header>

          <List.Description>
            <Container>
              {video.description}
            </Container>
          </List.Description>

          <Container>
            <Button size='mini' primary onClick={this.modalToggleOpen}>
              Watch
            </Button>          
            <Button size='mini' secondary onClick={this.modalToggleOpen}>
              {searched ? 'Add' : 'Delete'}
            </Button>          
          </Container>

          <ModalVideoItem 
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}
            videoId={video.videoId}
          />

        </List.Content>
      </List.Item>
    );
  }
}


