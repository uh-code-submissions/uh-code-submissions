import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Select, TextArea, Checkbox, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

const classStanding = [
  { key: 'f', text: 'Freshmen', value: 'F' },
  { key: 'so', text: 'Sophomore', value: 'S' },
  { key: 'j', text: 'Junior', value: 'J' },
  { key: 'se', text: 'Senior', value: 'S' },
  { key: 'o', text: 'Other', value: 'O' },
];

const genderOptions = [
  { key: 'f', text: 'Female', value: 'F' },
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'o', text: 'Other', value: 'O' },
];

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '', classesTaken: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, email, password, classesTaken } = this.state;
    Accounts.createUser({ firstName, lastName, email, username: email, password, classesTaken }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
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
                      width={8}
                      required
                      label="First Name"
                      id="signup-form-firstName"
                      name="firstName"
                      type="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      width={8}
                      required
                      label="Last Name"
                      id="signup-form-lastName"
                      name="lastName"
                      type="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                      inverted
                      fluid
                      required
                      label="Class Standing"
                      name="classStanding"
                      placeholder="Class Standing"
                      control={Select}
                      options={classStanding}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      inverted
                      fluid
                      required
                      label="Age"
                      name="age"
                      placeholder="Age"
                      type="number"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      inverted
                      fluid
                      required
                      label="Gender"
                      name="genderOptions"
                      placeholder="Gender"
                      control={Select}
                      options={genderOptions}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form>
                    <Form.Field
                      control={TextArea}
                      label='Bio'
                      placeholder='Tell us more about you...'
                    />
                    <Form.Field
                      required
                      control={Checkbox}
                      label='I agree to the Terms and Conditions'
                    />
                    <Form.Field control={Button}>Submit</Form.Field>
                  </Form>
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
