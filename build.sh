#!/bin/sh
VERSION="1.0.2"

cat templates/bower.json   | sed "s/__VERSION__/$VERSION/" > bower.json
cat templates/package.json | sed "s/__VERSION__/$VERSION/" > package.json
cat templates/header.txt   | sed "s/__VERSION__/$VERSION/" > csster.js
echo "// Generated `date`" >>csster.js
echo "// " >>csster.js
echo "// " >>csster.js
cat src/utils.js src/core.js src/macros/macros.js src/functions/color.js src/filters/property_pre_processors.js src/filters/rule_post_processors.js src/init.js src/jquery.js >>csster.js
cp csster.js vendor/assets/javascripts/