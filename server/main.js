UserStatus.events.on("connectionLogin", function(fields) {
  // Log this for posterity.

  for (var i = 0; i < 2; i++) {
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, {
      message: "This is a test message made by the scaffolding to test messages!",
      format: "message",
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, {
      success: true,
      message: "This is a test success result made by the scaffolding to test positive results!",
      format: "result",
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, {
      success: false,
      error: {
        message: "This is a test error result made by the scaffolding to test negative results!",
        reason: "And this is a test error reason!",
        suggestion: "And this is a test error suggestion!",
      },
      format: "result",
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, { 
      format: "array",
      array: [
        {
          message: "(1/3) This is a test message made by the scaffolding to test arrays!",
          format: "message",
        },
        {
          message: "(2/3) This is a test error made by the scaffolding to test arrays!",
          reason: "And this is the reason!",
          suggestion: "And this is the suggestion!",
          format: "error",
        },
        {
          message: "(3/3) This is a test message made by the scaffolding to test arrays!",
          format: "message",
        }
      ],
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, {
      heading: "Test Heading",
      format: "heading",
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, {
      subheading: "Test Subheading",
      format: "subheading",
    });
    MeteorMUD.UI.CLI.sendOutput(fields.connectionId, { 
      success: true,
      messages: [
        {
          message: "(1/3) This is a test message made by the scaffolding to test message arrays!",
          format: "message",
        },
        {
          message: "(2/3) This is a test message made by the scaffolding to test message arrays!",
          format: "message",
        },
        {
          message: "(3/3) This is a test message made by the scaffolding to test message arrays!",
          format: "message",
        }
      ],
      format: "result",
    });
  }

  var user = Meteor.users.findOne(fields.userId);
  if (user) {
    console.log(user.username + " (" + fields.ipAddr + ") connected.");
  }


}); // End onConnectionLogin








UserStatus.events.on("connectionLogout", function(fields) {
  // Log this for posterity.
  var user = Meteor.users.findOne(fields.userId);
  if (user) {
    console.log(user.username + " (" + fields.ipAddr + ") disconnected.");
  }
});

UserStatus.events.on("connectionIdle", function(fields) {
  // Log this for posterity.
  var user = Meteor.users.findOne(fields.userId);
  if (user) {
    console.log(user.username + " (" + fields.ipAddr + ") went idle.");
  }
});

UserStatus.events.on("connectionActive", function(fields) {
  // Log this for posterity.
  var user = Meteor.users.findOne(fields.userId);
  if (user) {
    console.log(user.username + " (" + fields.ipAddr + ") became active.");
  }
});
