import React from 'react';
import { List, Modal } from 'semantic-ui-react';

export default function ModalTermItem(props) {
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
                  question: {props.modalTitle}
                </List.Header>
                {props.termAddForm()}
              </List.Content>
          </List.Item>

          <List.Item>
            {props.sectionCourseAddView()}
          </List.Item>
        </List>
      </Modal.Content>
    </Modal>
  );
}

