# Parsers

I muddled around with this for quite a bit, trying to decide whether to implement a very basic "KILL TROLL WITH SWORD" style of parser or to implement a rather sophisticated natural language parser.  In the end, I decided that NLP was beyond the scope of this project, and I set out to aggressively decompose the problem.

First, I assume that there will be multiple contexts in which the input text is parsed, so I will not bake the command parsing system into the core of the parsing package.  Rather, I'll just add tools there that I suspect will be of general value tackling multiple parsing problems.

Second, the input for the MUD is going to be a fairly standard CLI.  CLI's always begin with a command.  MUDs traditionally (and MeteorMUD should not be an exception) begin commands with a verb.  So first we'll do a lookup for existing verbs.  This will be utilized by the forthcoming commands package.

Third, each command should let a parser shoulder the parsing effort, and handle only the command-specific behavior.  This includes returning error messages, etc.  Also, the command handler should probably set up the parser and use the parser to pass some kind of object to a variant of the command, as appropriate. 
