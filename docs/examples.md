## Examples

For illustration purpose, we put first the word to search accentuated and then
the word to exclude in its unaccentedform. Since we are looking for unaccented
match, the search text can be in either form.

#### Includes / not includes a text

```graphql
query {
  allPosts(filter: {
    body: { includesUnaccentInsensitive: "Solidarité" }
  }) {
    ...
  }
}
```

```graphql
query {
  allPosts(filter: {
    body: { notIncludesUnaccentInsensitive: "solidarite" }
  }) {
    ...
  }
}
```

#### Like / not like a pattern

```graphql
query {
  allPosts(filter: {
    body: { likeUnaccentInsensitive: "%Gr_ß%" }
  }) {
    ...
  }
}
```

```graphql
query {
  allPosts(filter: {
    body: { notLikeUnaccentInsensitive: "%gr_ss%" }
  }) {
    ...
  }
}
```

More info on the [patterns using LIKE](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-LIKE).

#### Match / not match a regex

```graphql
query {
  allPosts(filter: {
    body: { matchUnaccentInsensitive: ".*?Pin{2}ekjøt{2}$" }
  }) {
    ...
  }
}
```

```graphql
query {
  allPosts(filter: {
    body: { notMatchUnaccentInsensitive: ".*?pin{2}ekjot{2}$" }
  }) {
    ...
  }
}
```

More info on the [POSIX regular expressions](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-POSIX-REGEXP) using the `~*` operator.

