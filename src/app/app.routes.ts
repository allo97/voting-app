import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@voting-app/voting').then((m) => m.VotingComponent)
  }
];
