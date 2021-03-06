import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Problems } from '../../api/problem/Problems';
import { Contacts } from '../../api/contact/Contacts';
import { Solutions } from '../../api/solution/Solutions';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Problems.userPublicationName, function () {
  if (this.userId) {
    return Problems.collection.find();
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

Meteor.publish(Solutions.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Solutions.collection.find({ owner: username });
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

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Solutions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Solutions.collection.find();
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
