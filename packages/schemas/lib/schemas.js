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
      defaultValue: "No message was provided.",
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

// A schema representing formatted text, specifically HTML.
Schemas.Text = new SimpleSchema([
  Schemas.Fallback,
  {
    text: {
      type: String,
      label: "Text",
      min: 0,
      max: 16384,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "text",
      ],
      defaultValue: "text",
    },
  },
]);

// A schema representing a heading for an article.
Schemas.Heading = new SimpleSchema([
  Schemas.Fallback,
  {
    heading: {
      type: String,
      label: "Heading",
      min: 1,
      max: 32,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "heading",
      ],
      defaultValue: "heading",
    },
  },
]);

// A schema representing a subheading for an article.
Schemas.Subheading = new SimpleSchema([
  Schemas.Fallback,
  {
    subheading: {
      type: String,
      label: "Subheading",
      min: 1,
      max: 32,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "subheading",
      ],
      defaultValue: "subheading",
    },
  },
]);

// A schema representing a section of an article, with a subheading and some text.
Schemas.ArticleSection = new SimpleSchema([
  Schemas.Fallback,
  {
    subheading: {
      type: Schemas.Subheading,
      label: "Subheading",
    },
    text: {
      type: Schemas.Subheading,
      label: "Text",
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "article-section",
      ],
      defaultValue: "article-section",
    },
  },
]);

// A schema representing an article, with a heading, text, and possibly article sections.
Schemas.Article = new SimpleSchema([
  Schemas.Fallback,
  {
    heading: {
      type: Schemas.Heading,
      label: "Heading",
    },
    text: {
      type: Schemas.Subheading,
      label: "Text",
    },
    sections: {
      type: [Schemas.ArticleSection],
      label: "Sections",
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "article",
      ],
      defaultValue: "article",
    },
  },
]);

// A schema representing a name/description pair.
Schemas.NameAndDescription = new SimpleSchema([
  Schemas.Fallback,
  {
    name: {
      type: String,
      label: "Name",
      min: 1,
      max: 64,
    },
    description: {
      type: String,
      label: "Description",
      min: 64,
      max: 256,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      allowedValues: [
        "name-and-description",
      ],
      defaultValue: "name-and-description",
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
  return Schemas[s.capitalizeString(format)] || Schemas.Fallback;
};

/**
 * Executes the completion handler with a valid result object.
 *
 * @param {function} completionHandler - The original completion handler.
 * @param {Object} object - The result object.
 */

MeteorMUD.complete = function (completionHandler, object) {

  // Assert that this is a valid completion handler.
  if (!_.isFunction(completionHandler)) {
    throw new Error("Invalid completion handler.");
  }

  // Clean the input object.  We'll see how well this performs.
  Schemas.Result.clean(object);

  // Execute the original completion handler with the cleaned object.
  completionHandler(object);

};
