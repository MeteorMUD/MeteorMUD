// Write your package code here!

/**
 * Parse an expression.
 *
 * @param {string} expression - An expression to parse.
 * @param {function} completionHandler - A completion handler that takes a
 * completion object.
 */

ExpressionParser.parseExpression = function (expression, completionHandler) {

  // Clean the string, if it hasn't been already.
  expression = MeteorMUD.UnderscoreString.clean(expression);

  // Guard against empty expressions.
  if (MeteorMUD.UnderscoreString.isBlank(expression)) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        message: "Could not parse expression '" + expression + "'.",
        reason: "The expression '" + expression + "' was blank or otherwise trivial.",
      },
    });
  }

  // Try to find a corresponding command.
  return ExpressionParser.findCommandForExpressionComponents(expression.split(" "), completionHandler);
};

/**
 * Find the command for the specified components.
 *
 * @param {[string]} components - A list of expression components.
 * @param {function} completionHandler - A completion handler that takes a
 * completion object.
 */

ExpressionParser.findCommandForExpressionComponents = function (components, completionHandler) {

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
  var command = MeteorMUD.Commands.getCommand(firstComponent);

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
