Package.describe({
  name: 'meteormud:accounts',
  version: '0.0.1',
  summary: 'User account support for MeteorMUD.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('accounts-base');
  api.use('accounts-password');
  api.use('check');
  api.use('tracker');
  api.use('artwells:accounts-guest');
  api.use('mizzao:user-status');
  api.use('meteormud:namespace');
  api.imply('accounts-base');  
  api.imply('mizzao:user-status');            
  api.addFiles('lib/accounts.js', ['client', 'server']);
  api.addFiles('client/accounts.js', 'client');
  api.addFiles('server/accounts.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteormud:namespace');
  api.use('meteormud:accounts');
  api.addFiles('tests/accounts.js');
});
