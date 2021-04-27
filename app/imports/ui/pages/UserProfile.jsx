import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Image, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  contacts = [{
    firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii',
    image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
        'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts</Header>
        <Card>
          <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>this.contacts.firstName</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  contacts: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const contacts = Contacts.collection.find({}).fetch();
  const notes = Notes.collection.find({}).fetch();
  return {
    contacts,
    ready,
    notes,
  };
})(UserProfile);
