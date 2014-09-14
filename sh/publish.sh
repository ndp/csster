
echo "updating to $VERSION"
git add -A
git commit -m  "build version $VERSION"
git tag $VERSION
