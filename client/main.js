// This code only runs on the client.

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});

Template.output.helpers({
  outputObjects: function () {
    // Show output.
    return MeteorMUD.UI.CLI.getOutput();
  },
  scrollToBottomOfOutput: function () {
    Meteor.defer(function () {
      var objDiv = document.getElementById("output");
      objDiv.scrollTop = 500 * objDiv.scrollHeight;
    });
  },
  getTemplateName: function () {
    return MeteorMUD.Templates.getTemplateForObject(this);
  },
});

Template.body.events({

  // Submit some new input.
  "submit .input": function (event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = s.cleanString(event.target.text.value);

    if (!text || text.length == 0) {
      return;
    }

    // Issue the command.
    MeteorMUD.UI.CLI.sendInputString(text);

    // Clear form
    event.target.text.value = "";

  }

});
