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
    categories: {
      type: [String],
      label: "Categories",
      defaultValue: [
        "general",
      ],
      min: 1,
    },
    searchTerms: {
      type: [String],
      label: "Search Terms",
      defaultValue: [],
    },
    seeAlso: {
      type: [Schemas.HelpSeeAlso],
      label: "See Also",
      defaultValue: [],
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
