Package.describe({
  name: 'meteormud:templates',
  version: '0.0.1',
  summary: 'Template management and associated functionality for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('templating');      
  api.use('meteormud:namespace'); 
  api.addFiles('client/array.html', 'client');
  api.addFiles('client/error.html', 'client');
  api.addFiles('client/fallback.html', 'client');
  api.addFiles('client/heading.html', 'client');
  api.addFiles('client/help.html', 'client');
  api.addFiles('client/message.html', 'client');
  api.addFiles('client/messages.html', 'client');
  api.addFiles('client/object.html', 'client');
  api.addFiles('client/result.html', 'client');
  api.addFiles('client/subheading.html', 'client');
  api.addFiles('lib/templates.js', ['client', 'server']);
  api.addFiles('client/array.js', 'client');
  api.addFiles('client/error.js', 'client');
  api.addFiles('client/fallback.js', 'client');
  api.addFiles('client/heading.js', 'client');
  api.addFiles('client/help.js', 'client');
  api.addFiles('client/message.js', 'client');
  api.addFiles('client/messages.js', 'client');
  api.addFiles('client/object.js', 'client');
  api.addFiles('client/result.js', 'client');
  api.addFiles('client/subheading.js', 'client');
  api.addFiles('client/templates.js', 'client');
  api.addFiles('server/templates.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:templates');
  api.addFiles('templates-tests.js');
});
