import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { fakerES as faker }                                       from '@faker-js/faker';
import { INews }                                                  from '../domain/interfaces/news.interface';

export const newsResolver: ResolveFn<INews> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return {
    id: faker.string.uuid(),
    headline: faker.lorem.lines(1),
    slug: faker.lorem.slug(7),
    abstract: faker.lorem.lines(2),
    category: faker.lorem.slug(2),
    body: faker.lorem.paragraphs(50, '<br/>\n'),
    isRead: faker.datatype.boolean(),
    readTime: faker.number.int({min: 1, max: 59}),
    images: [
      faker.image.url({width: 1000, height: 400}),
      faker.image.url({width: 1000, height: 400}),
      faker.image.url({width: 400, height: 1000}),
      faker.image.url()
    ],
    publishedAt: faker.date.past().getTime(),
    updatedAt: faker.date.past().getTime(),
    createdBy: faker.person.fullName(),
  } as INews;
};
