// Write your package code here!

// Publish the publication.
Meteor.publish("ui-cli", MeteorMUD.Output.publisher);

/**
 * Processes some string from the command line.
 *
 * @param {Number} sessionId - The identifier of the current session.
 * @param {string} inputString - The input string we've received from the
 * client.
 */

CLI.sendInputString = function (sessionId, inputString) {
  MeteorMUD.Parsers.CLI.parseInputString(inputString, sessionId, function (completionObject) {
    MeteorMUD.Output.sendOutput(sessionId, completionObject);
  });
};


Meteor.startup(function () {
  // Startup code goes here.

});

Meteor.methods({
  // Methods go here.

  // Actually process the command.
  'sendInputString': function (inputString) {
    CLI.sendInputString(this.connection.id, MeteorMUD.UnderscoreString.clean(inputString));
  },

});
