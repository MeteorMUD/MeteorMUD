Package.describe({
  name: 'meteormud:parsers-commands',
  version: '0.0.1',
  summary: 'Command parsers for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('meteormud:namespace');               
  api.use('meteormud:parsers');
  api.addFiles('lib/parsers-commands.js', ['client', 'server']);
  api.addFiles('client/parsers-commands.js', 'client');
  api.addFiles('server/parsers-commands.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:parsers-commands');
  api.addFiles('tests/parsers-commands.js');
});
