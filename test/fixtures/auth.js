import faker from 'faker';

const userPassword = 'Fg7r85t95er8';

export const invalidSignUpObj = {
  firstName: faker.random.alpha({ count: 3 }),
  email: faker.internet.email(),
  password: faker.internet.password(7),
  phoneNumber: `${faker.datatype.number({ min: 9999999999, max: 99999999999 })}`,
};

export const rightSignUpObj = {
  firstName: faker.random.alpha({ count: 3 }),
  lastName: faker.random.alpha({ count: 3 }),
  email: faker.internet.email(),
  password: userPassword,
  phoneNumber: `${faker.datatype.number({ min: 9999999999, max: 99999999999 })}`,
  paymentPointer: faker.random.alphaNumeric(28)
};

export const duplicateSignUpObj = {
  firstName: faker.random.alpha({ count: 3 }),
  lastName: faker.random.alpha({ count: 3 }),
  email: rightSignUpObj.email,
  password: faker.internet.password(7),
  phoneNumber: `${faker.datatype.number({ min: 9999999999, max: 99999999999 })}`,
  paymentPointer: faker.random.alphaNumeric(28)
};

export const rightLoginObj = {
  email: rightSignUpObj.email,
  password: userPassword
};
