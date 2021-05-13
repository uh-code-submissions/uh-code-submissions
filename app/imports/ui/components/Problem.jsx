import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Problem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.problem.title}</Card.Header>
          <Card.Meta>{this.props.problem.category}</Card.Meta>
          <Card.Description>
            {this.props.problem.description}
          </Card.Description>
        </Card.Content>
        <Label active color='grey' size='big'><Link to={`/solution/${this.props.problem._id}`}>Submit a Solution</Link></Label>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Problem.propTypes = {
  problem: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Problem);
