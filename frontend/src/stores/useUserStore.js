import { create } from 'zustand'
import axios from 'axios'
import { persist } from 'zustand/middleware'

export const useUserStore = create(persist(
  (set) => ({
    user: null,
  
    login: async (email, password) => {
      const res = await axios.post('/auth/login', {email, password})
      set({ user: res.data.user})
    },
  
    register: async (username, email, password) => {
      const res = await axios.post('/auth/register', {username, email, password})
      set({ user: res.data.user})
    },
  
    getProfile: async () => {
      const res = await axios.get('/auth/profile')
      // console.log(res.data)
      set({ user: res.data.user})
    },
  
    logout: async () => {
      const res = await axios.post('auth/logout')
      set({ user: null})
    },

    refreshToken: async() => {
      const res = await axios.post('/auth/refresh')
    }
  }), {
    name: 'user-storage',
    partialize: (state) => ({ user: state.user })
  }
))

axios.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await axios.post('/auth/refresh', {}, { withCredentials: true })
        return axios(originalRequest)
      } catch (err) {
        console.error('Refresh failed:', err)
      }
    }

    return Promise.reject(error)
  }
)

// export const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       token: '',
//       isLoggedIn: false,

//       login: async (email, password) => {
//         try {
//           const res = await axios.post('/auth/login', { email, password })
//           const { token } = res.data
          

//           set({
//             token,
//             isLoggedIn: true,
//             user: res.data
//           })
//         } catch (error) {
//           console.error(error)
//           throw new Error(error.response?.data?.message || 'Login failed')
//         }
//       },

//       logout: () => {
//         set({
//           user: null,
//           token: '',
//           isLoggedIn: false
//         })
//       }
//     }),
//     {
//       name: 'user-storage', 
//     }
//   )
// )
