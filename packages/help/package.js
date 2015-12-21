Package.describe({
  name: 'meteormud:help',
  version: '0.0.1',
  summary: 'Core help support for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:schemas');
  api.use('meteormud:accounts');
  api.addFiles('lib/help.js', ['client', 'server']);
  api.addFiles('client/help.js', 'client');
  api.addFiles('server/help.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:help');
  api.use('meteormud:namespace');
  api.addFiles('tests/help.js');
});
