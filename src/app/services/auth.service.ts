import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken && !this.isTokenExpired(decodedToken.exp)) {
        return true;
      }
    }
    return false;
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.role : null;
    }
    return null;
  }
  getUserStatus(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.is_active : null;
    }
    return null;
  }
  getUserId(): any{
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      
      return decodedToken ? decodedToken.userId : null;

    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  private isTokenExpired(expiration: number | undefined): boolean {
    if (!expiration) {
      return true;
    }
    const now = Math.floor(Date.now() / 1000);
    return expiration < now;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
