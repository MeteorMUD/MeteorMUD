# Help

The help system is a mechanism for storing and accessing information of interest to users.  It is intended to be versatile, to support many different types of content, but not be cumbersome to support.

This package is less about a particular interface and more about defining a standard for what sort of information needs to be contained in help.

First, we need to consider some different cases:
* Highly dynamic help, e.g. that changes in response to the character's current condition, or just an extensible general response to a "help" command.
* Highly static help, e.g. that essentially never changes or needs to only be changed at reboot.
* Somewhat dynamic help, e.g. that mostly doesn't change but has some dynamic elements.
* Help that may or may not be available depending on the characteristics of the user or player.
* Help that may or may not be available depending on other information.

It seems clear to me that trying to standardize on a universal format is an exercise in futility.  Rather, the help repository should provide some very basic guidelines for what a help topic should contain, and register type handlers for different types of help so that other packages can implement the specifics as needed.

My submission:
````
{
  name: "short name",                                       # A word or phrase that should be entered exactly.
  title: "Short Name",                                      # A properly capitalized title, possibly disambig.
  summary: "A short article.",                              # A brief summary that can be displayed about this topic.
  categories: [                                             # Categories into which this topic might be put.
    "general",
    "uninteresting",
  ],
  searchTerms: [                                            # Search terms that might also lead here.
    "names that are short",
    "not tall",
    "not long",
    "brief",
  ],
  permissions: [                                            # Permissions that are needed to access this resource.
    "default",
  ],
  seeAlso: [                                                # Items to list in a "see also" section.
    {
      name: "long name",
      title: "Long Name",
      summary: "A summary of Long Name.",
    },
    {
      name: "medium name",
      title: "Medium Name",
      summary: "A summary of Medium Name.",
    },
  ],
  format: "help",
}
````

This leaves out something very big: the actual help content.  But that should probably be defined by subtypes of help.
