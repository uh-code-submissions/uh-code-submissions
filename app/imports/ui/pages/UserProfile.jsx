import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid, Icon, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '../components/Contact.jsx';
import Class from '../components/Class.jsx';
import { Contacts } from '../../api/contact/Contacts';
import { Classes } from '../../api/classes/Classes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id='userprofile-page'>
        <Header as="h2" textAlign="center">My Profile</Header>
        <Grid centered columns={3}>
          <Grid.Column textAlign='center'>
            <Card.Group>
              {this.props.contacts.map((contact, index) => <Contact key={index} contact={contact}/>)}
            </Card.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' color="black">
              <Icon name="student" size="large"/> Classes Taken:
            </Header>
            <Card.Group centered>
              <Header as='h3' color="black">
                <Icon name="pencil square" size="large"/>My Problems
              </Header>
              <Card>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image='/images/Panda.png' size="medium"/>
                      <Feed.Content>
                        <Feed.Date content='1 day ago' />
                        <Feed.Summary>
                          You added <a>Two Sum</a> to the Problems Page.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='/images/Panda.png' size="medium"/>
                      <Feed.Content>
                        <Feed.Date content='3 days ago' />
                        <Feed.Summary>
                          You added <a>Knapsack</a> to the Problems Page.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='/images/Panda.png' size="medium"/>
                      <Feed.Content>
                        <Feed.Date content='4 days ago' />
                        <Feed.Summary>
                          You added <a>Sudoku Solver</a> to the Problems Page.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                      <Feed.Label image='/images/Panda.png' size="medium"/>
                      <Feed.Content>
                        <Feed.Date content='5 days ago' />
                        <Feed.Summary>
                          You added <a>Count Bits</a> to the Problems Page.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                      <Feed.Label image='/images/Panda.png' size="medium"/>
                      <Feed.Content>
                        <Feed.Date content='7 days ago' />
                        <Feed.Summary>
                          You added <a>Decimal to Roman</a> to the Problems Page.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Card.Group>

          </Grid.Column>
          <Grid.Column>
            <Header as='h3' color="black">
              <Icon name="student" size="large"/> Submitted Solutions:
            </Header>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  contacts: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const classSub = Meteor.subscribe(Classes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && classSub.ready();
  // Get the Stuff documents
  const classes = Classes.collection.find({}).fetch();
  const contacts = Contacts.collection.find({}).fetch();
  return {
    classes,
    contacts,
    ready,
  };
})(UserProfile);
