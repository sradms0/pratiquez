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

  addOnClick = (note, video) => {
    this.props.api.videos.register(note._id, video)
      .then(() => this.props.updateList('notes'))
      
  }

  deleteOnClick = (note=undefined, video) => {
    this.props.api.videos.delete(video._id)
      .then(() => this.props.updateList('notes'))
  }

  setActionButton = (searched, note, video) => {
    const label = searched ? 'Add' : 'Delete';
    const onClick = searched ? this.addOnClick : this.deleteOnClick;
    return (
      <Button size='mini' secondary onClick={() => onClick(note, video)}>
        {label}
      </Button>          
    );
  }

  render() {
    const { searched, note, video } = this.props;
    //console.log(video);
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
            {this.setActionButton(searched, note, video)}
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


