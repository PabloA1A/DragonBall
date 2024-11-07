import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharacters = defineStore('characters', () => {

  const listCharacters = ref([])

  return { listCharacters }
})