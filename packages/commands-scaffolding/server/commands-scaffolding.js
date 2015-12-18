// Write your package code here!

// The scaffolding command.
ScaffoldingCommand = {};

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
      message: "Could not execute '" + ScaffoldingCommand.name + "' command because you didn't specify a valid subcommand.",
      reason: "Valid subcommands for '" + ScaffoldingCommand.name + "' are " + MeteorMUD.UnderscoreString.toSentenceSerial(subcommands) + "."
    },
  });
};

// The "yell" scaffolding command.
YellCommand = {};

// Sets the command name.
YellCommand.name = "scaffolding-yell";

// Sets the command summary.
YellCommand.summary = ScaffoldingCommand.summary;

// Sets the command text.
YellCommand.text = ScaffoldingCommand.text;

// Sets the command categories.
YellCommand.categories = ScaffoldingCommand.categories;

// Sets the command search terms.
YellCommand.searchTerms = ScaffoldingCommand.searchTerms;

// Sets the command permsissions.
YellCommand.permissions = ScaffoldingCommand.permissions;

// Sets the command type.
YellCommand.type = ScaffoldingCommand.type;

/**
 * Handle the command.
 *
 * @param {[string]} arguments - The arguments supplied to the command.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

YellCommand.handler = function (arguments, completionHandler) {

  // Fail catastrophically if we're passed an arguments object that isn't an array.
  if (!MeteorMUD.Underscore.isArray(arguments)) {
    throw new Error("Arguments is not an array.");
  }

  var message = "<b>" + Meteor.user().username + " yells</b>: " + arguments.join(" ");
  var cleanedMessage = MeteorMUD.Schemas.Message.clean({
    message: message,
  });
  UserStatus.connections.find({}).fetch().forEach(function (connection) {
    MeteorMUD.Output.sendOutput(connection._id, cleanedMessage);
  });

  // Otherwise, list the valid subcommands.
  // Should shift this to some functionality of Commands.
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: "Yelled '" + arguments.join(" ") + "'.",
  });
};


// The "tell" scaffolding command.
TellCommand = {};

// Sets the command name.
TellCommand.name = "scaffolding-tell";

// Sets the command summary.
TellCommand.summary = ScaffoldingCommand.summary;

// Sets the command text.
TellCommand.text = ScaffoldingCommand.text;

// Sets the command categories.
TellCommand.categories = ScaffoldingCommand.categories;

// Sets the command search terms.
TellCommand.searchTerms = ScaffoldingCommand.searchTerms;

// Sets the command permsissions.
TellCommand.permissions = ScaffoldingCommand.permissions;

// Sets the command type.
TellCommand.type = ScaffoldingCommand.type;

/**
 * Handle the command.
 *
 * @param {[string]} arguments - The arguments supplied to the command.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

TellCommand.handler = function (arguments, completionHandler) {

  // Fail catastrophically if we're passed an arguments object that isn't an array.
  if (!MeteorMUD.Underscore.isArray(arguments)) {
    throw new Error("Arguments is not an array.");
  }

  var message = "<b>" + Meteor.user().username + " tells you</b>: " + arguments.slice(1).join(" ");
  var cleanedMessage = MeteorMUD.Schemas.Message.clean({
    message: message,
  });
  var userId = Meteor.users.findOne({ username: arguments[0] })._id;
  UserStatus.connections.find({ userId: userId }).fetch().forEach(function (connection) {
    MeteorMUD.Output.sendOutput(connection._id, cleanedMessage);
  });

  // Otherwise, list the valid subcommands.
  // Should shift this to some functionality of Commands.
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: "Told " + arguments[0] + " '" + arguments.slice(1).join(" ") + "'.",
  });
};

// The "who" scaffolding command.
WhoCommand = {};

// Sets the command name.
WhoCommand.name = "scaffolding-who";

// Sets the command summary.
WhoCommand.summary = ScaffoldingCommand.summary;

// Sets the command text.
WhoCommand.text = ScaffoldingCommand.text;

// Sets the command categories.
WhoCommand.categories = ScaffoldingCommand.categories;

// Sets the command search terms.
WhoCommand.searchTerms = ScaffoldingCommand.searchTerms;

// Sets the command permsissions.
WhoCommand.permissions = ScaffoldingCommand.permissions;

// Sets the command type.
WhoCommand.type = ScaffoldingCommand.type;

/**
 * Handle the command.
 *
 * @param {[string]} arguments - The arguments supplied to the command.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

WhoCommand.handler = function (arguments, completionHandler) {

  // Fail catastrophically if we're passed an arguments object that isn't an array.
  if (!MeteorMUD.Underscore.isArray(arguments)) {
    throw new Error("Arguments is not an array.");
  }

  // Build the list of online users.
  var onlineUsers = Meteor.users.find({ "status.online": true }).fetch().map(function (user) {
    return user.username;
  });

  var message = "<b>Online</b>: " + MeteorMUD.UnderscoreString.toSentenceSerial(onlineUsers) + ".";

  // Print the list.
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: message,
  });
};

Meteor.startup(function () {
  // Startup code goes here.

  // Clean the command.
  Schemas.Command.clean(ScaffoldingCommand);

  // Add the scaffolding command.
  MeteorMUD.Commands.addCommand(ScaffoldingCommand);

  // Clean the command.
  Schemas.Command.clean(YellCommand);

  // Add the yell command.
  MeteorMUD.Commands.addCommand(YellCommand);

  // Add the yell subcommand.
  MeteorMUD.Commands.addSubcommand("scaffolding", "yell");

  // Clean the command.
  Schemas.Command.clean(TellCommand);

  // Add the tell command.
  MeteorMUD.Commands.addCommand(TellCommand);

  // Add the tell subcommand.
  MeteorMUD.Commands.addSubcommand("scaffolding", "tell");

  // Clean the command.
  Schemas.Command.clean(WhoCommand);

  // Add the who command.
  MeteorMUD.Commands.addCommand(WhoCommand);

  // Add the who subcommand.
  MeteorMUD.Commands.addSubcommand("scaffolding", "who");


});

