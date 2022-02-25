[![Package on npm](https://img.shields.io/npm/v/@spacefill/postgraphile-plugin-unaccented-text-search-filter.svg)](https://www.npmjs.com/package/@spacefill/postgraphile-plugin-unaccented-text-search-filter)

# postgraphile-plugin-unaccented-text-search-filter

Adds unaccent string filtering capabilities to a PostGraphile schema.

This plugin extends the [postgraphile-plugin-connection-filter](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter)
plugin with unaccentuated text filter operators.

This plugin supports filtering on all PostgreSQL string types: `char`, `varchar`,
`text`.

## Plugin Options

When using PostGraphile as a library, many options can be passed via
`graphileBuildOptions`. [See here](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter/blob/master/README.md#plugin-options)
for more information.

## Examples

```graphql
query {
  allPosts(filter: {
    body: { includesUnaccentInsensitive: "Solidarité" }
  }) {
    ...
  }
}
```

For an extensive set of examples, see [docs/examples.md](https://github.com/graphile-contrib/postgraphile-plugin-unaccented-text-search-filter/blob/master/docs/examples.md).

## Development

### Requirements

- [`direnv`](https://direnv.net/)
- [`asdf`](https://github.com/asdf-vm/asdf)
- [`docker`](https://www.docker.com/)

Then you must initialize dependancies:

```bash
$ direnv allow
$ asdf install
$ asdf reshim
```

### Tests

To establish a test environment, you must create an empty PostgreSQL database with C
collation (required for consistent ordering of strings):

```bash
$ docker-compose up -d
```

Install nodejs dependencies:

```bash
$ yarn install
```

Run tests:

```bash
$ yarn run test
yarn run v1.22.17
$ jest -i
 PASS  __tests__/integration/queries.test.ts
  ✓ types.char4.graphql (44 ms)
  ✓ types.text.graphql (22 ms)
  ✓ types.varchar64.graphql (22 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   3 passed, 3 total
Time:        3.7 s
Ran all test suites.
✨  Done in 4.61s.
```

## Release

Every tag is released with the according version.

### Deploy a new release

Bump version in [`package.json`](./package.json)

Create a PR to release with the bumped version. When your PR is merged on master create and push tag:

```bash
$ ./scripts/create-and-push-tag.sh
```

This will automatically create a new local tag and push it. Then the CI will release a new version on npm.

