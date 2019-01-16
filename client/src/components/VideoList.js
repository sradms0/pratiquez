import React from 'react';
import { List } from 'semantic-ui-react';
import VideoItem from './VideoItem';

export default function VideoList(props) {
  const { videos } = props;
  if (videos)  {
    const videoItems = videos.map(video => (
      <VideoItem key={video.etag} video={video}/>
    ));
    return (
      <List celled>
        {videoItems}
      </List>
    );
  }
  return null;
}
