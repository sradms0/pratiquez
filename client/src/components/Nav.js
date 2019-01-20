import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from  'axios';

export default class Nav extends Component {
  state = { activeItem: null }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logoutHandler = e => {
    this.props.api.user.logout()
      .then(() => this.props.userState('clear'))
      .catch(err => console.log(err));
  }

  render() {
    const { activeItem } = this.state;
    const { email } = this.props.user;
    const iconSize = 'large';
    return (
      <Menu compact icon>
        <Menu.Item header>{this.props.user.email}</Menu.Item>

        <Menu.Item 
          name='plus' 
          active={activeItem === 'plus'} 
          onClick={() => console.log('coming soon')}
        >
          <Icon name='plus' size={iconSize}/>
        </Menu.Item>

        <Menu.Item name='setting' active={activeItem === 'setting'} onClick={() => console.log('coming soon')}>
          <Icon name='setting' size={iconSize}/>
        </Menu.Item>

        <Menu.Item
          name='log out'
          active={activeItem === 'log out'}
          onClick={this.logoutHandler}
        >
          <Icon name='log out' size={iconSize}/>
        </Menu.Item>
      </Menu>
    )
  }
}
