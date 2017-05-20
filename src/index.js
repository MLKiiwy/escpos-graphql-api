import hapi from 'hapi';
import {apolloHapi, graphiqlHapi} from 'apollo-server';
// import Message from 'models/message';
import graphqlSchema from '../config/graphql/schema.graphql';
import createResolvers from './resolvers/resolvers';
import {makeExecutableSchema} from 'graphql-tools';

const server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 8080,
});

const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(),
});

server.register({
    register: apolloHapi,
    options: {
        path: '/graphql',
        apolloOptions: () => ({
            pretty: true,
            schema: executableSchema,
        }),
    },
});

server.register({
    register: graphiqlHapi,
    options: {
        path: '/graphiql',
        graphiqlOptions: {
            endpointURL: '/graphql',
        },
    },
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
