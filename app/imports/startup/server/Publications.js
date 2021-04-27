import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Problems } from '../../api/problem/Problems';
import { Notes } from '../../api/note/Notes';
import { Contacts } from '../../api/contact/Contacts';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Problems.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Problems.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Problems.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Problems.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
