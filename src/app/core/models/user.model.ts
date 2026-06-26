export interface User {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
  role: 'admin' | 'user';
  givenName?: string;
  familyName?: string;
}
