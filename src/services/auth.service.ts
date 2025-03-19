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
    if (!token || token.trim().length === 0) {
      console.error('Token validation failed: Token is empty')
      throw new Error('Token cannot be empty')
    }

    const trimmedToken = token.trim()
    console.log('Attempting to validate YNAB token...')
    
    try {
      // First try a direct API call to validate the token
      const headers = {
        'Authorization': `Bearer ${trimmedToken}`,
        'Accept': 'application/json'
      }
      
      console.log('Making request to YNAB API...')
      try {
        const response = await fetch('https://api.ynab.com/v1/user', {
          method: 'GET',
          headers
        })
        
        console.log('YNAB API Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error response text:', errorText)
          
          let errorData
          try {
            errorData = JSON.parse(errorText)
            console.log('Parsed error data:', errorData)
          } catch {
            errorData = { error: { detail: errorText } }
            console.log('Failed to parse error response as JSON')
          }
          
          console.error('YNAB API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          })
          
          if (response.status === 401) {
            throw new Error('Invalid YNAB token. Please check your token and try again.')
          }
          
          throw new Error(`YNAB API Error: ${errorData.error?.detail || response.statusText || 'Unknown error'}`)
        }
        
        const data = await response.json()
        console.log('Token validation successful:', data)
        return true
        
      } catch (error: any) {
        console.error('Direct API call failed:', error)
        
        if (error.message.includes('Invalid YNAB token')) {
          throw error
        }
        
        // If direct fetch fails, try using the YNAB SDK as fallback
        console.log('Falling back to YNAB SDK...')
        const api = new API(trimmedToken)
        const response = await api.user.getUser()
        console.log('Token validation successful via SDK:', response.data)
        return true
      }
      
    } catch (error: any) {
      console.error('Token validation failed:', error)
      throw error
    }
  }
} 