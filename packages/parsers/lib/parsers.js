// Write your package code here!

// The Parsers object.
MeteorMUD.Parsers = Parsers = {};

// A collection of regular expressions.
Parsers.RegExes = {};

// A string regex.
Parsers.RegExes['STRING'] = /("([^"]*)"|'([^']*)')/ig;

// Splits strings on unquoted semicolons or periods.
Parsers.RegExes['EXPRESSIONS'] = /[;.](?=(?:[^"]|"[^"]*")*$)/ig;
