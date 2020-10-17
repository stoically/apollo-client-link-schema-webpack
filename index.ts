import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from "@apollo/client/link/schema";

const resolvers = {
  Query: {
    example: () => "example",
  },
};

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      example: String
    }
  `,
  resolvers,
});

const link = new SchemaLink({ schema });
const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link,
});

(async () => {
  const res = await client.query({
    query: gql`
      {
        example
      }
    `,
  });
  console.log(res);
})();
