#!/bin/sh

current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
topdir="$current_dir/.."
VERSION=`cat $topdir/VERSION`
echo "updating to $VERSION"
sh/build.sh
git add -A
git commit -m  "build version $VERSION"
git tag $VERSION
git push --tag
git push