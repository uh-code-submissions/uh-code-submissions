import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Problem from '../components/Problem';
import { Problems } from '../../api/problem/Problems';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProblemPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Card.Group>
          {this.props.problems.map((problem, index) => <Problem
            key={index}
            problem={problem}
            notes={this.props.notes.filter(note => (note.problemId === problem._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProblemPage.propTypes = {
  problems: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Problems.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const problems = Problems.collection.find({}).fetch();
  const notes = Notes.collection.find({}).fetch();
  return {
    problems,
    ready,
    notes,
  };
})(ProblemPage);
