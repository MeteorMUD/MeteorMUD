Package.describe({
  name: 'meteormud:ui-cli',
  version: '0.0.1',
  summary: 'The command-line interface for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('random');
  api.use('templating');
  api.use('meteormud:namespace');               
  api.use('meteormud:output');
  api.use('meteormud:parsers-cli');
  api.imply('templating');
  api.addFiles('lib/ui-cli.js', ['client', 'server']);
  api.addFiles('client/ui-cli.js', 'client');
  api.addFiles('server/ui-cli.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:ui-cli');
  api.addFiles('tests/ui-cli.js');
});
