// Write your package code here!

// Deny updates to anything in the user document.
Meteor.users.deny({
  update: function () {
    return true;
  }
});


UserStatus.events.on("connectionLogin", function(fields) {
  var user = Meteor.users.findOne(fields.userId);
  if (user.profile.guest) {
    Roles.removeUsersFromRoles(fields.userId, [
      Roles.ROOT, 
      Roles.ADMIN, 
      Roles.DEVELOPER, 
      Roles.CREATOR,
      Roles.USER,
    ], Roles.GLOBAL_GROUP);
    Roles.addUsersToRoles(fields.userId, Roles.GUEST, Roles.GLOBAL_GROUP);
  } else {
    // Set the general user permissions.
    Roles.addUsersToRoles(fields.userId, Roles.USER, Roles.GLOBAL_GROUP);    
  }
});

/**
 * Get the user linked to a session.
 *
 * @param {string} sessionId - The session ID.
 * @return {string} userId - The user ID.
 */

Accounts.userIdForSessionId = function(sessionId) {
  return UserStatus.connections.findOne(sessionId).userId;
};

Meteor.startup(function () {
  // Executed on startup.

  // Assign a friendly name to anonymous users.
  AccountsGuest.name = true;

  // Remove all guest accounts more than a week old.
  var time = new Date();
  time.setHours(time.getHours() - 168);
  Accounts.removeOldGuests(time);

  // Make sure a root account exists.
  if (!Meteor.users.findOne({ 'roles.__global_roles__' : Roles.ROOT })) {
    var password = Random.id();
    var rootUserId = Accounts.createUser({
      username: 'root',
      password: password,
      email: "root@example.com",
    });
    console.log("Created root account with password '" + password + "'.");
    Roles.addUsersToRoles(rootUserId, Roles.ROOT, Roles.GLOBAL_GROUP);
  }

});
