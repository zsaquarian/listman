import type { CombinedError } from '@urql/svelte';
import type { GraphQLError } from 'graphql';

export interface ParsedError {
  type: 'MissingParam' | 'InvalidParam' | 'Unknown';
  field?: string;
}

const fieldMap = {
  usernameOrEmail: 'Username or e mail',
  password: 'Password',
  username: 'Username',
  email: 'E mail',
};

const missingParamRegex = /Variable "\$(.*)" of/;
const invalidParamRegex = /(.*) does not comply/;

export const parseError = (err: GraphQLError): ParsedError => {
  // Missing param
  if (err.message.includes('required type')) {
    const missingParamReg = err.message.match(missingParamRegex);

    return {
      type: 'MissingParam',
      field: missingParamReg[1],
    };
  }

  // Invalid param
  if (err.message.includes('comply with requirements')) {
    const invalidParamReg = err.message.match(invalidParamRegex);

    return {
      type: 'InvalidParam',
      field: invalidParamReg[1],
    };
  }

  return {
    type: 'Unknown',
  };
};

export const parseCombinedError = (err: CombinedError): ParsedError[] => {
  const allErrors = [] as ParsedError[];

  err.graphQLErrors.forEach((val) => {
    allErrors.push(parseError(val));
  });

  return allErrors;
};

export const getReadableError = (err: ParsedError): string => {
  if (err.type === 'MissingParam') return 'Please enter your ' + fieldMap[err.field];
  if (err.type === 'InvalidParam') return 'Field "' + fieldMap[err.field] + '" is invalid';

  return 'An unknown error occured. Please try later.';
};
