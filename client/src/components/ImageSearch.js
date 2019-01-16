import React, { Component } from 'react';
import axios from 'axios';

// Components
import SearchBar from './SearchBar';
import ImageList from './ImageList';

import keys from '../config/keys.js';

export default class ImageSearch extends Component {
  state = {
    images: []
  }

  imageSearch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?
      method=flickr.photos.search&
      api_key=${keys.flickr}&
      tags=${query}&
      per_page=24&
      format=json&
      nojsoncallback=1`
    )
    .then(response => this.setState({images: response.data.photos.photo}));
  }

  render() {
    return (
      <div>
        <SearchBar searchType={this.imageSearch}/>
        <ImageList images={this.state.images} />
      </div>
    );
  }
}
