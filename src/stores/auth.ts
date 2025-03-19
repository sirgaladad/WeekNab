import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase, type UserProfile, encryptData, decryptData } from '@/lib/supabase'
import { AuthService } from '@/services'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  userEmail: string | null
  userProfile: UserProfile | null
  redirectPath: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    isAuthenticated: false,
    userEmail: null,
    userProfile: null,
    redirectPath: null
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      this.isAuthenticated = true
      AuthService.saveToken(token)
    },

    clearToken() {
      this.token = null
      this.isAuthenticated = false
      AuthService.logout()
    },

    checkAuth() {
      const token = AuthService.getToken()
      this.token = token
      this.isAuthenticated = AuthService.isAuthenticated()
      return this.isAuthenticated
    },

    async getUserToken(): Promise<string | null> {
      try {
        const encryptedToken = localStorage.getItem('ynab_token')
        if (!encryptedToken) return null
        return await decryptData(encryptedToken)
      } catch (error) {
        console.error('Failed to decrypt token:', error)
        return null
      }
    },

    setUserEmail(email: string) {
      this.userEmail = email
      localStorage.setItem('user_email', email)
    },

    setRedirectPath(path: string) {
      this.redirectPath = path
    },

    async validateToken(tokenToValidate?: string): Promise<boolean> {
      try {
        const token = tokenToValidate || this.token
        if (!token) {
          throw new Error('No token provided')
        }

        const isValid = await AuthService.validateToken(token)
        
        if (isValid) {
          this.setToken(token)
          return true
        }
        
        return false
      } catch (error) {
        console.error('Token validation failed:', error)
        this.clearToken()
        throw error
      }
    },

    async createAccount(email: string, ynabToken: string): Promise<boolean> {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: crypto.randomUUID(), // Generate a random password since we're using email-only auth
        })

        if (authError) throw authError

        // Encrypt the YNAB token
        const encryptedToken = await encryptData(ynabToken)

        // Create user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user?.id,
            email,
            ynab_token: encryptedToken,
            preferences: {
              theme: 'system',
              notifications: true,
              weekly_report_day: 0
            }
          })
          .select()
          .single()

        if (profileError) throw profileError

        this.setUserEmail(email)
        await this.setToken(ynabToken)
        this.userProfile = profileData
        return true
      } catch (error) {
        console.error('Account creation failed:', error)
        return false
      }
    },

    async signIn(email: string, ynabToken: string): Promise<boolean> {
      try {
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('email', email)
          .single()

        if (profileError) throw profileError

        this.setUserEmail(email)
        await this.setToken(ynabToken)
        this.userProfile = profileData
        return true
      } catch (error) {
        console.error('Sign in failed:', error)
        return false
      }
    },

    async deleteAccount(): Promise<boolean> {
      try {
        if (!this.userProfile) throw new Error('No user profile found')

        // Delete user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', this.userProfile.id)

        if (profileError) throw profileError

        // Delete auth user
        const { error: authError } = await supabase.auth.admin.deleteUser(
          this.userProfile.id
        )

        if (authError) throw authError

        await this.clearToken()
        return true
      } catch (error) {
        console.error('Account deletion failed:', error)
        return false
      }
    },

    async updatePreferences(preferences: Partial<UserProfile['preferences']>): Promise<boolean> {
      try {
        if (!this.userProfile) throw new Error('No user profile found')

        const { data, error } = await supabase
          .from('profiles')
          .update({
            preferences: {
              ...this.userProfile.preferences,
              ...preferences
            }
          })
          .eq('id', this.userProfile.id)
          .select()
          .single()

        if (error) throw error

        this.userProfile = data
        return true
      } catch (error) {
        console.error('Preferences update failed:', error)
        return false
      }
    }
  }
}) 