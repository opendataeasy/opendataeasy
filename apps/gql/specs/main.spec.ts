// https://www.apollographql.com/docs/apollo-server/testing/testing
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../src/schema';
import * as assert from 'node:assert/strict';

describe("main", () => {
  it('should return books', async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers
    });

    const response = await testServer.executeOperation({
      query: 'query ExampleQuery { books { title } }'
    });

    // Note the use of Node's assert rather than Jest's expect; if using
    // TypeScript, `assert` will appropriately narrow the type of `body`
    // and `expect` will not.
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.books).toEqual([
      { title: 'The Awakening' },
      { title: 'City of Glass' }
    ]);
  });
});
