import { Injectable, inject, computed } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService = inject(AuthService);
  
  currentUser = computed<User | null>(() => this.authService.currentUser());
}
