import { API } from 'ynab'

export class AuthService {
  private static TOKEN_KEY = 'ynab_token'
  
  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }
  
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }
  
  static isAuthenticated(): boolean {
    return !!this.getToken()
  }
  
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      const api = new API(token)
      await api.user.getUser()
      return true
    } catch (error) {
      return false
    }
  }
} 