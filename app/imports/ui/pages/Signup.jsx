import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, TextArea, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Contacts } from '../../api/contact/Contacts';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '', bio: '', image: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { name, email, password, bio, image } = this.state;
    Accounts.createUser({ name, email, username: email, password, bio, image }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    Contacts.collection.insert({ email: email, name: name, image: image, bio: bio }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div className="code-landing-background">
        <Container id="signup-page">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Header as="h2" textAlign="center">
                    Register
                  </Header>
                  <Form.Input
                    required
                    label="Email"
                    id="signup-form-email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    required
                    label="Password"
                    id="signup-form-password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Group>
                    <Form.Input
                      width={16}
                      required
                      label="Your Name"
                      id="signup-form-name"
                      name="name"
                      type="name"
                      placeholder="First Name, Last Name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Field>
                    <Form.Input
                      width={16}
                      required
                      label="Image"
                      id="signup-form-image"
                      name="image"
                      type="String"
                      placeholder="Image URL"
                      onChange={this.handleChange}
                    />

                  </Form.Field>
                  <Form.Field
                    control={TextArea}
                    label='Bio'
                    name="bio"
                    placeholder='Tell us more about you...'
                    onChange={this.handleChange}
                  />
                  <Form.Field control={Button}>Submit</Form.Field>
                </Segment>
              </Form>
              <Message>
              Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Registration was not successful"
                  content={this.state.error}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
