// magic regex is a modified version of https://regex101.com/r/fX8dY0/1
const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/g; // checks for CAPITAL and small letters, as well as numbers with length greater than or equal to 8
const usernameRegex = /^((?=\S*?[A-Za-z1-9]).{1,})\S$/g; // checks for any alphanumeric characters with length greater than or equal to 2

export const isPasswordValid = (password: string): boolean => {
  return !!password.match(passwordRegex);
};

export const isUsernameValid = (username: string): boolean => {
  console.log(username.match(usernameRegex));
  return !!username.match(usernameRegex);
};
