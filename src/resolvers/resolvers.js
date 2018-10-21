import print from '../escpos';

const resolvers = {
  Query: {
    ping: () => {
      return 'pong';
    },
  },
  Mutation: {
    print(root, { message }) {
      print(message);
      return {
        message,
      };
    },
  },
};

export default resolvers;
