import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  componentWillUnmount() {
    this.props.errState('clear');
  }
  
  emailHandler = e => this.setState({ email: e.target.value });

  passwordHandler = e => this.setState({ password: e.target.value });

  submitHandler = e => {
    e.preventDefault();
    this.props.api.user.login(this.state)
      .then(res => {
        this.props.userState('set', res.data)
      })
      .catch(err => {
        this.props.errState('set', err)
      });
  };

  render() {
    if (this.props.user) {
      return <Redirect to='/home' />
    }
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              pratiquez!
            </Header>
            <Form size='large' onSubmit={this.submitHandler} error={this.props.err ? true : false}>
              <Message
                error
                header='Hmmm...'
                content={this.props.err}
              />
              <Segment stacked>
                <Form.Input 
                  fluid 
                  icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail address'
                  name='email'
                  type='email'
                  required
                  onChange={this.emailHandler}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  required
                  onChange={this.passwordHandler}
                />

                <Button type="submit" color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New? <NavLink to='/register'>Sign Up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login
