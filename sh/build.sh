#!/bin/sh

current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
topdir="$current_dir/.."
VERSION=`cat $topdir/VERSION`
dist_file="dist/csster.js"
src=$topdir/src

cat $topdir/templates/bower.json   | sed "s/__VERSION__/$VERSION/" > $topdir/bower.json
cat $topdir/templates/package.json | sed "s/__VERSION__/$VERSION/" > $topdir/package.json
cat $topdir/templates/header.txt   | sed "s/__VERSION__/$VERSION/" > $topdir/$dist_file
echo "// Generated `date`" >> $topdir/$dist_file
echo "// "                 >> $topdir/$dist_file
echo "// "                 >> $topdir/$dist_file
cat $src/utils.js $src/core.js $src/macros/macros.js $src/functions/color.js \
    $src/filters/property_pre_processors.js $src/filters/rule_post_processors.js \
    $src/init.js $src/jquery.js >> $dist_file
