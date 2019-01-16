import React, { Component } from 'react';
import {
  BrowserRouter, 
  Route,
  Switch, 
  Redirect
} from 'react-router-dom'

// Components
import Login    from './components/Login';
import Register from './components/Register';
import Home     from './components/Home';

import * as api from './apiRequests';

 
/*                         *\
 * TESTING VideoSearch Component *
/*                         */
import VideoSearch from './components/VideoSearch';
/*                         *\
 * TESTING VideoSearch Component *
/*                         */
/*                         *\
 * TESTING ImageSearch Component *
/*                         */
import ImageSearch from './components/ImageSearch';
/*                         *\
 * TESTING ImageSearch Component *
/*                         */

export default class App extends Component {
  state = {
    user: null,
    err: null
  }

  componentDidMount() {
    api.user.profile()
      .then(res => {
        this.userState('set', res.data)
      })
      .catch(err => {});
  }

  userState = (status, data=null) => {
    if (status === 'clear') this.setState({ user: null });
    else if (status === 'set') this.setState({ user: {...data} });
  }

  errState = (status, err=null) => {
    if (status === 'clear') this.setState({ err: null });
    else if (status === 'set') this.setState({ err: err.response.data.message });
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>

          <Route exact path='/' render={ () => <Redirect to='/home' /> } />

          {/* testing video search functionality */}
          <Route path='/video-search' component={VideoSearch}/>
          {/* testing image search functionality */}
          <Route path='/image-search' component={ImageSearch}/>

          <Route 
            path='/home' 
            render={ 
              () =>  (
                <Home 
                  api={api} 
                  userState={this.userState} 
                  user={this.state.user} 
                  err={this.state.err}
                  errState={this.errState}
                /> 
              )
            } 
          />

          <Route 
            path='/login' 
            render={ 
              () => (
                <Login  
                  api={api} 
                  userState={this.userState} 
                  user={this.state.user} 
                  err={this.state.err}
                  errState={this.errState}
                /> 
              )
            } 
          />

          <Route 
            path='/register' 
            render={ 
              () => (
                <Register 
                  api={api} 
                  userState={this.userState} 
                  user={this.state.user} 
                  err={this.state.err}
                  errState={this.errState}
                /> 
              )
            } 
          />

        </div>
      </BrowserRouter>
    );
  }
}
