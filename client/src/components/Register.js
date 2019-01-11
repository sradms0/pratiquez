import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

export default class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  componentWillUnmount() {
    this.props.errState('clear');
  }

  firstNameHandler = e => this.setState({ firstName: e.target.value });

  lastNameHandler = e => this.setState({ lastName: e.target.value });

  emailHandler = e => this.setState({ email: e.target.value });

  passwordHandler = e => this.setState({ password: e.target.value });

  confirmPasswordHandler = e => this.setState({ confirmPassword: e.target.value });

  submitHandler = e => {
    this.props.api.user.register(this.state)
      .then(res => {
        this.props.api.user.login(this.state)
          .then(res => this.props.userState('set', res.data))
          .catch(err => this.props.errState('set', err));
      })
      .catch(err => {
        this.props.errState('set', err)
      })
  };

  render() {
    if (this.props.user) {
      return <Redirect to='/home' />
    }
    return (
      <div className='register-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.register-form {
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
                content={this.props.err}
              />
              <Segment stacked>
                <Form.Input
                  fluid
                  label='First Name'
                  name='firstName'
                  onChange={this.firstNameHandler}
                />
                <Form.Input
                  fluid
                  label='Last Name'
                  name='lastName'
                  onChange={this.lastNameHandler}
                />
                <Form.Input 
                  fluid 
                  label='E-mail Address'
                  name='email'
                  type='email'
                  required
                  onChange={this.emailHandler}
                />
                <Form.Input
                  fluid
                  label='Password'
                  name='password'
                  type='password'
                  onChange={this.passwordHandler}
                  required
                />
                <Form.Input
                  fluid
                  label='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  onChange={this.confirmPasswordHandler}
                  required
                />

                <Button type="submit" color='teal' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              Already a Member? <NavLink to='/login'>Log In</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
