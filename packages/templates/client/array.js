Template.meteormud_array.helpers({
  logObject: function () {
    console.log("meteormud_array");
    console.dir(this);
  },
  getTemplateName: function () {
    return MeteorMUD.Templates.getTemplateForObject(this);
  },
});
