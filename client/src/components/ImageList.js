import React from 'react';
import { List } from 'semantic-ui-react';
import ImageItem from './ImageItem';

const Image = props => {
  const { images } = props;
  const imageItems = images.map(imageItem =>
    <ImageItem 
      url={`https://farm${imageItem.farm}.staticflickr.com/${imageItem.server}/${imageItem.id}_${imageItem.secret}.jpg`} 
      key={imageItem.id}
      title={imageItem.title}
    />
  );

  return (
    <List celled>
      {imageItems}
    </List>
  )
};

export default Image;
