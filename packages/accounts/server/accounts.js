// Write your package code here!

// Deny updates to anything in the user document.
Meteor.users.deny({
  update: function () {
    return true;
  }
});

/**
 * Get the user linked to a session.
 *
 * @param {string} sessionId - The session ID.
 * @return {string} userId - The user ID.
 */

Accounts.userIdForSessionId = function(sessionId) {
  return UserStatus.connections.findOne(sessionId)._id;
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
  if (!Meteor.users.findOne({isRoot: true})) {
    var password = Random.id();
    Accounts.createUser({
      username: 'admin',
      password: password,
      email: "admin@example.com",
      isRoot: true,
    });
    console.log("Created admin account with password '" + password + "'.");
  }

});
