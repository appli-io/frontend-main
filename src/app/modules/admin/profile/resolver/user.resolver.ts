import { ResolveFn } from '@angular/router';
import { IUser }     from '@modules/admin/profile/interfaces/user.interface';
import { faker }     from '@faker-js/faker';

export const userResolver: ResolveFn<IUser> = (route, state) => {
  const fullName = faker.person.fullName();
  const username = fullName.split(' ').join('.').toLowerCase();
  return {
    id: faker.string.uuid(),
    name: fullName,
    username,
    email: faker.internet.email(),
    avatar: faker.image.urlLoremFlickr({width: 320, height: 320}),
    position: faker.person.jobTitle(),
    location: faker.location.city(),
    portrait: faker.image.urlPicsumPhotos({width: 2153, height: 320})
  };
};
