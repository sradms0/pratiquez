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
      extras=description,url_q,url_c&
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
        <ImageList 
          searched={true} 
          data={this.state.images} 
          api={this.props.api}
          note={this.props.note}
          updateList={this.props.updateList}
        />
      </div>
    );
  }
}
