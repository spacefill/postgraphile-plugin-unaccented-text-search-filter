#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../"

yarn install --frozen-lockfile
yarn run build

npm publish --access public
