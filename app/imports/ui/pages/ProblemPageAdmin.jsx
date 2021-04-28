import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProblemAdmin from '../components/ProblemAdmin';
import { Problems } from '../../api/problem/Problems';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProblemPageAdmin extends React.Component {

render() {
  return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, category, description } = data;
    const owner = Meteor.user().username;
    Problems.collection.insert({ title, category, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Problems</Header>
        <Card.Group centered>
          {this.props.problems.map((problem, index) => <ProblemAdmin
            key={index}
            problem={problem}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProblemPageAdmin.propTypes = {
  problems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Problems.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const problems = Problems.collection.find({}).fetch();
  return {
    problems,
    ready,
  };
})(ProblemPageAdmin);
