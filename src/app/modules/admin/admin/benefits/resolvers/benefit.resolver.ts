import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject }                                                 from '@angular/core';

import { BenefitsService } from '../services/benefits.service';

export const benefitResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  service: BenefitsService = inject(BenefitsService)
) => {
  return service.getOne(route.params.id);
};
