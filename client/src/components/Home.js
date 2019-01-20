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
    <div>
      <Route exact path='/home' render={ () => <Main api={props.api} user={props.user} userState={props.userState} errState={props.errState}/> }/>
      <Route path='/home/courses' render={ () => <div>{'courses'}</div> }/>
      <Route path='/home/sections' render={ () => <div>{'sections'}</div> }/>
      <Route path='/home/notes' render={ () => <div>{'notes'}</div> }/>
      <Route path='/home/terms' render={ () => <div>{'terms'}</div> }/>
    </div>
  );
};
