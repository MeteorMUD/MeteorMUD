# Permissions

Like most MUDs -- like most computer systems, in fact -- we're dependent upon strong access control to protect the users from each other.  In MUDs, this is not usually for real security, but to preserve the enjoyability of the game.  Therefore, even with help topics and such, there is access control.

MeteorMUD's access control is simple: we keep a list of permissions in the user account.  When we have a resource to which we wish to control access, we assign it a permission.  If the user has matching permissions, they are granted access to the resource.  If they don't, they aren't.  

We can also request matches for any of a set of permissions, or all of a set of permissions, but this of course quickly becomes complicated and mixing complication with security is rarely a good idea.  

For very complex matching, we can also just return the user's list of permissions.
