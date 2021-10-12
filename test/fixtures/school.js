import faker from 'faker';
import { constants } from '../../app/utils';

const { SCH_CATEGORY } = constants;

export const schObj = {
  name: faker.company.companyName(),
  category: faker.helpers.randomize(SCH_CATEGORY),
  aboutUs: faker.random.words(),
  address: faker.address.streetAddress(),
  email: faker.internet.email(),
  banner: faker.image.imageUrl(),
  schoolFeesRange: faker.random.words(),
  facilities: faker.random.words()
};

export const reviewObj = {
  reviewerName: faker.name.firstName(),
  subject: faker.random.word(),
  message: faker.random.words(),
  rating: faker.datatype.number(5)
};
