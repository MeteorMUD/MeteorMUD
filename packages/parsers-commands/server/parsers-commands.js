// Write your package code here!

/**
 * Find the command for the specified components.
 *
 * @param {[string]} components - A list of expression components.
 * @param {string} sessionId - The session ID of the submitting session.
 * @param {function} completionHandler - A completion handler that takes a
 * completion object.
 */

CommandParser.findCommandForExpressionComponents = function (components, sessionId, completionHandler) {

  // Guard against non-array objects.
  if (!MeteorMUD.Underscore.isArray(components)) {
    throw new Error("Invalid components object: " + components);
  }

  // Default failure message.
  var message = "Could not execute '" + components.join(" ") + "'.";

  // Look at the first component of this command.
  var firstComponent = components[0];

  // Guard against empty commands.
  if (MeteorMUD.UnderscoreString.isBlank(firstComponent)) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        message: message,
        reason: "The command '" + firstComponent + "' is invalid.",
      },
    });
  }

  // Get command.
  var command = MeteorMUD.Commands.getCommand(firstComponent, sessionId);

  // Guard against nonexistent commands.
  if (!command) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        message: message,
        reason: "The command '" + firstComponent + "' was not understood.",
      },
    });
  }

  // See if this has a second component.
  var secondComponent = components[1];

  // Execute commands with no second component.
  if (!secondComponent) {
    return CommandParser.executeCommand(command, [], sessionId, completionHandler);
  }

  // Get subcommands.
  var subcommands = command.subcommands;

  // Re-attempt commands with a subcommand.
  if (subcommands && subcommands.length && subcommands.indexOf(secondComponent) !== -1) {
    var newCommand = [firstComponent, secondComponent].join("-");
    var remainingComponents = components.slice(2);
    var newComponents = [newCommand].concat(remainingComponents);
    return CommandParser.findCommandForExpressionComponents(newComponents, sessionId, completionHandler);
  }

  // Otherwise, we can pass the input off to the command handler.
  return CommandParser.executeCommand(command, components.slice(1), sessionId, completionHandler);
};

/**
 * Executes a specified command.
 *
 * @param {Object} command - The command to execute.
 * @param {[Object]} arguments - The arguments to supply to the command.
 * @param {string} sessionId - The session ID of the submitting session.
 * @param {function} completionHandler - The completion handler.
 *
 */

CommandParser.executeCommand = function (command, arguments, sessionId, completionHandler) {
  command.handler(arguments, sessionId, completionHandler);
};

