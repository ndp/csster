#!/bin/sh
VERSION="1.0.2"

echo "// csster.js" >csster.js
echo "// version $VERSION" >>csster.js
echo "// Copyright (c) Andrew J. Peterson / ndpsoftware.com" >>csster.js
echo "// All Rights Reserved" >>csster.js
echo "// " >>csster.js
echo "// See http://github.com/ndp/csster" >>csster.js
echo "// " >>csster.js
echo "// Generated `date`" >>csster.js
echo "// " >>csster.js
echo "// " >>csster.js
cat src/utils.js src/core.js src/macros/macros.js src/functions/color.js src/filters/property_pre_processors.js src/filters/rule_post_processors.js src/init.js src/jquery.js >>csster.js


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