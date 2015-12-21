// Write your package code here!

/**
 * Processes an input string.
 *
 * @param {string} inputString - A string containing a command.
 * @param {string} sessionId - The session ID of the submitting session.
 * @param {function} completionHandler - A completion handler that takes an
 * object.
 */

CLIParser.parseInputString = function (inputString, sessionId, completionHandler) {

  // Default failure message.
  var message = "Could not execute input '" + inputString + "'.";

  // Guard against empty command strings.
  if (MeteorMUD.UnderscoreString.isBlank(inputString)) {
    return MeteorMUD.complete(completionHandler, {
      success: false,
      error: {
        message: message,
        reason: "The input string '" + inputString + "' is invalid or blank.",
      },
    });
  }

  // Clean the string.
  inputString = MeteorMUD.UnderscoreString.clean(inputString);

  // Split the expressions into separate expressions...
  var expressions = inputString.split(MeteorMUD.Parsers.RegExes.EXPRESSIONS);

  // Don't pass any blank ones...
  expressions = expressions.filter(function (string) {
    return !MeteorMUD.UnderscoreString.isBlank(string);
  });

  // And make sure they're all clean...
  expressions = expressions.map(MeteorMUD.UnderscoreString.clean);

  // Then send them off to the command parser.
  expressions.forEach(function (expression) {
    MeteorMUD.Parsers.Expressions.parseExpression(expression, sessionId, completionHandler);
  });

};
