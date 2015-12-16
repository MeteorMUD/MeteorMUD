// Write your package code here!

Tracker.autorun(function (computation) {
  // Run as needed.
  try {
    UserStatus.startMonitor({
      threshold: 5 * 60 * 1000,     // 5 minutes
      interval: 10 * 1000,          // 10 seconds
      idleOnBlur: true,             // Mark as idle when browser is unfocused.
    });
    computation.stop();
  }
  catch (error) {
  }
  finally {
  }
});

Meteor.startup(function () {
  // This code will be executed at startup.

  // Don't force login after logout.
  AccountsGuest.forced = false;

  // Logout all other clients.
  Meteor.logoutOtherClients();

});
