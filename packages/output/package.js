Package.describe({
  name: 'meteormud:output',
  version: '0.0.1',
  summary: 'Centralized output functionality for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:accounts');
  api.addFiles('lib/output.js', ['client', 'server']);
  api.addFiles('client/output.js', 'client');
  api.addFiles('server/output.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:output');
  api.addFiles('tests/output.js');
});
