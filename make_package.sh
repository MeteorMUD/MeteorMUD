#!/bin/bash
cd packages
meteor create --package "meteormud:$1"
cd "$1"
mkdir client lib server tests
mv "$1"-tests.js tests/"$1".js
cp "$1.js" client/
cp "$1.js" lib/
mv "$1.js" server/
cd ..
cd ..
cat <<EOF
api.use('meteormud:namespace');
api.use('meteormud:guard');
api.use('meteormud:schemas');
api.use('meteormud:templates');
api.addFiles('lib/$1.js', ['client', 'server']);
api.addFiles('client/$1.js', 'client');
api.addFiles('server/$1.js', 'server');

api.use('meteormud:namespace');
api.addFiles('tests/$1.js');

EOF
