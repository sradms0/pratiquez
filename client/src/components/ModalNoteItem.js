import React from 'react';
import { List, Modal } from 'semantic-ui-react';

export default function ModalNoteItem(props) {
  return (
    <Modal 
      size='tiny'
      open={props.modalOpen}
      onClose={props.modalOnClose}
    >
      <Modal.Header align='center'>{props.modalTitle}</Modal.Header>
      <Modal.Content align='center'>
        <List divided>
          <List.Item>
              <List.Content>
                <List.Header>
                  title: {props.modalTitle}
                </List.Header>
                {props.noteAddForm()}
              </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header>
                videos: {props.videoCount}
              </List.Header>
              {props.videoCount ? props.videosAddView() : null}
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Header>
              {/*TODO: something...*/}
            </List.Header>
            <List.Content>
              {props.sectionCourseAddView()}
            </List.Content>
          </List.Item>
        </List>
      </Modal.Content>
    </Modal>
  );
}

