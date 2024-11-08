import { ref } from 'vue'
import { defineStore } from 'pinia'
import DragonBallService from '@/core/apis/dragonball/DragonBallService'
import Repository from '@/core/repository/Repository'

const characterUri = import.meta.env.VITE_API_ENDPOINT_CHARACTERS
const planetUri = import.meta.env.VITE_API_ENDPOINT_PLANETS

const characterRepository = new Repository(characterUri)
const planetRepository = new Repository(planetUri)

const apiCharacters = new DragonBallService(characterRepository)
const apiPlanets = new DragonBallService(planetRepository)

export const useCharacters = defineStore('characters', () => {
  const listCharacters = ref([])
  const filteredCharacters = ref([])
  const filteredPlanets = ref([])
  const allCharacters = ref([])
  const allPlanets = ref([])

  const clearFavorites = () => {
    listCharacters.value = []
  }

  const setFilteredCharacters = (characters) => {
    filteredCharacters.value = characters
  }

  const setFilteredPlanets = (planets) => {
    filteredPlanets.value = planets
  }

  const searchCharacters = (term) => {
    return allCharacters.value.filter(character => 
      character.name.toLowerCase().includes(term.toLowerCase()) ||
      character.race.toLowerCase().includes(term.toLowerCase())
    )
  }

  const searchPlanets = (term) => {
    return allPlanets.value.filter(planet => 
      planet.name.toLowerCase().includes(term.toLowerCase())
    )
  }

  const resetCharacters = () => {
    filteredCharacters.value = allCharacters.value
  }

  const resetPlanets = () => {
    filteredPlanets.value = allPlanets.value
  }

  const loadCharacters = async () => {
    const data = await apiCharacters.getCharacters(100, 1)
    allCharacters.value = data[0]
    resetCharacters()
  }

  const loadPlanets = async () => {
    const data = await apiPlanets.getPlanets(100, 1) 
    allPlanets.value = data
    resetPlanets()
  }

  loadCharacters()
  loadPlanets()

  return { 
    listCharacters, 
    filteredCharacters,
    filteredPlanets,
    allCharacters,
    allPlanets,
    clearFavorites,
    setFilteredCharacters,
    setFilteredPlanets,
    searchCharacters,
    searchPlanets,
    resetCharacters,
    resetPlanets
  }
})