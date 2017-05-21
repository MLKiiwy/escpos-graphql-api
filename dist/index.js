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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzZXJ2ZXIiLCJTZXJ2ZXIiLCJjb25uZWN0aW9uIiwiaG9zdCIsInBvcnQiLCJleGVjdXRhYmxlU2NoZW1hIiwidHlwZURlZnMiLCJncmFwaHFsU2NoZW1hIiwicmVzb2x2ZXJzIiwicmVnaXN0ZXIiLCJvcHRpb25zIiwicGF0aCIsImFwb2xsb09wdGlvbnMiLCJwcmV0dHkiLCJzY2hlbWEiLCJncmFwaGlxbE9wdGlvbnMiLCJlbmRwb2ludFVSTCIsInN0YXJ0IiwiZXJyIiwiY29uc29sZSIsImxvZyIsImluZm8iLCJ1cmkiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7OztBQUNBOzs7O0FBSEE7Ozs7QUFLQSxJQUFNQSxTQUFTLElBQUksZUFBS0MsTUFBVCxFQUFmOztBQUVBRCxPQUFPRSxVQUFQLENBQWtCO0FBQ2RDLFVBQU0sV0FEUTtBQUVkQyxVQUFNO0FBRlEsQ0FBbEI7O0FBS0EsSUFBTUMsbUJBQW1CLHdDQUFxQjtBQUMxQ0MsY0FBVSxDQUFDQyxhQUFELENBRGdDO0FBRTFDQyxlQUFXO0FBRitCLENBQXJCLENBQXpCOztBQUtBUixPQUFPUyxRQUFQLENBQWdCO0FBQ1pBLHNDQURZO0FBRVpDLGFBQVM7QUFDTEMsY0FBTSxVQUREO0FBRUxDLHVCQUFlO0FBQUEsbUJBQU87QUFDbEJDLHdCQUFRLElBRFU7QUFFbEJDLHdCQUFRVDtBQUZVLGFBQVA7QUFBQTtBQUZWO0FBRkcsQ0FBaEI7O0FBV0FMLE9BQU9TLFFBQVAsQ0FBZ0I7QUFDWkEsd0NBRFk7QUFFWkMsYUFBUztBQUNMQyxjQUFNLFdBREQ7QUFFTEkseUJBQWlCO0FBQ2JDLHlCQUFhO0FBREE7QUFGWjtBQUZHLENBQWhCOztBQVVBaEIsT0FBT2lCLEtBQVAsQ0FBYSxVQUFDQyxHQUFELEVBQVM7QUFDbEIsUUFBSUEsR0FBSixFQUFTO0FBQ0wsY0FBTUEsR0FBTjtBQUNIO0FBQ0RDLFlBQVFDLEdBQVIseUJBQWtDcEIsT0FBT3FCLElBQVAsQ0FBWUMsR0FBOUM7QUFDSCxDQUxEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhhcGkgZnJvbSAnaGFwaSc7XG5pbXBvcnQge2Fwb2xsb0hhcGksIGdyYXBoaXFsSGFwaX0gZnJvbSAnYXBvbGxvLXNlcnZlcic7XG4vLyBpbXBvcnQgTWVzc2FnZSBmcm9tICdtb2RlbHMvbWVzc2FnZSc7XG5pbXBvcnQgZ3JhcGhxbFNjaGVtYSBmcm9tICcuLi9jb25maWcvZ3JhcGhxbC9zY2hlbWEuZ3JhcGhxbCc7XG5pbXBvcnQgY3JlYXRlUmVzb2x2ZXJzIGZyb20gJy4vcmVzb2x2ZXJzL3Jlc29sdmVycyc7XG5pbXBvcnQge21ha2VFeGVjdXRhYmxlU2NoZW1hfSBmcm9tICdncmFwaHFsLXRvb2xzJztcblxuY29uc3Qgc2VydmVyID0gbmV3IGhhcGkuU2VydmVyKCk7XG5cbnNlcnZlci5jb25uZWN0aW9uKHtcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICBwb3J0OiA4MDgwLFxufSk7XG5cbmNvbnN0IGV4ZWN1dGFibGVTY2hlbWEgPSBtYWtlRXhlY3V0YWJsZVNjaGVtYSh7XG4gICAgdHlwZURlZnM6IFtncmFwaHFsU2NoZW1hXSxcbiAgICByZXNvbHZlcnM6IGNyZWF0ZVJlc29sdmVycygpLFxufSk7XG5cbnNlcnZlci5yZWdpc3Rlcih7XG4gICAgcmVnaXN0ZXI6IGFwb2xsb0hhcGksXG4gICAgb3B0aW9uczoge1xuICAgICAgICBwYXRoOiAnL2dyYXBocWwnLFxuICAgICAgICBhcG9sbG9PcHRpb25zOiAoKSA9PiAoe1xuICAgICAgICAgICAgcHJldHR5OiB0cnVlLFxuICAgICAgICAgICAgc2NoZW1hOiBleGVjdXRhYmxlU2NoZW1hLFxuICAgICAgICB9KSxcbiAgICB9LFxufSk7XG5cbnNlcnZlci5yZWdpc3Rlcih7XG4gICAgcmVnaXN0ZXI6IGdyYXBoaXFsSGFwaSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBhdGg6ICcvZ3JhcGhpcWwnLFxuICAgICAgICBncmFwaGlxbE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGVuZHBvaW50VVJMOiAnL2dyYXBocWwnLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcblxuc2VydmVyLnN0YXJ0KChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYFNlcnZlciBydW5uaW5nIGF0OiAke3NlcnZlci5pbmZvLnVyaX1gKTtcbn0pO1xuIl19