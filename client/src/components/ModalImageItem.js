import React from 'react';
import { Container, Image, Modal } from 'semantic-ui-react';

export default function ModalImageItem(props) {
  return (
    <Modal
      basic
      size='small'
      open={props.modalOpen}
      onClose={props.modalOnClose}
    >
      <Modal.Content>
        <Container>
          <Image src={props.imageURL}/>
        </Container>
      </Modal.Content>
    </Modal>
  );
}


