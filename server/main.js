UserStatus.events.on("connectionLogin", function(fields) {
  // Log this for posterity.
  var user = Meteor.users.findOne(fields.userId);
  if (user) {
    console.log(user.username + " (" + fields.ipAddr + ") connected.");
  }
});

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
