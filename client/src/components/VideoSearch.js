import React, { Component } from 'react';

// Components
import SearchBar            from './SearchBar';
import VideoList            from './VideoList';

import keys                 from '../config/keys.js';

export default class VideoSearch extends Component {
  constructor(props) {
    super(props);
    this.path = 'https://www.googleapis.com/youtube/v3';
    this.state = {
      videos: []
    }
  }

  // load js client lib
  componentDidMount() {
    window.gapi.load('client', this.initClient);
  }

  // init js client lib
  initClient = () => {
    window.gapi.client.init({ apiKey: keys.youtube });
  };

  // set request path based on query or ids
  getPath = (type, data) => (
    `${this.path}/${type === 'videos' ? `videos?id=${data}` : `search?q=${data}`}&part=snippet&type=video`
  )

  // save this for loading users 'saved' videos from db
  videoSearchByIds = ids => {
    window.gapi.client.request({'path': this.getPath('video', ids)})
    .then(res => this.setState({ videos: [ ...res.result.items ] }));
  }

  // search by query string
  videoSearch = (query) => {
    window.gapi.client.request({'path': this.getPath('search', query)})
    .then(res => this.setState({ videos: [ ...res.result.items ] }));
  }

  render() {
    return (
      <div>
        <SearchBar searchType={this.videoSearch}/>
        <VideoList searched={true} data={this.state.videos} />
      </div>
    );
  }
}
