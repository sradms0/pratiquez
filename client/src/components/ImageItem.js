import React from 'react';
import { Button, Container, Image, List } from 'semantic-ui-react';

export function GalleryItem(props) {
  console.log(props);
  return (
    <List.Item >
      <Image size='small' src={props.url} />
      <List.Content>
        <List.Header>
          {props.title}
        </List.Header>
      </List.Content>
    </List.Item >
  );
}

export default GalleryItem;
