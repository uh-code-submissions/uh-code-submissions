import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProblemAdmin extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.problem.title}</Card.Header>
          <Card.Meta>{this.props.problem.category}</Card.Meta>
          <Card.Description>
            {this.props.problem.description}
          </Card.Description>
          <Card.Content extra>
            <Link to={`/edit/${this.props.problem._id}`}>Edit</Link>
          </Card.Content>

        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProblemAdmin.propTypes = {
  problem: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProblemAdmin);
