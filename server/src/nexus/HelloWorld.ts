import { extendType } from 'nexus';

export const HelloWorld = extendType({
  type: 'Query',
  definition: (t) => {
    t.string('helloWorld', { resolve: () => 'Hello World!' });
  },
});
