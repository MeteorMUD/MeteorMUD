// Write your package code here!

/**
 * Parse an expression.
 *
 * @param {string} expression - An expression to parse.
 * @param {string} sessionId - The ID of the session.
 * @param {function} completionHandler - A completion handler that takes a
 * completion object.
 */

ExpressionParser.parseExpression = function (expression, sessionId, completionHandler) {

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
  return MeteorMUD.Parsers.Commands.findCommandForExpressionComponents(expression.split(" "), sessionId, completionHandler);
};
