import React from 'react';
import { Card, Feed, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Problem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.problem.title}</Card.Header>
          <Card.Meta>{this.props.problem.category}</Card.Meta>
          <Card.Description>
            {this.props.problem.description}          </Card.Description>
          <Card.Content extra>
            <Link to={`/edit/${this.props.problem._id}`}>Edit</Link>
          </Card.Content>

        </Card.Content>
        <Card.Content extra>
          <Feed>
            {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddNote owner={this.props.problem.owner} problemId={this.props.problem._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Problem.propTypes = {
  problem: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Problem);
