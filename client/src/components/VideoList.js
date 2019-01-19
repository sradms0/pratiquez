import React from 'react';
import { List } from 'semantic-ui-react';
import VideoItem from './VideoItem';

export default function VideoList(props) {

  const { data, searched } = props;

  if (data)  {
    let videos = data;
    // not super efficent 
    // (would like to make video schema 
    // in mongo represent youtube video object exactly to avoid remapping)
    if (searched) {
      videos = data.map(data => ({
          videoId:      data.id.videoId,
          thumbnailURL: data.snippet.thumbnails.default.url,
          title:        data.snippet.title,
          description:  data.snippet.description
        })
      );
    }

    const videoItems = videos.map(video => {
      return (
        <VideoItem 
          searched={props.searched} 
          key={video.videoId}
          video={video} 
          api={props.api} 
          note={props.note} 
          updateList={props.updateList}
        />
      );
    });

    return (
      <List celled>
        {videoItems}
      </List>
    );
  }
  return null;
}
