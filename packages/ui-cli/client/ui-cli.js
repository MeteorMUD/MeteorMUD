// Write your package code here!

Meteor.subscribe("ui-cli", "ui-cli");

// The collection we're using to manage this stuff.
CLI.collection = new Meteor.Collection("ui-cli");

/**
 * Sends some string from the command line.
 *
 * @param {string} inputString - The input string we wish to send to the
 * server.
 */

CLI.sendInputString = function (inputString) {
  Meteor.call("sendInputString", inputString);
};

/**
 * Returns all output directed to this session.
 *
 * @return {Cursor} - A reactive cursor to the output we desired.
 */

CLI.getOutput = function () {
  return this.collection.find({});
};
