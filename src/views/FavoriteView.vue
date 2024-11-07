<script setup>
import CardCharacter from '@/components/CardCharacter.vue';
import { useCharacters } from '@/stores/CharactersStore';

const listCharactersStore = useCharacters()

</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
        <div v-for="character in listCharactersStore.listCharacters" :key="character.id" class="col">
            <CardCharacter :id="character.id" :name="character.name" :maxKi="character.maxKi" :race="character.race"
                :description="character.description" :image="character.image" />
        </div>
    </div>
</template>

<style></style>
