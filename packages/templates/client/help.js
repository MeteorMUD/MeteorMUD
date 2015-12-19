Template.meteormud_help.helpers({
  arrayToSentence: function (array) {
    var array = array.map(function (item) {
      return "<i>" + item + "</i>";
    });
    return MeteorMUD.UnderscoreString.toSentenceSerial(array);
  },
  logObject: function () {
    console.log("meteormud_help");
    console.dir(this);
  },
});
