Package.describe({
  name: 'meteormud:parsers-expressions',
  version: '0.0.1',
  summary: 'Expression parsing for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:parsers');
  api.addFiles('lib/parsers-expressions.js', ['client', 'server']);
  api.addFiles('client/parsers-expressions.js', 'client');
  api.addFiles('server/parsers-expressions.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:parsers-expressions');
  api.addFiles('tests/parsers-expressions.js');
});
