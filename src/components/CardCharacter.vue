<script setup>
import { ref, computed } from 'vue'
import { useCharacters } from '@/stores/CharactersStore'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const isInFavoritePath = computed(() => route.path === '/favorite')

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    maxKi: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const flip = ref("")
const chartername = ref('')
const chartermaxKi = ref('')
const charterrace = ref('')
const listCharactersStore = useCharacters()

function setflip() {
    flip.value = flip.value === "" ? "cardFlip" : "";
}

function setFavorite(id, name, maxKi, race, description, image) {
    const temp = listCharactersStore.listCharacters.some(element => element.id === id)
    if (temp) {
        quitarStore(id)
    } else {
        listCharactersStore.listCharacters.push({
            id,
            name,
            maxKi,
            race,
            description,
            image,
        })
    }
}

function quitarStore(id) {
    const index = listCharactersStore.listCharacters.findIndex(el => el.id === id)
    listCharactersStore.listCharacters.splice(index, 1)
}

function editCharacter(id) {
    const index = listCharactersStore.listCharacters.findIndex(el => el.id === id)
    if (chartername.value !== "") {
        listCharactersStore.listCharacters[index].name = chartername.value
    }
    if (chartermaxKi.value !== "") {
        listCharactersStore.listCharacters[index].maxKi = chartermaxKi.value
    }
    if (charterrace.value !== "") {
        listCharactersStore.listCharacters[index].race = charterrace.value
    }
}

const isInFavorites = computed(() => {
    return listCharactersStore.listCharacters.some(element => element.id === props.id)
})

const isAuthenticated = computed(() => {
    return authStore.userLogin.isAuthenticated
})

</script>

<template>
    <div class="card bg-card position-relative" :class="flip">
        <div class="side">
            <a v-if="isAuthenticated" class="btn btn-trasparent front" 
               @click="setFavorite(id, name, maxKi, race, description, image)" 
               role="button">
                <i class="bi text-danger" :class="isInFavorites ? 'bi-heart-fill' : 'bi-heart'"></i>
            </a>
            <a v-if="isInFavoritePath" type="button" class="btn btn-trasparent front lado" 
               data-bs-toggle="modal" :data-bs-target="'#Modal' + id">
                <i class="bi bi-pencil-square"></i>
            </a>
            <img :src="image" class="card-img image-size-back" :alt=name>
            <div class="card-img-overlay">
                <img :src="image" class="image-size" :alt=name>
                <div class="position-absolute bottom-0 start-0 p-3">
                    <a class="m-0 p-0 btn btn-trasparent" @click="setflip"><strong>Name:</strong> {{ name }}</a>
                    <p class="m-0 p-0"><strong>Max Ki:</strong> {{ maxKi }}</p>
                    <p class="m-0 p-0"><strong>Raze:</strong> {{ race }}</p>
                    <p class="card-text" hidden>{{ description }}</p>
                </div>
            </div>
        </div>
        <div class="side back">
            <div class="position-absolute p-3">
                <p class="font-monospace">{{ description }}</p>
            </div>
        </div>
    </div>

    <div v-if="isInFavoritePath" class="modal fade" :id="'Modal' + id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="editCharacter(id)">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <p class="m-0 p-0"><strong>Name: {{ name }}</strong></p><input type="text"
                                placeholder="New Name" v-model="chartername">
                            <p class="m-0 p-0"><strong>Max Ki: {{ maxKi }}</strong></p><input type="text"
                                placeholder="New Max Ki" v-model="chartermaxKi">
                            <p class="m-0 p-0"><strong>Raze: {{ race }}</strong></p><input type="text"
                                placeholder="New Raze" v-model="charterrace">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style scoped>
.lado {
    margin-left: 35px;
}

.bg-card {
    background-color: #A9AAAD;
    height: 550px;
    background-position: center;
    background-size: cover;
    border: 0;
}

.image-size {
    width: 100%;
    height: 100%;
    min-height: 400px;
    max-height: 400px;
    object-position: center center;
    object-fit: contain;
}

.image-size-back {
    position: absolute;
    top: 20px;
    width: 100%;
    height: 100%;
    min-height: 400px;
    max-height: 450px;
    object-position: center center;
    object-fit: contain;
    opacity: 0.4;
    filter: brightness(0.2);
}

.card {
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
}

.card:hover {
    transform: rotateY(180deg);
}

.card .side {
    backface-visibility: hidden;
    border-radius: 6px;
    height: 100%;
    position: absolute;
    overflow: hidden;
    width: 100%;
}

.card .back {
    transform: rotateY(180deg);
}

.front {
    position: absolute;
    z-index: 1000;
}
</style>
