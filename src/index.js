import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers/resolvers';

const typeDefs = gql`
  type Query {
    "Test query"
    ping: String
  }

  type Message {
    id: ID!
    message: String!
  }

  type Mutation {
    print(message: String!): Message
  }
`;

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
