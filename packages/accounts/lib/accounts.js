// Write your package code here!

// The global Accounts object.
MeteorMUD.Accounts = Accounts;

// The global Roles object.
MeteorMUD.Roles = Roles;

// The Root role, which can promote other users to privileged roles but can't do anything else.
Roles.ROOT = "ROOT";

// The Admin role, which is the general superuser role and can execute any command.
Roles.ADMIN = "ADMIN";

// The Developer role, which has a broad range of permissions but isn't quite a superuser.
Roles.DEVELOPER = "DEVELOPER";

// The Creator role, which can alter in-game things but not the code.
Roles.CREATOR = "CREATOR";

// The User role, which has essentially read-only access to the game itself.
Roles.USER = "USER";

// The Guest role, which has limited access.
Roles.GUEST = "GUEST";

