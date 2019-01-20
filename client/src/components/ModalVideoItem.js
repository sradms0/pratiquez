import React from 'react';
import { Container, Embed, Modal } from 'semantic-ui-react';

export default function ModalVideoItem(props) {
  return (
    <Modal
      basic
      size='small'
      open={props.modalOpen}
      onClose={props.modalOnClose}
    >
      <Modal.Content>
        <Container>
          <Embed
            autoplay={true}
            color='white'
            hd={false}
            id={props.videoId}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            placeholder='/images/image-16by9.png'
            source='youtube'
          />
        </Container>
      </Modal.Content>
    </Modal>
  );
}


