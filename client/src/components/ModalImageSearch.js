import React from 'react';
import { Button, Container, List, Modal } from 'semantic-ui-react';

// Components
import ImageSearch from './ImageSearch';

export default function ModalImageSearch(props) {
  return (
    <Modal 
      size='large'
      open={props.modalImageSearchOpen}
      onClose={props.modalImageSearchOnClose}
    >
      <Modal.Content>
        <ImageSearch api={props.api} note={props.note} updateList={props.updateList}/>
      </Modal.Content>
    </Modal>
  );
}
