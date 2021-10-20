import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import { join } from 'path';
import types from './nexus';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'nexus-typegen.ts'),
    schema: join(process.cwd(), 'schema.graphql'),
  },
  contextType: { module: join(process.cwd(), 'src/context.ts'), export: 'MyContext' },
  plugins: [fieldAuthorizePlugin()],
});
