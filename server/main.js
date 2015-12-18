UserStatus.events.on("connectionLogin", function(fields) {
  // Log this for posterity.

  var Output = MeteorMUD.Output;

  for (var i = 0; i < 2; i++) {    
    Output.sendOutput(fields.connectionId, {
      message: "This is a test message made by the scaffolding to test messages!",
      format: "message",
    });
    Output.sendOutput(fields.connectionId, {
      success: true,
      message: "This is a test success result made by the scaffolding to test positive results!",
      format: "result",
    });
    Output.sendOutput(fields.connectionId, {
      success: false,
      error: {
        message: "This is a test error result made by the scaffolding to test negative results!",
        reason: "And this is a test error reason!",
        suggestion: "And this is a test error suggestion!",
      },
      format: "result",
    });
    Output.sendOutput(fields.connectionId, { 
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
    Output.sendOutput(fields.connectionId, {
      heading: "Test Heading",
      format: "heading",
    });
    Output.sendOutput(fields.connectionId, {
      subheading: "Test Subheading",
      format: "subheading",
    });
    Output.sendOutput(fields.connectionId, { 
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

  if (MeteorMUD.Permissions.checkPermission(Meteor.userId(), "some_permission_that_does_not_exist")) {
    Output.sendOutput(fields.connectionId, {
      message: "This is a message that <b>SHOULD NOT</b> be displayed, based on its permissions!",
      format: "message",
    });
  }

  MeteorMUD.Permissions.addPermission(Meteor.userId(), "some_ugly_test_permission");
  if (MeteorMUD.Permissions.checkPermission(Meteor.userId(), "some_ugly_test_permission")) {
    Output.sendOutput(fields.connectionId, {
      message: "This is a message that <b>SHOULD</b> be displayed, based on its permissions!",
      format: "message",
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
