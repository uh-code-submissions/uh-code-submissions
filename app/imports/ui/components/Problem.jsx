import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Problem extends React.Component {
  render() {
    return (
      <Link to="/solution">
        <Card>
          <Card.Content>
            <Card.Header>{this.props.problem.title}</Card.Header>
            <Card.Meta>{this.props.problem.category}</Card.Meta>
            <Card.Description>
              {this.props.problem.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

// Require a document to be passed to this component.
Problem.propTypes = {
  problem: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Problem);
