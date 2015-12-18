Package.describe({
  name: 'meteormud:commands',
  version: '0.0.1',
  summary: 'Commands for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:schemas');
  api.use('meteormud:help');
  api.addFiles('lib/commands.js', ['client', 'server']);
  api.addFiles('client/commands.js', 'client');
  api.addFiles('server/commands.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:commands');
  api.addFiles('tests/commands.js');
});
