import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
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
    }
  }), {
    name: 'user-storage',
    partialize: (state) => ({ user: state.user })
  }
))

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
