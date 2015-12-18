// Write your package code here!

// Subscription objects.
var subscriptions = {};

// Subscription caches.
var caches = {};

// Set subscription.
function setSubscription(sessionId, subscription) {
  check(sessionId, String);
  subscriptions[sessionId] = subscription;
}

// Get subscription.
function getSubscription(sessionId) {
  check(sessionId, String);
  return subscriptions[sessionId];
}

// Delete subscription.
function deleteSubscription(sessionId) {
  check(sessionId, String);
  delete subscriptions[sessionId];
}

// Gets the subscription message cache for the specified sessionId.
function getCache(sessionId) {
  var cache = caches[sessionId];
  if (!cache) {
    cache = caches[sessionId] = [];
  }
  return cache;
}

// Sets the subscription message cache for the specified sessionId.
function setCache(sessionId, cache) {
  caches[sessionId] = cache;
}

// Removes the subscription message cache.
function removeCache(sessionId) {
  setTimeout(function () {
    delete caches[sessionId];
  }, 15000);
}

// Caches the output instead of sending it directly.
function cacheOutput(sessionId, output) {
  getCache(sessionId).push(output);
}

/**
 * The publication function for subscriber-based output.
 *
 * @param {string} name - The name of the publication.
 */

Output.publisher = function (name) {
  var subscription = this;
  subscription.name = name;
  var sessionId = subscription._session.id;
  check(sessionId, String);
  setSubscription(sessionId, subscription);
  subscription.ready();
  var cache = getCache(sessionId);
  removeCache(sessionId);
  cache.forEach(function (output) {
    Output.sendOutput(sessionId, output);
  });
  subscription.onStop(function () {
    deleteSubscription(sessionId);
    removeCache(sessionId);
  });
};

/**
 * Send an object.
 *
 * @param {Number} sessionId - The identifier of the current session.
 * @param {Object} output - The output object to send to the subscriber.
 */

Output.sendOutput = function (sessionId, output) {
  check(sessionId, String);
  var subscription = getSubscription(sessionId);
  if (subscription) {
    subscription.added(subscription.name, Random.id(), output);
  } else {
    cacheOutput(sessionId, output);
  }
};

