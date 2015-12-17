Package.describe({
  name: 'meteormud:permissions',
  version: '0.0.1',
  summary: 'Simple role-based access control model for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('mongo');
  api.use('meteormud:namespace');
  api.use('meteormud:accounts');            
  api.addFiles('lib/permissions.js', ['client', 'server']);
  api.addFiles('client/permissions.js', 'client');
  api.addFiles('server/permissions.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:permissions');
  api.addFiles('tests/permissions.js');
});
