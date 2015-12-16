// Write your package code here!

// The global Schemas object.
MeteorMUD.Schemas = Schemas = {};


// A fallback schema with some useful output for when we haven't done our work.
Schemas.Fallback = new SimpleSchema({
  format: {
    type: String,
    label: "Format",
    optional: true,
    defaultValue: "fallback",
  },
  createdAt: {
    type: Date,
    label: "Created At",
    optional: true,
    autoValue: function () {
      return new Date();
    },
  },
});

// A schema representing an array of other objects.
Schemas.Array = new SimpleSchema([
  Schemas.Fallback,
  {
    array: {
      type: [Object],
      label: "Array",
      blackbox: true,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "array",
      ],
      defaultValue: "array",
    },
  },
]);

// A schema representing a standard, simple message that needs to be output to the user.
Schemas.Message = new SimpleSchema([
  Schemas.Fallback,
  {
    message: {
      type: String,
      label: "Message",
      optional: true,
      min: 0,
      max: 256,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "message",
      ],
      defaultValue: "message",
    },
  },
]);

// A schema representing an error resulting from the command or internal
// instruction.
Schemas.Error = new SimpleSchema([
  Schemas.Fallback,
  {
    message: {
      type: String,
      label: "Message",
      min: 0,
      max: 256,
    },
    reason: {
      type: String,
      label: "Reason",
      min: 0,
      max: 256,
    },
    suggestion: {
      type: String,
      label: "Suggestion",
      defaultValue: "Please contact support.",
      min: 0,
      max: 256,
    },
    backtrace: {
      type: [String],
      label: "Backtrace",
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "error",
      ],
      defaultValue: "error",
    },
  },
]);

// A schema representing the output of a command or internal instruction coupled
// with an optional success message or mandatory failure message and reason.
Schemas.Result = new SimpleSchema([
  Schemas.Fallback,
  {
    success: {
      type: Boolean,
      label: "Success",
    },
    message: {
      type: String,
      label: "Message",
      optional: true,
      min: 0,
      max: 256,
    },
    error: {
      type: Schemas.Error,
      label: "Error",
      optional: true,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "result",
      ],
      defaultValue: "result",
    },
  },
]);

/**
 * Returns the schema associated with a specified format.
 *
 * @param {string} format - The format name.
 * @return {Schema} - The resulting schema.
 */

MeteorMUD.schemaForFormat = function (format) {

  return Schemas[MeteorMUD.Text.capitalizeString(format)] || Schemas.Fallback;
};

/**
 * Executes the completion handler with a valid result object.
 *
 * @param {function} completionHandler - The original completion handler.
 * @param {Object} object - The result object.
 */

MeteorMUD.complete = function (completionHandler, object) {

  // Assert that this is a valid completion handler.
  if (!Guard.isFunction(completionHandler)) {
    Guard.fail("Invalid completion handler.");
  }

  // Clean the input object.  We'll see how well this performs.
  Schemas.Result.clean(object);

  // Execute the original completion handler with the cleaned object.
  completionHandler(object);

};
