import React from 'react';
import { List, Modal } from 'semantic-ui-react';

export default function ModalCourseItem(props) {
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
                {props.titleAddForm()}
              </List.Content>
          </List.Item>

            <List.Item>
              <List.Header>
                sections: {props.sectionsCount}
              </List.Header>
              {props.sectionsCount ? props.sectionsAddView() : null}
            </List.Item>
        </List>
      </Modal.Content>
    </Modal>
  );
}

