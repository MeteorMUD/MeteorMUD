// Write your package code here!

// The collection we're using to manage this stuff.
var collection = new Meteor.Collection(null);

// Attach the help-topic schema.
collection.attachSchema(Schemas.Help);

/**
 * Inserts a topic to the help system.
 *
 * @param {Object} topic - A topic that can be accessed through the help system,
 * e.g. "help chat".
 */

Help.insertTopic = function (topic) {

  // Clean the topic.
  Schemas.Help.clean(topic);

  // Insert the topic.
  collection.insert(topic, function (error, id) {
    if (error) {
      throw new Error("Failed to insert help topic '" + topic.title + "': " + error.toString());
    }
  });
};

/**
 * Updates topics in the help system.
 *
 * @param {Object} selector - A selector that specifies which topic(s) should be modified.
 * @param {Mongo.Modifier} modifier - A modifier that specifies what actions should be taken.
 */

Help.updateTopics = function (selector, modifier) {
  // Update the topics.
  collection.update(selector, modifier, function (error, id) {
    if (error) {
      Guard.fail("Failed to modify help topics: " + error.toString());
    }
  });
};

/**
 * Updates the topic with the specified unique name in the help system.
 *
 * @param {string} uniqueName - The unique name of a document in the database.
 * @param {Mongo.Modifier} modifier - A modifier that specifies what actions should be taken.
 */

Help.updateTopicWithUniqueName = function (uniqueName, modifier) {
  // Update the topics.
  Help.updateTopics({
    uniqueName: uniqueName,
  }, modifier);
};

/**
 * Adds to the "see also" section of a help topic or topics.
 *
 * @param {string} uniqueName - The unique name of a document in the database.
 * @param {Object} seeAlso - The "see also" information for another help topic.
 */

Help.addSeeAlsoForTopicWithUniqueName = function (uniqueName, seeAlso) {

  // Clean the topic.
  Schemas.HelpSeeAlso.clean(seeAlso);

  // Insert the topic.
  collection.insert(topic, function (error, id) {
    if (error) {
      Guard.fail("Failed to insert help topic '" + topic.title + "': " + error.toString());
    }
  });
};

/**
 * Fetches a topic to the help system.
 *
 * @param {Object} selector - A Mongo selector object.
 * @param {Object} options - A Mongo options object.
 * @return {Mongo.Cursor} cursor - A cursor corresponding to this query.
 */

Help.getTopics = function (selector, options) {

  // Return the results of the query.
  return collection.find(selector, options);
};

/**
 * Fetches a topic to the help system.
 *
 * @param {string} uniqueName - The unique name of a document in the database.
 * @return {object} - The result.
 */

Help.getTopicWithUniqueName = function (uniqueName) {

  // Return the results of the query.
  return collection.findOne({ uniqueName: uniqueName });
};

/**
 * Fetches the categories in the help system.
 *
 * @return {[String]} - An array of strings corresponding to the categories.
 */

Help.getCategories = function () {
  var cursor = Help.getTopics({}, {fields: { categories: true }});
  var categories = cursor.fetch().map(function (topic) {
    return topic.categories;
  });
  var flattenedCategories = _.flatten(categories);
  var sortedCategories = flattenedCategories.sort();
  var uniquedCategories = _.uniq(sortedCategories, true);
  return uniquedCategories;
};

/**
 * Removes everything in the internal collection.
 *
 * @param {object} selector - A selector.
 */

Help.remove = function (selector) {
  check(selector, Object);

  // Remove the items.
  collection.remove(selector, function (error, id) {
    if (error) {
      Guard.fail("Failed to remove help topics: " + error.toString());
    }
  });
};

Meteor.startup(function () {
  // Startup code goes here.

  // Remove all help entries.
  Help.remove({});

  // Add the help topic.
  Help.insertTopic({
    name: "help system",
    uniqueName: "meteormud_help_system",
    title: "Help System",
    aliases: [
      "help",
    ],
    categories: [
      "help",
    ],
    searchTerms: [
      "help system",
      "help help help",
      "help help",
      "help",
    ],
    summary: "The help system is a mechanism for storing and accessing topics of interest to users.  It is intended to be versatile and easy to use.",
    text: "The <em>help system</em> is a central store for 'helpfiles', small texts concerning various topics on this MUD.<br/>  In general, you should be able to type <kbd>help <<i>topic</i>></kbd> or <kbd>help <<i>command</i>></kbd> to get help on a topic or command.<br/>If you want an overview of topics or commands, type <kbd>help topics</kbd> or <kbd>help commands</kbd>.",
  });

});

