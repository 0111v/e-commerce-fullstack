import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSearchStore = create(persist(
  (set) => ({
    search: '',
    setSearch: (value) => {
      set({ search: value})
    }
  }),
  {
    name: 'search-storage'
  }
))
