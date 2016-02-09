#!/bin/sh
VERSION="1.1.0"

webpack
echo "// Csster version $VERSION; Copyright (c) Andrew J. Peterson / ndpsoftware.com. All Rights Reserved"|cat - csster.js > /tmp/out && mv /tmp/out csster.js
cp csster.js vendor/assets/javascripts/

echo '{' >package.json
echo '  "name": "csster",' >>package.json
echo '  "description": "Csster: Write CSS in JS or Coffeescript, with macros, color math, etc.",' >>package.json
echo "  \"version\": \"$VERSION\"," >>package.json
echo '  "keywords": ["css", "color"],' >>package.json
echo '  "licenses": [{' >>package.json
echo '    "type": "MIT",' >>package.json
echo '    "url": "https://github.com/ndp/csster/raw/master/LICENSE"' >>package.json
echo '  }],' >>package.json
echo '  "repository": {' >>package.json
echo '    "type": "git",' >>package.json
echo '    "url": "https://github.com/ndp/csster.git"' >>package.json
echo '  },' >>package.json
echo '  "author": "Andrew Peterson <andy@ndpsoftware.com>",' >>package.json
echo '  "main": "./csster.js",' >>package.json
echo '  "engines": {' >>package.json
echo '    "node": "*"' >>package.json
echo '  }' >>package.json
echo '}' >>package.json