import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
    {
      path: '',
      component: NxWelcomeComponent,
      pathMatch: 'full',
    },
    {
      path: 'voting',
      loadComponent: () =>
        import('@voting-app/voting').then((m) => m.VotingComponent),
    },
  ];