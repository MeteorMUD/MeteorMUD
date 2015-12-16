Package.describe({
  name: 'meteormud:namespace',
  version: '0.0.1',
  summary: 'The MeteorMUD namespace and core extensible namespaces as needed.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('lib/namespace.js', ['client', 'server']);
  api.addFiles('client/namespace.js', 'client');
  api.addFiles('server/namespace.js', 'server');
  api.export('MeteorMUD', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.addFiles('tests/namespace.js');
});
