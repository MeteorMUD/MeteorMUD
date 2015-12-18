Package.describe({
  name: 'meteormud:parsers-cli',
  version: '0.0.1',
  summary: 'Command-Line Interface parser for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:parsers');
  api.use('meteormud:parsers-expressions');
  api.addFiles('lib/parsers-cli.js', ['client', 'server']);
  api.addFiles('client/parsers-cli.js', 'client');
  api.addFiles('server/parsers-cli.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:parsers-cli');
  api.addFiles('tests/parsers-cli.js');
});
