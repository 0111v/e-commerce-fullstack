import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: '',
      isLoggedIn: false,

      login: async (email, password) => {
        try {
          const res = await axios.post('/auth/login', { email, password })
          const { token } = res.data
          

          set({
            token,
            isLoggedIn: true,
            user: res.data
          })
        } catch (error) {
          console.error(error)
          throw new Error(error.response?.data?.message || 'Login failed')
        }
      },

      logout: () => {
        set({
          user: null,
          token: '',
          isLoggedIn: false
        })
      }
    }),
    {
      name: 'user-storage', // 👈 the name in localStorage
    }
  )
)
