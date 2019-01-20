import React, { Component } from 'react';
import { Button, Container, Image, List } from 'semantic-ui-react';

// Components
import ModalImageItem from './ModalImageItem';

export default class ImageItem extends Component {
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

  addOnClick = (note, image) => {
    this.props.api.images.register(note._id, image)
      .then(() => this.props.updateList('notes'))
  }

  deleteOnClick = (note=undefined, image) => {
    this.props.api.images.delete(image._id)
      .then(() => this.props.updateList('notes'))
  }

  setActionButton = (searched, note, image) => {
    const label = searched ? 'Add' : 'Delete';
    const onClick = searched ? this.addOnClick : this.deleteOnClick;
    return (
      <Button size='mini' secondary onClick={() => onClick(note, image)}>
        {label}
      </Button>          
    );
  }

  render() {
    const { searched, note, image } = this.props;
    return (
      <List.Item>
        {searched ? this.placeThumbnail(image.thumbnailURL) : null}
        <List.Content>
          {!searched ? this.placeThumbnail(image.thumbnailURL) : null}
          <List.Header>
            {image.title}
          </List.Header>

          <List.Description>
            <Container>
              {image.description}
            </Container>
          </List.Description>

          <Container>
            <Button size='mini' primary onClick={this.modalToggleOpen}>
              View
            </Button>          
            {this.setActionButton(searched, note, image)}
          </Container>

          <ModalImageItem 
            modalOnClose={this.modalOnClose}
            modalOpen={this.state.modal.open}
            modalToggleOpen={this.modalToggleOpen}
            imageURL={image.largeURL}
          />

        </List.Content>
      </List.Item >
    );
  }
}
