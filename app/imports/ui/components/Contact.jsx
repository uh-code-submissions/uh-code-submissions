import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Contact extends React.Component {
  render() {
    return (
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
            {this.props.contact.bio} Rating: {this.props.contact.rating}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Contact);
