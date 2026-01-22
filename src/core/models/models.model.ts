export interface User {
  id: number;
  usuario: string;
  name: string;
  role: 'admin'; // Solo administradores
}