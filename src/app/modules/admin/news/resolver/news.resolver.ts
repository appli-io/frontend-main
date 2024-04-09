import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { fakerES as faker }                                       from '@faker-js/faker';
import { INews }                                                  from '../domain/interfaces/news.interface';

export const newsResolver: ResolveFn<INews> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return {
    id           : faker.datatype.uuid(),
    headline     : faker.lorem.sentence(),
    slug         : faker.lorem.slug(),
    abstract     : faker.lorem.paragraph(),
    body         : faker.lorem.paragraphs(),
    images       : [ faker.image.imageUrl() ],
    portraitImage: faker.image.imageUrl(),
    isDeleted    : faker.datatype.boolean(),
    publishedAt  : faker.date.past(),
    updatedAt    : faker.date.recent(),
    category     : {
      id  : faker.datatype.uuid(),
      name: faker.lorem.words(),
      slug: faker.lorem.slug()
    },
    createdBy    : {
      id       : faker.datatype.number(),
      email    : faker.internet.email(),
      username : faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName : faker.name.lastName(),
      avatar   : faker.image.avatar()
    }
  };
};
