import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Problems } from '../../api/problem/Problems';
import { Solutions } from '../../api/solution/Solutions';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  solution: String,
  problemID: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class Solution extends React.Component {

  // On successful submit, insert the data.
  submit(data, formRef) {
    const { solution } = data;
    const owner = Meteor.user().username;
    const problemID = this.props.problem._id;
    Solutions.collection.insert({ solution, problemID, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Header as="h2" textAlign="center">Please Enter Your Solution:</Header>
              <TextField id="problemID" name='problemID'/>
              <TextField id="owner"name='owner'/>
              <LongTextField name='solution'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
Solution.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  prob: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  problem: PropTypes.object.isRequired,
  documentId: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Problems.userPublicationName);
  const subscription2 = Meteor.subscribe(Solutions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const doc = Problems.collection.findOne(documentId);
  const prob = Problems;

  return {
    doc,
    ready,
    prob,
    documentId,
  };
})(Solution);
