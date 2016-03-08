#!/bin/sh
VERSION="1.3.0"

webpack
echo "// Csster version $VERSION; Copyright (c) Andrew J. Peterson / ndpsoftware.com. All Rights Reserved"|cat - csster.js > /tmp/out && mv /tmp/out csster.js
cp csster.js vendor/assets/javascripts/

sed s/\"version\"\:\ .\*/\"version\":\ \"$VERSION\",/g package.json >/tmp/out && mv /tmp/out package.json
sed s/VERSION\ =\ .\*/VERSION\ =\ \"$VERSION\"/g lib/csster/version.rb >/tmp/out && mv /tmp/out lib/csster/version.rb
