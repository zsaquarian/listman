import type { CombinedError } from '@urql/svelte';
import type { GraphQLError } from 'graphql';

export interface ParsedError {
  type: 'MissingParam' | 'Unknown';
  field?: string;
}

const fieldMap = {
  usernameOrEmail: 'Username or e mail',
  password: 'Password',
};

const missingParamRegex = /Variable "\$(.*)" of/;

export const parseError = (err: GraphQLError): ParsedError => {
  // Missing param
  if (err.message.includes('required type')) {
    const missingParamReg = err.message.match(missingParamRegex);

    return {
      type: 'MissingParam',
      field: missingParamReg[1],
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

  return 'An unknown error occured. Please try later.';
};
