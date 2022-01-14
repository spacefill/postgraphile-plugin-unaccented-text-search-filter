#!/usr/bin/env bash
set - e

cd "$(dirname "$0")/../" || return

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
VERSION=$(jq -r '.version' package.json)

if [[ "$BRANCH" != "master" ]]; then
  echo 'Must be on master to create and push new tag!'
  exit 1
fi

echo "Creating a new tag \"v${VERSION}\""

git tag -a "v${VERSION}" -m "v${VERSION}"
git push origin "v${VERSION}"