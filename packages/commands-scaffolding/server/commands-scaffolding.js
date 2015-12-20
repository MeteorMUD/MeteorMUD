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
ScaffoldingCommand.permissions = [
  MeteorMUD.Roles.ADMIN,          // Allow ADMIN.
  MeteorMUD.Roles.DEVELOPER,      // Allow DEVELOPER.
];

// Sets the command type.
ScaffoldingCommand.type = "Developer";

/**
 * Handle the command.
 *
 * @param {[string]} arguments - The arguments supplied to the command.
 * @param {string} sessionId - The session Id.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

ScaffoldingCommand.handler = function (arguments, sessionId, completionHandler) {

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

// The "echo" scaffolding command.
EchoCommand = {};
EchoCommand.name = "scaffolding-echo";
EchoCommand.summary = ScaffoldingCommand.summary;
EchoCommand.text = ScaffoldingCommand.text;
EchoCommand.categories = ScaffoldingCommand.categories;
EchoCommand.searchTerms = ScaffoldingCommand.searchTerms;
EchoCommand.permissions = ScaffoldingCommand.permissions;
EchoCommand.type = ScaffoldingCommand.type;
EchoCommand.handler = function (arguments, sessionId, completionHandler) {
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: arguments.join(" "),
  });
};

// The "help" scaffolding command.
HelpCommand = {};
HelpCommand.name = "scaffolding-help";
HelpCommand.summary = ScaffoldingCommand.summary;
HelpCommand.text = ScaffoldingCommand.text;
HelpCommand.categories = ScaffoldingCommand.categories;
HelpCommand.searchTerms = ScaffoldingCommand.searchTerms;
HelpCommand.permissions = ScaffoldingCommand.permissions;
HelpCommand.type = ScaffoldingCommand.type;
HelpCommand.handler = function (arguments, sessionId, completionHandler) {
  var topics = MeteorMUD.Help.getTopics({name: arguments.join(" ")}).fetch();
  if (!topics || topics.length === 0) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        error: "No help topics found!",
        reason: "You searched for something that doesn't exist.",
        suggestion: "Try searching for something better.",
      },
    });
  }
  if (topics.length > 1) {
    var topicNames = topics.map(function (topic) {
      return topic.name;
    });
    return MeteorMUD.complete(completionHandler, {
      success: true,
      message: "Found multiple matching topics: " + MeteorMUD.UnderscoreString.toSentenceSerial(topicNames) + ".",
    });
  }
  return MeteorMUD.complete(completionHandler, {
    success: true,
    objects: [
      topics[0],
    ],
  });
};

// The "su" scaffolding command.
SuCommand = {};
SuCommand.name = "scaffolding-su";
SuCommand.summary = ScaffoldingCommand.summary;
SuCommand.text = ScaffoldingCommand.text;
SuCommand.categories = ScaffoldingCommand.categories;
SuCommand.searchTerms = ScaffoldingCommand.searchTerms;
SuCommand.permissions = [MeteorMUD.Roles.GUEST];
SuCommand.type = ScaffoldingCommand.type;
SuCommand.handler = function (arguments, sessionId, completionHandler) {
  Roles.addUsersToRoles(MeteorMUD.Accounts.userIdForSessionId(sessionId), Roles.ADMIN, Roles.GLOBAL_GROUP);
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: "Superuser status granted.",
  });
};

// The "tell" scaffolding command.
TellCommand = {};
TellCommand.name = "scaffolding-tell";
TellCommand.summary = ScaffoldingCommand.summary;
TellCommand.text = ScaffoldingCommand.text;
TellCommand.categories = ScaffoldingCommand.categories;
TellCommand.searchTerms = ScaffoldingCommand.searchTerms;
TellCommand.permissions = ScaffoldingCommand.permissions;
TellCommand.type = ScaffoldingCommand.type;
TellCommand.handler = function (arguments, sessionId, completionHandler) {
  var message = "<b>" + Meteor.user().username + " tells you</b>: " + arguments.slice(1).join(" ");
  var cleanedMessage = MeteorMUD.Schemas.Message.clean({
    message: message,
  });
  var userId = Meteor.users.findOne({ username: arguments[0] })._id;
  UserStatus.connections.find({ userId: userId }).fetch().forEach(function (connection) {
    MeteorMUD.Output.sendOutput(connection._id, cleanedMessage);
  });
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: "Told " + arguments[0] + " '" + arguments.slice(1).join(" ") + "'.",
  });
};

// The "who" scaffolding command.
WhoCommand = {};
WhoCommand.name = "scaffolding-who";
WhoCommand.summary = ScaffoldingCommand.summary;
WhoCommand.text = ScaffoldingCommand.text;
WhoCommand.categories = ScaffoldingCommand.categories;
WhoCommand.searchTerms = ScaffoldingCommand.searchTerms;
WhoCommand.permissions = ScaffoldingCommand.permissions;
WhoCommand.type = ScaffoldingCommand.type;
WhoCommand.handler = function (arguments, sessionId, completionHandler) {
  var onlineUsers = Meteor.users.find({ "status.online": true }).fetch().map(function (user) {
    return user.username;
  });
  var message = "<b>Online</b>: " + MeteorMUD.UnderscoreString.toSentenceSerial(onlineUsers) + ".";
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: message,
  });
};

// The "yell" scaffolding command.
YellCommand = {};
YellCommand.name = "scaffolding-yell";
YellCommand.summary = ScaffoldingCommand.summary;
YellCommand.text = ScaffoldingCommand.text;
YellCommand.categories = ScaffoldingCommand.categories;
YellCommand.searchTerms = ScaffoldingCommand.searchTerms;
YellCommand.permissions = ScaffoldingCommand.permissions;
YellCommand.type = ScaffoldingCommand.type;
YellCommand.handler = function (arguments, sessionId, completionHandler) {
  var message = "<b>" + Meteor.user().username + " yells</b>: " + arguments.join(" ");
  var cleanedMessage = MeteorMUD.Schemas.Message.clean({
    message: message,
  });
  UserStatus.connections.find({}).fetch().forEach(function (connection) {
    MeteorMUD.Output.sendOutput(connection._id, cleanedMessage);
  });
  return MeteorMUD.complete(completionHandler, {
    success: true,
    message: "Yelled '" + arguments.join(" ") + "'.",
  });
};

Meteor.startup(function () {
  // Startup code goes here.

  // Clean the command.
  Schemas.Command.clean(ScaffoldingCommand);

  // Add the scaffolding command.
  MeteorMUD.Commands.addCommand(ScaffoldingCommand);

  Schemas.Command.clean(EchoCommand);
  MeteorMUD.Commands.addCommand(EchoCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "echo");

  Schemas.Command.clean(HelpCommand);
  MeteorMUD.Commands.addCommand(HelpCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "help");

  Schemas.Command.clean(SuCommand);
  MeteorMUD.Commands.addCommand(SuCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "su");

  Schemas.Command.clean(TellCommand);
  MeteorMUD.Commands.addCommand(TellCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "tell");

  Schemas.Command.clean(WhoCommand);
  MeteorMUD.Commands.addCommand(WhoCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "who");

  Schemas.Command.clean(YellCommand);
  MeteorMUD.Commands.addCommand(YellCommand);
  MeteorMUD.Commands.addSubcommand("scaffolding", "yell");

});

