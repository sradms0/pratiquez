import React from 'react';
import { List } from 'semantic-ui-react';
import ImageItem from './ImageItem';

export default function ImageList(props) {
  const { data, searched } = props;
  if (data)  {
    let images = data;
    // not super efficent 
    // (would like to make image schema 
    // in mongo represent flickr image object exactly to avoid remapping)
    if (searched) {
      images = data.map(data => ({
          id:           data.id,
          largeURL:     data.url_c,
          thumbnailURL: data.url_q,
          title:        data.title,
          description:  data.description._content
        })
      );
    }

    const imageItems = images.map(image => {
      console.log(props);
      return (
        <ImageItem 
          searched={searched} 
          key={image.id}
          image={image} 

          api={props.api}
          note={props.note}
          updateList={props.updateList}
        />
      );
    });

    return (
      <List celled>
        {imageItems}
      </List>
    );
  }
  return null;
};

