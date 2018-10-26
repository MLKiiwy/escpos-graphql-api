import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers/resolvers';
import 'babel-polyfill';

const typeDefs = gql`
  type Query {
    "Print test"
    print: Boolean
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
