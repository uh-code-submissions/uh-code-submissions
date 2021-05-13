import React from 'react';
import { Card, Grid, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List class table. See pages/Listclass.jsx. */
class Class extends React.Component {
  render() {
    return (
      <Grid.Column textAlign='center' floated="left" width={4}>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.class.classAlpha}</Card.Header>
            <Card.Meta>{this.props.class.classNumber}</Card.Meta>
            <Card.Description>
              {this.props.class.className}
            </Card.Description>
          </Card.Content>
          <Label active color='grey' size='small'><Link to={`/editClass/${this.props.class._id}`} id="editClassButton">Edit Class</Link></Label>
        </Card>

      </Grid.Column>
    );
  }
}

// Require a document to be passed to this component.
Class.propTypes = {
  class: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Class);
