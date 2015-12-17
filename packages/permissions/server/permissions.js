// Write your package code here!

/**
 * Adds permissions to a specified user account.
 *
 * @param {string} userId - The user ID of the account whose permissions should be augmented.
 * @param {[string]} permissions - The permissions to add.
 */

Permissions.addPermissions = function (userId, permissions) {
  check(userId, String);
  check(permissions, [String]);
  Meteor.users.update(userId, { $addToSet: { "meteormud_permissions": { $each: { permissions }}}});
};

/**
 * Adds a permission to a specified user account.
 *
 * @param {string} userId - The user ID of the account whose permissions should be augmented.
 * @param {string} permission - The permission to add.
 */

Permissions.addPermission = function (userId, permission) {
  check(userId, String);
  check(permission, String);
  Meteor.users.update(userId, { $addToSet: { "meteormud_permissions": permission }});
};

/**
 * Gets a list of all current permissions for the specified user account.
 *
 * @param {string} userId - The user ID of the account whose permissions should be queried.
 * @preturn {[string]} - The user's permissions list.
 */

Permissions.getPermissions = function (userId) {
  check(userId, String);
  var result = undefined;
  var user = Meteor.users.findOne(userId);
  if (user) {
    result = user["meteormud_permissions"] || [];
  }
  return result;
};

/**
 * Checks a specified user account for the specified permissions.
 *
 * @param {string} userId - The user ID of the account whose permissions should be queried.
 * @param {[string]} permissions - The permissions to query.
 * @param {Boolean} andMode - True if the user needs to have ALL of the permissions, 
 * otherwise false to indicate that the user needs to have ANY of the permissions.
 * @preturn {Boolean} - True if the permissions are set, otherwise false.
 */

Permissions.checkPermissions = function (userId, permissions, andMode=false) {
  check(userId, String);
  check(permissions, [String]);
  check(andMode, Boolean);
  var result = false;
  var userPermissions = Permissions.getPermissions(userId);
  if (userPermissions) {
    var userPermissionsContainsPermission = function (permission) {
      return userPermissions.indexOf(permission) !== -1;
    };
    if (andMode) {
      result = permissions.every(userPermissionsContainsPermission);
    } else {
      result = permissions.some(userPermissionsContainsPermission);
    }
  }
  return result;
};

/**
 * Checks a specified user account for the specified permission.
 *
 * @param {string} userId - The user ID of the account whose permissions should be queried.
 * @param {string} permission - The permission to query.
 * @preturn {Boolean} - True if the permission is set, otherwise false.
 */

Permissions.checkPermission = function (userId, permission) {
  check(userId, String);
  check(permission, String);
  return Permissions.checkPermissions(userId, [permission]);
};

/**
 * Removes the specified permission from the specified user account.
 * 
 * @param {string} userId - The user ID of the account whose permissions should be diminished.
 * @param {string} permission - The permission to remove.
 */

Permissions.deletePermissions = function (userId, permissions) {
  check(userId, String);
  check(permissions, [String]);
  Meteor.users.update(userId, {$pullAll: { "meteormud_permissions": permissions }});  
};

/**
 * Removes the specified permission from the specified user account.
 * 
 * @param {string} userId - The user ID of the account whose permissions should be diminished.
 * @param {string} permission - The permission to remove.
 */

Permissions.deletePermission = function (userId, permission) {
  check(userId, String);
  check(permission, String);
  Meteor.users.update(userId, {$pullAll: { "meteormud_permissions": [permission] }});  
};
