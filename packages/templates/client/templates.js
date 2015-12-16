// Write your package code here!

// The collection of templates.
var collection = {};

// Set a template for a format.
function setTemplate(format, template) {
  check(format, String);
  check(template, String);
  check(template, Match.Where(function (templateName) {
    return !!Template[templateName];
  }));
  collection[format] = template;
}

// Get a template for a format.
function getTemplate(format) {
  check(format, String);
  return collection[format];
}

// Delete the template for a format.
function deleteTemplate(format) {
  check(format, String);
  if (collection[format]) {
    delete collection[format];
  }
}

/**
 * Adds a template for a format.
 *
 * @param {string} template - The template to use for the format.
 * @param {string} format - The format of the objects to handle.
 */

Templates.setTemplateForFormat = function (template, format) {
  setTemplate(format, template);
};

/**
 * Gets the template for a format.
 *
 * @param {string} format - The format of the objects to handle.
 * @return {string} The template to use for the format.
 */

Templates.getTemplateForFormat = function (format) {

  // Catch the case where the format isn't really specified.
  if (!format || !_.isString(format) || s.isBlank(format) || format.length === 0 ) {
    return getTemplate("fallback");
  }

  // Return the existing template or the fallback.
  return getTemplate(format) || getTemplate("fallback");
};

/**
 * Gets the template for an object.
 *
 * @param {string} object - The object to handle.
 * @return {string} The template to use for the format.
 */

Templates.getTemplateForObject = function (object) {

  // Catch case where we're dealing with an array.
  if (_.isArray(object)) {
    console.log("array");
    return Templates.getTemplateForFormat("array");
  } else {
    console.log(object);
  }

  // Return the template for the format or the fallback.
  return Templates.getTemplateForFormat(object.format);
};

/**
 * Removes the template for a format.
 *
 * @param {string} format - The format of the objects to handle.
 */

Templates.removeTemplateForFormat = function (format) {
  deleteTemplate(format);
};

Meteor.startup(function () {
  Templates.setTemplateForFormat("meteormud_array", "array");
  Templates.setTemplateForFormat("meteormud_error", "error");
  Templates.setTemplateForFormat("meteormud_fallback", "fallback");
  Templates.setTemplateForFormat("meteormud_heading", "heading");
  Templates.setTemplateForFormat("meteormud_message", "message");
  Templates.setTemplateForFormat("meteormud_messages", "messages");
  Templates.setTemplateForFormat("meteormud_object", "object");
  Templates.setTemplateForFormat("meteormud_result", "result");
  Templates.setTemplateForFormat("meteormud_subheading", "subheading");
});
