<script setup>
import CardPlanet from '@/components/CardPlanet.vue'
import DragonBallService from '@/core/apis/dragonball/DragonBallService'
import Repository from '@/core/repository/Repository'
import { computed } from 'vue'
import { useCharacters } from '@/stores/CharactersStore'
import { ref } from 'vue'

const uri = import.meta.env.VITE_API_ENDPOINT_PLANETS
const repository = new Repository(uri)
const apiPlanets = new DragonBallService(repository)
const listPlanets = ref([])

async function setPlanets() {
    const planets = await apiPlanets.getPlanets(20, 1)
    listPlanets.value = planets
}

const charactersStore = useCharacters()
const planetsToShow = computed(() => 
  charactersStore.filteredPlanets.length > 0 
    ? charactersStore.filteredPlanets 
    : listPlanets.value
)

setPlanets()
</script>

<template>
   <div v-if="listPlanets" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div v-for="planet in planetsToShow" :key="planet.id" class="col">
            <CardPlanet :name="planet.name" :isDestroyed="planet.isDestroyed" 
                       :description="planet.description" :image="planet.image" />
        </div>
    </div>
</template>