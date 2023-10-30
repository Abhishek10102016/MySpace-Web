import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://20.20.20.21:85/graphQl/',
  documents: ['apps/myspace/src/**/*.{ts,tsx}'],
  generates: {
    './apps/myspace/src/types/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
  
  // config: {                               // chatgpt tried suggestion 
  //   rejectUnauthorized: false
  // }
};

export default config;
