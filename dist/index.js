'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _apolloServer = require('apollo-server');

var _resolvers = require('./resolvers/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Message from 'models/message';
var graphqlSchema = 'type Message {\n    id: ID!\n    message: String!\n}\n\ntype Query {\n    get(id: ID!): Message\n}\n\ntype Mutation {\n    createMessage(message: String!): Message\n}\n\nschema {\n    mutation: Mutation,\n    query: Query\n}\n';


var server = new _hapi2.default.Server();

server.connection({
    host: 'localhost',
    port: 8080
});

var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: [graphqlSchema],
    resolvers: (0, _resolvers2.default)()
});

server.register({
    register: _apolloServer.apolloHapi,
    options: {
        path: '/graphql',
        apolloOptions: function apolloOptions() {
            return {
                pretty: true,
                schema: executableSchema
            };
        }
    }
});

server.register({
    register: _apolloServer.graphiqlHapi,
    options: {
        path: '/graphiql',
        graphiqlOptions: {
            endpointURL: '/graphql'
        }
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at: ' + server.info.uri);
});
//# sourceMappingURL=index.js.map