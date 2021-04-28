import { Meteor } from 'meteor/meteor';
import { Problems } from '../../api/problem/Problems.js';
import { Contacts } from '../../api/contact/Contacts.js';

/* eslint-disable no-console */

function addProblem(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Problems.collection.insert(data);
}

function addContact(data) {
  console.log(`  Adding: ${data.username} (${data.owner})`);
  Contacts.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Problems.collection.find().count() === 0) {
  if (Meteor.settings.defaultProblems) {
    console.log('Creating default Problems.');
    Meteor.settings.defaultProblems.map(data => addProblem(data));
  }
}

// Initialize the ContactsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default Contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}
