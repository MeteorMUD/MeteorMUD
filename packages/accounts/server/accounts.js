// Write your package code here!

// Deny updates to anything in the user document.
Meteor.users.deny({
  update: function () {
    return true;
  }
});

Meteor.startup(function () {
  // Executed on startup.

  // Assign a friendly name to anonymous users.
  AccountsGuest.name = true;

  // Remove all guest accounts more than a week old.
  var time = new Date();
  time.setHours(time.getHours() - 168);
  Accounts.removeOldGuests(time);

});
