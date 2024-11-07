<script setup>
import CardCharacter from '@/components/CardCharacter.vue';
import DragonBallService from '@/core/apis/dragonball/DragonBallService';
import Repository from '@/core/repository/Repository';
import { ref } from 'vue';

const uri = import.meta.env.VITE_API_ENDPOINT_CHARACTERS
const repository = new Repository(uri)
const apiCharacters = new DragonBallService(repository)
const listCharacters = ref([])
const totalPages = ref()
const currentPage = ref()

async function setCharacters(page) {
  const data = await apiCharacters.getCharacters(8, page)
  listCharacters.value = data[0]
  totalPages.value = data[1]
  currentPage.value = data[2]
}

setCharacters(1)

</script>

<template>
  <div v-if="listCharacters" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
    <div v-for="character in listCharacters" :key="character.id" class="col">
      <CardCharacter :id="character.id" :name="character.name" :maxKi="character.maxKi" :race="character.race"
        :description="character.description" :image="character.image"/>
    </div>
  </div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage == 1 }">
        <button class="page-link" @click="setCharacters(1)">First</button>
      </li>
      <li class="page-item" :class="{ active: currentPage == 1 }"><button class="page-link"
          @click="setCharacters(currentPage == 1 ? (currentPage != totalPages ? currentPage : currentPage - 2) : currentPage - 1)">{{
            currentPage == 1 ? (currentPage != totalPages ? currentPage : currentPage - 2) : (currentPage != totalPages ?
              currentPage - 1 : currentPage - 2) }}</button></li>
      <li class="page-item"
        :class="{ active: currentPage == (currentPage != 1 ? (currentPage != totalPages ? currentPage : currentPage - 1) : currentPage + 1) }">
        <button class="page-link"
          @click="setCharacters(currentPage != 1 ? (currentPage != totalPages ? currentPage : currentPage - 1) : currentPage + 1)">{{
            currentPage != 1 ? (currentPage != totalPages ? currentPage : currentPage - 1) : currentPage + 1 }}</button>
      </li>
      <li class="page-item" :class="{ active: currentPage == totalPages }"><button class="page-link"
          @click="setCharacters(currentPage != 1 ? (currentPage != totalPages ? currentPage + 1 : currentPage) : currentPage + 2)">{{
            currentPage != 1 ? (currentPage != totalPages ? currentPage + 1 : currentPage) : currentPage + 2 }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage == totalPages }">
        <button class="page-link" @click="setCharacters(totalPages)">Last</button>
      </li>
    </ul>
  </nav>
</template>
