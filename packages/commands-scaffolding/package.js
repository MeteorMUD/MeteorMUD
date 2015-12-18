Package.describe({
  name: 'meteormud:commands-scaffolding',
  version: '0.0.1',
  summary: 'Temporary scaffolding commands for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');
  api.use('meteormud:schemas');            
  api.use('meteormud:commands');
  api.addFiles('lib/commands-scaffolding.js', ['client', 'server']);
  api.addFiles('client/commands-scaffolding.js', 'client');
  api.addFiles('server/commands-scaffolding.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:commands-scaffolding');
  api.addFiles('tests/commands-scaffolding.js');
});
