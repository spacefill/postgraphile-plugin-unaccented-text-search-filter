[![Package on npm](https://img.shields.io/npm/v/postgraphile-plugin-unaccented-text-search-filter.svg)](https://www.npmjs.com/package/postgraphile-plugin-unaccented-text-search-filter)

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

To establish a test environment, create an empty PostgreSQL database with C
collation (required for consistent ordering of strings) and set a
`TEST_DATABASE_URL` environment variable with your database connection string.

```bash
createdb graphile_test_c --template template0 --lc-collate C
export TEST_DATABASE_URL=postgres://localhost:5432/graphile_test_c
yarn
yarn test
```

You can also use a language specific ICU collation by changing `C` to the
wanted collation, e.g. `"fr-x-icu"` for French collation.
