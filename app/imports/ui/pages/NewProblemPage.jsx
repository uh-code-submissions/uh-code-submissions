import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Problems } from '../../api/problem/Problems';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  category: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class NewProblemPage extends React.Component {

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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='add-problem-page'>
        <Grid.Column>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Header as="h2" textAlign="center">Add a New Problem</Header>
              <TextField name='title' id='title-form'/>
              <TextField name='category' id='category-form'/>
              <LongTextField name='description' id='desc-form'/>
              <SubmitField value='Submit' id='problem-form-submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NewProblemPage;
