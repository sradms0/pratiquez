import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

export default class SearchBar extends Component {
  state = {
    text: ''
  }

  onInputChange = e => this.setState({text: e.target.value});

  submitHandler = e => {
    e.preventDefault();
    this.props.searchType(this.state.text)
  }

  render() {
    return(
      <Form onSubmit={this.submitHandler}>
        <Input onChange={this.onInputChange} icon='search' placeholder='Search...' />
      </Form>
    );
  }
}
