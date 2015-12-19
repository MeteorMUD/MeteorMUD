// This code will run on both the server and the client.

// The global Commands object.
MeteorMUD.Commands = Commands = {};

// The global Schemas object.
Schemas = MeteorMUD.Schemas;

// A schema for the type of an argument.
Schemas.Command_Usage_Argument_Type = new SimpleSchema([
  Schemas.Fallback,
  Schemas.NameAndDescription.pick([
    'name',
    'description',
  ]),
  {
    format: {
      type: String,
      label: "Format",
      optional: true,
      defaultValue: "command-usage-argument-type",
    },
  },
]);

// A schema for an argument.
Schemas.Command_Usage_Argument = new SimpleSchema([
  Schemas.Fallback,
  Schemas.NameAndDescription.pick([
    'name',
    'description',
  ]),
  {
    type: {
      type: Schemas.Command_Usage_Argument_Type,
      label: "Type",
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      defaultValue: "command-usage-argument",
    },
  },
]);

// A schema for a usage of a command.
Schemas.Command_Usage = new SimpleSchema([
  Schemas.Fallback,
  Schemas.NameAndDescription.pick([
    'name',
    'description',
  ]),
  {
    arguments: {
      type: [Schemas.Command_Usage_Argument],
      label: "Arguments",
      min: 0,
      max: 32,
    },
    format: {
      type: String,
      label: "Format",
      optional: true,
      defaultValue: "command-usage",
    },
  },
]);

// The general schema for a command object.
Schemas.Command = new SimpleSchema([
  Schemas.Fallback,
  Schemas.Help.pick([
    'summary',
    'text',
    'categories',
    'categories.$',
    'searchTerms',
    'searchTerms.$',
    'permissions',
    'permissions.$',
    'seeAlso',
    'seeAlso.$',
  ]),
  {
    name: {
      type: String,
      label: "Name",
      min: 1,
      max: 32,
      regEx: /[a-z0-9\-\.]+/,
    },
    type: {
      type: String,
      label: "Type",
      min: 1,
      max: 64,
      custom: function () {
        return types.indexOf(this.value) === -1 ? "required" : undefined;
      },
    },
    usage: {
      type: [Schemas.Command_Usage],
      label: "Usage",
      min: 0,
      max: 12,
    },
    subcommands: {
      type: [String],
      optional: true,
      autoValue: function () {
        if (this.operator === null && !this.isSet) {
          return new Array();
        }
      },
    },
    handler: {
      type: Object,
      label: "Handler",
      defaultValue: function (arguments, completionHandler) {
        return MeteorMUD.complete(completionHandler, {
          success: false,
          error: {
            message: "The command could not be executed.",
            reason: "This command did not specify a handler function.",
            suggestion: "Implement a handler function for the command.", 
          },
        });
      }
    },
    format: {
      type: String,
      defaultValue: "command",
    },
  },
]);

