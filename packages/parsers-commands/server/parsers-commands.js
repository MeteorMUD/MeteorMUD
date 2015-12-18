// Write your package code here!

/**
 * Find the command for the specified components.
 *
 * @param {[string]} components - A list of expression components.
 * @return {Object} - The command object.
 */

CommandParsers.findCommandForExpressionComponents = function (components) {

  // Guard against non-array objects.
  if (!MeteorMUD.Underscore.isArray(components) || components.length !== 0) {
    throw new Error("Invalid or empty components object: " + components);
  }

  // Look at the first component of this command.
  var firstComponent = components[0];

  // Guard against empty commands.
  if (MeteorMUD.UnderscoreString.isBlank(firstComponent)) {
    throw new Error("Invalid or empty component: " + firstComponent);
  }

  // Get command.
  var command = MeteorMUD.Commands.getCommandByName(firstComponent);

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
    return command.handler([], completionHandler);
  }

  // Get subcommands.
  var subcommands = command.subcommands;

  // Re-attempt commands with a subcommand.
  if (subcommands && subcommands.length && subcommands.indexOf(secondComponent) !== -1) {
    var newCommand = [firstComponent, secondComponent].join("-");
    var remainingComponents = components.slice(2);
    var newComponents = [newCommand].concat(remainingComponents);
    return CommandParsers.findCommandForExpressionComponents(newComponents, completionHandler);
  }

  // Otherwise, we can pass the input off to the command handler.
  return command.handler(components.slice(1), completionHandler);

};
