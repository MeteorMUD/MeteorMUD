// Write your package code here!

// Sets the command name.
ScaffoldingCommand.name = "scaffolding";

// Sets the command summary.
ScaffoldingCommand.summary = "A collection of temporary commands implemented for testing purposes.";

// Sets the command text.
ScaffoldingCommand.text = "The <em>scaffolding</em> command is just a collection of unrelated commands that will used for testing and removed as their replacements are developed.<br/>"
  + "For example, say that I want to implement a broadcasting functionality that will allow an admin to broadcast a message to all connected users.  I can implement the broad strokes under scaffolding, see that it works, and then implement a more final version in its own package.<br/>"
  + "This should make it easier to develop complicated functionality, since I can get a quick-and-dirty form implemented and then develop each component in a secure and reliable form once the proof-of-concept has been shown to work.<br/>";

// Sets the command categories.
ScaffoldingCommand.categories = ["Commands", "OOC Commands"];

// Sets the command search terms.
ScaffoldingCommand.searchTerms = ["scaffolding", "temporary", "wizard", "admin"];

// Sets the command permsissions.
ScaffoldingCommand.permissions = ["nathan"];

// Sets the command type.
ScaffoldingCommand.type = ["Developer"];

/**
 * Handle the command.
 *
 * @param {[string]} arguments - The arguments supplied to the command.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

ScaffoldingCommand.handler = function (arguments, completionHandler) {

  // Fail catastrophically if we're passed an arguments object that isn't an array.
  if (!MeteorMUD.Underscore.isArray(arguments)) {
    throw new Error("Arguments is not an array.");
  }

  // "Scaffolding" by itself isn't a valid command, so let's check the subcommands.
  var subcommands = ScaffoldingCommand.subcommands;

  // Catch the case where we don't have any subcommands.
  if (!subcommands || subcommands.length === 0) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        message: "Could not execute '" + ScaffoldingCommand.name + "' command.",
        reason:  "'" + ScaffoldingCommand.name + "'  is not fully implemented; wait until there are subcommands!",
      },
    });
  }

  // Otherwise, list the valid subcommands.
  // Should shift this to some functionality of Commands.
  return MeteorMUD.complete(completionHandler, {
    success: false,
    error: {
      message: "Could not execute 'scaffolding' command.",
      reason: "Valid subcommands for '" + ScaffoldingCommand.name + "' are " + MeteorMUD.UnderscoreString.toSentenceSerial(subcommands) + "."
    },
  });
};

Meteor.startup(function () {
  // Startup code goes here.

  // Clean the command.
  Schemas.Command.clean(ScaffoldingCommand);

  // Add the help command.
  MeteorMUD.Commands.addCommand(ScaffoldingCommand);

});
