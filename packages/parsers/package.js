Package.describe({
  name: 'meteormud:parsers',
  version: '0.0.1',
  summary: 'Core parsers support for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.addFiles('lib/parsers.js', ['client', 'server']);
  api.addFiles('client/parsers.js', 'client');
  api.addFiles('server/parsers.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:parsers');
  api.addFiles('tests/parsers.js');
});
