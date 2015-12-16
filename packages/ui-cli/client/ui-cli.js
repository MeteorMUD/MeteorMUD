// Write your package code here!

Meteor.subscribe("ui-cli");

// The collection we're using to manage this stuff.
CLI.collection = new Meteor.Collection("ui-cli");

/**
 * Returns all output directed to this session.
 *
 * @return {Cursor} - A reactive cursor to the output we desired.
 */

CLI.getOutput = function () {
  return this.collection.find({});
};
