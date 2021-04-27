import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Problem from '../components/ProblemAdmin';
import { Problems } from '../../api/problem/Problems';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProblemsAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Problems (Admin)</Header>
        <Card.Group>
          {this.props.problems.map((problems, index) => <Problem key={index} problems={problems} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProblemsAdmin.propTypes = {
  problems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Problems.adminPublicationName);
  return {
    problems: Problems.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProblemsAdmin);
