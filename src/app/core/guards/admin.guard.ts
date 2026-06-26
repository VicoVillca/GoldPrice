import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  if (userService.currentUser()?.role === 'admin') {
    return true;
  }
  
  return router.parseUrl('/dashboard');
};
