// Write your package code here!

// The global Help object.
MeteorMUD.Help = Help = {};

// The global Schemas object.
Schemas = MeteorMUD.Schemas;

Schemas.HelpSeeAlso = new SimpleSchema([
  Schemas.Fallback,
  {
    name: {
      type: String,
      label: "Name",
      min: 2,
      max: 32,
    },
    uniqueName: {
      type: String,
      label: "Unique Name",
      index: true,
      unique: true,
    },
    title: {
      type: String,
      label: "Title",
      min: 2,
      max: 64,
    },
    summary: {
      type: String,
      label: "Summary",
      min: 50,
      max: 250,
    },
    format: {
      type: String,
      defaultValue: "help-see-also",
    },
  }
]);

// The Help schema.
Schemas.Help = new SimpleSchema([
  Schemas.Fallback,
  {
    name: {
      type: String,
      label: "Name",
      min: 2,
      max: 32,
      index: true,
    },
    uniqueName: {
      type: String,
      label: "Unique Name",
      index: true,
      unique: true,
    },
    title: {
      type: String,
      label: "Title",
      min: 2,
      max: 64,
    },
    summary: {
      type: String,
      label: "Summary",
      min: 50,
      max: 250,
      index: true,
    },
    categories: {
      type: [String],
      label: "Categories",
      optional: true,
      defaultValue: [
        "general",
      ],
      min: 1,
      index: true,
    },
    searchTerms: {
      type: [String],
      label: "Search Terms",
      optional: true,
      defaultValue: [],
      index: true,
    },
    seeAlso: {
      type: [Schemas.HelpSeeAlso],
      label: "See Also",
      optional: true,
      defaultValue: [],
    },
    permissions: {
      type: [String],
      label: "Permissions",
      optional: true,
      defaultValue: [],
      index: true,
    },
    text: {
      type: String,
      label: "Text",
      min: 250,
    },
    format: {
      type: String,
      defaultValue: "help",
    },
  }
]);
