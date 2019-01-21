import React, { Component } from 'react';
import {
  BrowserRouter, 
  Route,
  Switch
} from 'react-router-dom'
import { NavLink, Redirect } from 'react-router-dom'

import Main from './Main';

export default function Home(props) {
  if (!props.user) {
    return <Redirect to='/login'/>
  }
  return (
    <Route exact path='/home' render={ () => <Main api={props.api} user={props.user} userState={props.userState} errState={props.errState}/> }/>
  );
};
