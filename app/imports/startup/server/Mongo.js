import { Meteor } from 'meteor/meteor';
import { Problems } from '../../api/problem/Problems.js';

/* eslint-disable no-console */

function addProblem(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Problems.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Problems.collection.find().count() === 0) {
  if (Meteor.settings.defaultProblems) {
    console.log('Creating default Problems.');
    Meteor.settings.defaultProblems.map(data => addProblem(data));
  }
}
