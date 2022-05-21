import { db } from './db';
import { IN_PROD } from './utils/constants';
import { hash } from 'bcrypt';

const clear = async () => {
  await db.user.deleteMany({});
  await db.sharedList.deleteMany({});
};

export const seed = async () => {
  if (IN_PROD) return;

  await clear();
  // the user we use to check collabaration
  // you cannot login to this user since the password is not hashed
  await db.user.create({
    data: {
      username: 'test friend',
      email: 'testfriend@test.com',
      uuid: 'fake-uuid',
      password: await hash('fakePassword', 10),
    },
  });
};
