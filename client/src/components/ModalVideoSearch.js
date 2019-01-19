import React from 'react';
import { Button, Container, List, Modal } from 'semantic-ui-react';

// Components
import VideoSearch from './VideoSearch';

export default function ModalVideoSearch(props) {
  return (
    <Modal 
      size='large'
      open={props.modalVideoSearchOpen}
      onClose={props.modalVideoSearchOnClose}
    >
      <Modal.Content>
        <VideoSearch api={props.api} note={props.note} updateList={props.updateList}/>
      </Modal.Content>
    </Modal>
  );
}
