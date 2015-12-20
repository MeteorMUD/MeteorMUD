// Write your package code here!

// Local reference to the Help object.
var Help = MeteorMUD.Help;

// The available command types.
var types = [];

/**
 * Adds a new command type.
 *
 * @param {string} type - The command type.
 */

Commands.addCommandType = function (type) {
  if (types.indexOf(type) !== -1) {
    types.push(type);
    types.sort();
    types = MeteorMUD.Underscore.uniq(types, true);
  }
};

// Minimum acceptable command name length.
var minimumNameLength = 2;

// Maximum acceptable command name length.
var maximumNameLength = 20;

// Validates a command name.
function isValidCommandName(name) {

  // Guard against non-strings and empty/blank strings.
  if (MeteorMUD.UnderscoreString.isBlank(name)) {
    return false;
  }

  // Make sure this is a lower case, alphanumeric string or hyphenated string
  // within the length guidelines.
  var expression = '^[a-z0-9\-]{' + minimumNameLength.toString() + ',' + maximumNameLength.toString() + '}$';
  if (!(new RegExp(expression)).test(name)) {
    return false;
  }

  // Otherwise, return true.
  return true;
}

/**
 * Constructs a help topic for a command.
 *
 * @param {Object} command - The command from which a help topic should be generated.
 * @return {Object} - The help topic.
 */

Help.topicForCommand = function (command) {

  // Compute the result.
  var result = {
    name: command.name,
    uniqueName: "meteormud_help_command_" + command.name,
    title: MeteorMUD.UnderscoreString.capitalize(command.name) + " (" + command.type + " Command)",
    summary: command.summary,
    categories: command.categories,
    searchTerms: command.searchTerms,
    seeAlso: command.seeAlso,
    permissions: command.permissions,
    text: command.text,
    format: "help",
  };

  // Return the result.
  return result;
};

/**
 * Inserts a topic for a command into the help system.
 *
 * @param {Object} command - The command to insert into the help system.
 */

Commands.insertHelpTopicForCommand = function (command) {

  var topic = Help.topicForCommand(command);

  // Clean the topic.
  Schemas.Help.clean(topic);

  // Insert the topic.
  Help.insertTopic(topic);

};

// The internal mapping between command names and objects.
var commands = {};

// Sets a command.
function setCommand(name, command) {
  check(name, String);
  check(command, Object);
  commands[name] = command;
}

// Gets a command function.
function getCommand(name) {
  check(name, String);
  return commands[name];
}

// Deletes a command function.
function deleteCommand(name) {
  check(name, String);
  delete commands[name];
}

/**
 * Adds a command.
 *
 * @param {string} commandName - A command name.
 * @param {string} subcommandName - The subcommand name.
 */

Commands.addCommand = function (command) {

  // Fail catastrophically if the command object is invalid.
  if (!MeteorMUD.Underscore.isObject(command)) {
    throw new Error("Could not add a command with an invalid object.");
  }

  // Extract the command name.
  var commandName = command.name;

  // Guard against invalid command names.
  if (!isValidCommandName(commandName)) {
    throw new Error("The command name '" + commandName + "' is invalid.");
  }

  // Guard against cases where the command is already registered.
  if (getCommand(commandName)) {
    throw new Error("The command '" + commandName + "' already exists.");
  }

  // Otherwise, set the command.
  setCommand(commandName, command);

  // And set the help topic.
  Commands.insertHelpTopicForCommand(command);

};

/**
 * Gets a command by name.
 *
 * @param {string} commandName - A string containing a command name or command names.
 * @param {string} sessionId - The session ID of the submitting session.
 * @return {object} - The command, if found.
 */

Commands.getCommand = function (commandName, sessionId) {
  var result = getCommand(commandName);
  if (result && result.permissions && result.permissions.length) {
    var userId = MeteorMUD.Accounts.userIdForSessionId(sessionId);
    if (!Roles.userIsInRole(userId, result.permissions, sessionId)) {
    // var userPermissions = Meteor.users.findOne(userId).roles.__global_roles__;
    // console.log("Rejecting command '" + commandName + "' because of insufficient permissions (" + userPermissions + ") vs (" + result.permissions + ").");
      result = undefined;
    }
  }
  return result;
}

/**
 * Adds a subcommand to an existing command.
 *
 * @param {string} commandName - A command name.
 * @param {string} subcommandName - The subcommand name.
 */

Commands.addSubcommand = function (commandName, subcommandName) {

  // Guard against invalid command names.
  if (!isValidCommandName(commandName)) {
    throw new Error("The command name '" + commandName + "' is invalid.");
  }

  // Guard against invalid subcommand names.
  if (!isValidCommandName(subcommandName)) {
    throw new Error("The subcommand name '" + subcommandName + "' is invalid or blank.");
  }

  // Get parent command.
  var parentCommand = getCommand(commandName);

  // Guard against cases where the command is not registered.
  if (!parentCommand) {
    throw new Error("The command '" + commandName + "' does not exist.");
  }

  // Get subcommands.
  var subcommands = parentCommand.subcommands;
  if (!subcommands) {
    subcommands = parentCommand.subcommands = [];
  }

  // Guard against cases where the subcommand already exists.
  if (subcommands.indexOf(subcommandName) !== -1) {
    throw new Error("The subcommand '" + subcommandName + "' is already registered.");
  }

  // Otherwise, push the subcommand.
  subcommands.push(subcommandName); 
};
