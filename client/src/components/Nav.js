import React, { Component } from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from  'axios';

// Components
import ModalAddCourse from './ModalAddCourse';

export default class Nav extends Component {
  state = { 
   activeItem: null,
   modalAddCourse: { open: false }
  }

  modalAddCourseToggleOpen = () => {
    this.setState(prevState => ({ modalAddCourse: {open: !prevState.modalAddCourse.open} }))
  }

  modalAddCourseOnClose = () => {
    if (this.state.modalAddCourse.open) this.modalAddCourseToggleOpen();
  }

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

        <Dropdown icon='plus' item button>
          <Dropdown.Menu>
            <Dropdown.Item icon='book' text='Course' onClick={this.modalAddCourseToggleOpen}/>
          </Dropdown.Menu>
        </Dropdown>

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

        <ModalAddCourse 
          modalAddCourseOnClose={this.modalAddCourseOnClose}
          modalAddCourseOpen={this.state.modalAddCourse.open}
          modalAddCourseToggleOpen={this.modalAddCourseToggleOpen}

          api={this.props.api}
          updateList={this.props.updateList}
        />
      </Menu>
    )
  }
}
