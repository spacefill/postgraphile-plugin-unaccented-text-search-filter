import * as fs from "fs";
import * as path from "path";
import * as pg from "pg";
import { promisify } from "util";
import { GraphQLSchema, graphql } from "graphql";
import { withPgClient } from "../helpers";
import { createPostGraphileSchema } from "postgraphile-core";
import { PgConnectionArgCondition } from "graphile-build-pg";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
// import UnaccentedSearchFilterPlugin from "../../src/PostgraphileUnaccentFilterPlugin";

const readFile = promisify(fs.readFile);

const queriesDir = `${__dirname}/../fixtures/queries`;
const queryFileNames = fs.readdirSync(queriesDir);

let gqlSchemas: {
  unaccentedSearchFilter: GraphQLSchema;
};

beforeAll(async () => {
  // Ensure process.env.TEST_DATABASE_URL is set
  if (!process.env.TEST_DATABASE_URL) {
    console.error(
      "ERROR: No test database configured; aborting. To resolve this, ensure environmental variable TEST_DATABASE_URL is set."
    );
    process.exit(1);
  }
  // Setup the DB schema and data
  await withPgClient(async (pgClient) => {
    await pgClient.query(
      await readFile(`${__dirname}/../p-schema.sql`, "utf8")
    );
    await pgClient.query(await readFile(`${__dirname}/../p-data.sql`, "utf8"));
  });
  await withPgClient(async (pgClient) => {
    // Different fixtures need different schemas with different configurations.
    // Make all of the different schemas with different configurations that we
    // need and wait for them to be created in parallel.
    const [
      unaccentedSearchFilter,
    ] = await Promise.all([
      createPostGraphileSchema(pgClient, ["p"], {
        skipPlugins: [PgConnectionArgCondition],
        appendPlugins: [ConnectionFilterPlugin],
      }),
    ]);
    return {
      unaccentedSearchFilter,
    };
  });
});

for (const queryFileName of queryFileNames) {
  // eslint-disable-next-line jest/valid-title
  test(queryFileName, async () => {
    // Read the query from the file system.
    const query = await readFile(
      path.resolve(queriesDir, queryFileName),
      "utf8"
    );
    const gqlSchema = gqlSchemas.unaccentedSearchFilter;
    const result = await withPgClient(async (client: pg.PoolClient) =>
      graphql(gqlSchema, query, null, { pgClient: client })
    );
    expect(result).toMatchSnapshot();
  });
}
