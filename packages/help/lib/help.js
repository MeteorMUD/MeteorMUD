// Write your package code here!

// The global Help object.
MeteorMUD.Help = Help = {};

// The global Schemas object.
Schemas = MeteorMUD.Schemas;

// The "See Also" schema.
Schemas.Help_SeeAlso = new SimpleSchema([
  Schemas.Fallback,
  Schemas.NameAndDescription.pick([
    'name',
    'description',
  ]),
  {
    uniqueName: {
      type: String,
      label: "Unique Name",
      index: true,
      //unique: true,
    },
    title: {
      type: String,
      label: "Title",
      min: 2,
      max: 64,
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
        "General",
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
    objects: {
      type: [Object],
      label: "Objects",
      min: 0,
      optional: true,
      defaultValue: [],
    },
    seeAlso: {
      type: [Schemas.Help_SeeAlso],
      label: "See Also",
      min: 0,
      optional: true,
      defaultValue: [],
    },
    format: {
      type: String,
      defaultValue: "help",
    },
  }
]);
