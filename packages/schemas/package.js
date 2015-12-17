Package.describe({
  name: 'meteormud:schemas',
  version: '0.0.1',
  summary: 'Schema support for validating and processing objects in MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('aldeed:simple-schema');
  api.use('aldeed:collection2');
  api.use('meteormud:namespace'); 
  api.imply('aldeed:simple-schema');              
  api.imply('aldeed:collection2');
  api.addFiles('lib/schemas.js', ['client', 'server']);
  api.addFiles('client/schemas.js', 'client');
  api.addFiles('server/schemas.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:schemas');
  api.addFiles('tests/schemas.js');
});
