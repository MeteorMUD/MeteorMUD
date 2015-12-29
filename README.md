# MeteorMUD
A little MUD, coded in Meteor!  How cool!

This is sort of a partner project to [SwiftMUD](https://github.com/SwiftMUD/SwiftMUD/) -- a MUD written in the [Swift Programming Language](http:/swift.org/), but the two are not compatible, won't share any code, and essentially aren't even remotely similar except in that they were started by the same person.

## So why two different MUD projects?

Obviously, the core concept of a MUD is interesting to me, and both share this idea.  But MeteorMUD and SwiftMUD are technologically very different.  

### MeteorMUD
MeteorMUD is an attempt at a very modern, universal MUD -- it discards the telnet protocol in favor of WebSockets and is more aimed at providing an in-browser MUD experience, complete with dynamic HTML, CSS styling, and so forth, than a classic MUD experience.  Raw performance may take a back seat to a customized experience emphasizing the things at which HTML/ CSS/ Javascript/ browsers/ etc are good.  This project is, on a personal level, largely about creating a compelling and non-trivial full-stack application.

### SwiftMUD
SwiftMUD, on the other hand, is an attempt to create a very powerful, feature-rich MUD optimized for performance and simulation purposes.  I'm interested in [Agent-Based Computational Economics](https://en.wikipedia.org/wiki/Agent-based_computational_economics), genetic/evolutionary algorithms, artificial intelligence, natural language parsing, and some other topics that are not just highly technical but could be demanding in terms of performance.  I'm really interested in simulating a fantasy world here, not just creating a playable game.

### But Node.js is fast!
It's entirely possible that some, much, or all of the "really demanding" stuff will be ported to MeteorMUD, whether as Node.js packages, Meteor packages, or whatever, but since I'm fairly new to the Node/Meteor way of doing things, I'm being conservative.  I'm more experienced with developing and testing stuff written in Objective-C and consequently have some baseline expectations for Swift.  I'm much less experienced with Meteor and Node, Javascript in general, MongoDB, the various other things I need to figure out along the way, etc.

## Design
This is essentially an entire project made of nothing but packages.  Very, very, very narrowly factored.  I think this makes it easier to add new things, to keep concerns separate, and to run tests.

### Accounts
Accounts can have multiple characters (see Characters, below) and be logged in to multiple sessions at a time, although this is probably discouraged as enabling cheating.  

### Characters
Each character can be logged in to multiple sessions at a time.  I guess this could allow walkthroughs or collaborative play.  I could prevent this, and probably should make it possible to prevent it easily and reliably, but I'm not too worried about it right now.

### Chat
Chat is based on a model of channels and subscription.  Chat has multiple channels and more can be created by accounts with appropriate permissions.  These channels can be subscribed to or unsubscribed from, their entry/exit requirements can be specified arbitrarily, and so forth.

### Commands
Commands are or should be rich and finely grained.  

Command permissions can be specified with arbitrary complexity, and so will need at least some hard code.

Their parsing will be handled individually (see Parsing, below).  

Help for commands will be implemented as part of the command itself; a topic will be injected into the Help system when the command is loaded.

### Database
Whether and to what degree information will be stored in the database is a topic deserving significant attention.  

On the one hand, I'm concerned about the performance hits of storing things like rooms inside of a database, especially if there are a number of characters inside of the room, especially if the database relies upon functions for some of its functionality, and so forth.  On the other hand, user-generated content becomes difficult to implement persistently without the involvement of a database.

On one extreme, nearly everything can be stored inside of the database.  Commands could be stored inside of the database, for instance, and simply read from the database and some string evaluated as Javascript.  This is tempting, but dangerous on many levels, and not just to performance but to security and longterm stability and reliability as well.

On the other, nearly everything could be stored outside of the database.  This is performant, more secure, and more reliable (among other things, this means just about everything can be kept easily in version control), but can generate sprawl in the filesystem, make user-generated content more transient, and make it more difficult to interoperate between code and database objects.

After some thought, I think that essentially everything should be managed outside of the database.  It might however be useful to be able to write things from the database to the filesystem, or vice-versa, or otherwise permit interoperation
between the database and the filesystem.  One way -- likely the best way -- of doing this would be to use CollectionFS.

I'll have to look into this possibility further.

I don't see a good way of handling player objects except to store them in the database, although this could probably be done with CollectionFS as well.

### Help
Help is of critical importance and must be rich and detailed.  Help topics, like commands should be able to determine who can access them with arbitrary complexity.  Generally, the help topics should be implemented by the system, command, room, or whatever that generates them.  Most of the time, this should be stored in the database, as performance isn't terribly important most of the time and access can be implemented simply (see Permissions, below).  

### Hints
In addition to Help, it might be nice to implement a hints system.  Hints should largely be managed the same way as the help system, with the proviso that the access will be controlled much more carefully, and will probably need sophisticated functions.

For instance, we might wish to implement a penalty system that decreases the amount of experience given by a quest in proportion to the number of hints the user took.  However, some of these hints will be invalidated based on the user's progress, and it's unfair to give a user 1/10 of the experience if they took the 10th hint (or the 1st, or 3rd, or whatever) but completed everything else satisfactorily.

Also, the hints system would need to take into account the sequential, progressive nature of hinting, and not just dump all of the information on the user at once.

### Objects
Objects should have dimensions and attributes, and probably fit into an prototype-oriented hierarchy or object-oriented class hierarchy.  Their general implementation will probably not introduce any major innovations.  They will probably need to be hard-coded, as database accesses for all of the objects held by a player could be absolutely terrible.

### Parsing
In MUDs, essentially every expression begins with a command.  I'm not currently interested in making a very NLP-like command line, so passing text to a verb for subparsing seems like the easiest approach.  Another possibility is to accept nouns as a first word, so that you could order a noun to perform a particular action.

### Performance
Despite MUDs being ancient, and performance not generally being an issue with modern hardware, MeteorMUD introduces some complexities by the simple fact of its architecture.  I intend to avoid any further compromises with performance.

### Permissions
The simplest way to implement permissions is probably to introduce tags into the account and player objects that can be checked for access to chat channels, etc.  However, this isn't likely to be sufficient, and it leads one to ask what the value is of implementing a system that isn't sufficient.  This will need to be considered in more depth.

### Rooms
Rooms, like Objects, should probably fit into a prototype-oriented or object-oriented hierarchy.  I intend on borrowing a lot from the general interactive fiction models, particularly Inform, on this topic.

### Templates
Templates should be used to construct the User Interface.  The only formatting used should be inline, e.g. setting colors for specific pieces of text, etc.

### User Interface
The UI should be a standard command-line interface as seen in countless other MUDs.

## Status
MeteorMUD is in extreme pre-alpha stage.

## World
I haven't yet designed a world for this MUD.  I might not.  Or I might make a couple.

## Anticipated Frequently Asked Questions
This obviously isn't a FAQ.  No one's ever asked me any questions about this.  But I've tried to anticipate some questions.

### How Serious Is This?
I'm pretty excited about this project and intend to hack on it in my spare time for the foreseeable future.  This isn't intended to be a proof-of-concept or demo, but a real, functional MUD with a world and a long list of great features.  Yes, I know what that means, having worked on MUDs in the past.

### What's Your Roadmap?
Oh, jeez.  It's a little early to ask that.  Right now I'm just trying to figure out the best order in which to do these things.

### Can I try it?
It's deployed to http://meteormud.meteor.com/, but as of right now the instance keeps crashing.  I don't know why.  It seems to be issues on Meteor's side, based on the logs.  So it may work, and it may not.
