import React from 'react';
import { Card, Image, Grid, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Contact extends React.Component {
  render() {
    const leftGrid = { marginLeft: '20px' };
    return (
      <Grid.Column textAlign='center' floated="left" width={5} style={leftGrid}>
        <Card>
          <Card.Content>
            <Image
              floated='left'
              size='large'
              src={this.props.contact.image}
            />
            <Card.Header>{this.props.contact.name}</Card.Header>
            <Card.Meta>{this.props.contact.username}</Card.Meta>
            <Card.Description>
              {this.props.contact.bio}
            </Card.Description>
          </Card.Content>
          <Label active color='grey' size='big'><Link to={`/editprofile/${this.props.contact._id}`} id="editUserButton">Edit Profile</Link></Label>
        </Card>
      </Grid.Column>
    );
  }
}

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Contact);
