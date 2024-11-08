import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharacters = defineStore('characters', () => {
  const listCharacters = ref([])

  const clearFavorites = () => {
    listCharacters.value = []
  }

  return { listCharacters, clearFavorites }
})