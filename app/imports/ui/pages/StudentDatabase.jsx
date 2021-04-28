import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import problemAdmin from '../components/ProblemAdmin';
import { Problems } from '../../api/problem/Problems';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class StudentDatabase extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Students</Header>
        <Card.Group>
          {this.props.problems.map((problem, index) => <problemAdmin key={index} problem={problem} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
StudentDatabase.propTypes = {
  problems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Problems.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const problems = Problems.collection.find({}).fetch();
  return {
    problems,
    ready,
  };
})(StudentDatabase);
