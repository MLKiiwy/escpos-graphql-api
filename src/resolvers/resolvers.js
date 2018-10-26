import print from '../escpos';

const resolvers = {
  Query: {
    print: async () => {
      return print();
    },
  },
};

export default resolvers;
