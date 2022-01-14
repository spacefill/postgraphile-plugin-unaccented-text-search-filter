import type { Plugin } from "graphile-build";
import { Build } from "postgraphile-core";
import { AddConnectionFilterOperator } from "postgraphile-plugin-connection-filter/dist/PgConnectionArgFilterPlugin";

const UnaccentedSearchFilterPlugin: Plugin = (builder) => {
  builder.hook("build", (_, build) => {
    const {
      pgSql: sql,
      graphql: { GraphQLString },
      addConnectionFilterOperator,
      escapeLikeWildcards,
    } = build as Build & {
      addConnectionFilterOperator: AddConnectionFilterOperator;
      escapeLikeWildcards: any;
    };

    addConnectionFilterOperator(
      "String",
      "includesUnaccentInsensitive",
      "Contains the specified string (unaccented case-insensitive).",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) ILIKE UNACCENT(${v})`,
      {
        resolveInput: (input) => `%${escapeLikeWildcards(input)}%`,
        resolveSqlIdentifier: (i) => i,
      }
    );

    addConnectionFilterOperator(
      "String",
      "NotIncludesUnaccentInsensitive",
      "Does not contain the specified string (unaccented case-insensitive).",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) NOT ILIKE UNACCENT(${v})`,
      {
        resolveInput: (input) => `%${escapeLikeWildcards(input)}%`,
        resolveSqlIdentifier: (i) => i,
      }
    );

    addConnectionFilterOperator(
      "String",
      "likeUnaccentInsensitive",
      "Matches the specified pattern (unaccented case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) ILIKE UNACCENT(${v})`,
      {
        resolveSqlIdentifier: (i) => i,
      }
    );

    addConnectionFilterOperator(
      "String",
      "notLikeUnaccentInsensitive",
      "Does not match the specified pattern (unaccented case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) NOT ILIKE UNACCENT(${v})`,
      {
        resolveSqlIdentifier: (i) => i,
      }
    );

    addConnectionFilterOperator(
      "String",
      "matchUnaccentInsensitive",
      "Matches the specified regular expression (unaccented case-insensitive) using the ~* operator.",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) ~* UNACCENT(${v})`,
      {
        resolveSqlIdentifier: (i) => i,
      }
    );

    addConnectionFilterOperator(
      "String",
      "notMatchUnaccentInsensitive",
      "Does not match the specified regular expression (unaccented case-insensitive) using the ~* operator.",
      () => GraphQLString,
      (i, v) => sql.query`UNACCENT(${i}) !~* UNACCENT(${v})`,
      {
        resolveSqlIdentifier: (i) => i,
      }
    );

    return _;
  });
};

export default UnaccentedSearchFilterPlugin;
