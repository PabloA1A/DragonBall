<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useCharacters } from '@/stores/CharactersStore'
import { RouterLink, useRouter } from 'vue-router'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const authStore = useAuthStore()
const charactersStore = useCharacters()
const router = useRouter()
const searchTerm = ref('')
const isInPlanetsPath = computed(() => router.currentRoute.value.path === '/planets')

const handleLogout = () => {
    authStore.logout()
    charactersStore.clearFavorites()
    router.push('/')
}

const handleSearch = (event) => {
    event.preventDefault()
    if (searchTerm.value.trim()) {
        if (isInPlanetsPath.value) {
            const filteredPlanets = charactersStore.searchPlanets(searchTerm.value)
            charactersStore.setFilteredPlanets(filteredPlanets)
        } else {
            const filteredCharacters = charactersStore.searchCharacters(searchTerm.value)
            charactersStore.setFilteredCharacters(filteredCharacters)
        }
    }
}

const handleReset = () => {
    searchTerm.value = ''
    if (isInPlanetsPath.value) {
        charactersStore.resetPlanets()
    } else {
        charactersStore.resetCharacters()
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-white bg-orange fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-link potta-one-regular">
                <img src="@/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                Dragon Ball
            </RouterLink>
            <ul class="navbar-nav mb-2 mb-md-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/planets" class="nav-link">Planets</RouterLink>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn" v-if="!authStore.userLogin.isAuthenticated" data-bs-toggle="modal"
                            data-bs-target="#loginModal">Login</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn" v-if="!authStore.userLogin.isAuthenticated" data-bs-toggle="modal"
                        data-bs-target="#registerModal">Register</button>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/favorite" v-if="authStore.userLogin.isAuthenticated" class="nav-link">Favorite
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn" v-if="authStore.userLogin.isAuthenticated"
                        @click="handleLogout">Logout</button>
                    </li>
                </ul>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <form class="d-flex ms-auto me-3" role="search" @submit="handleSearch">
                    <input class="form-control me-2" type="search" placeholder="Search characters or planets"
                        v-model="searchTerm" aria-label="Search">
                    <button class="btn btn-light" type="submit">
                        <i class="bi bi-search"></i>
                    </button>
                    <button class="btn btn-secondary ms-2" type="button" @click="handleReset">
                        Reset
                    </button>
                </form>
        </div>
    </nav>

    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Login</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel">Register</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <RegisterForm />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-link {
    color: #fff;
}

.form-control:focus {
    border-color: #E94C1A;
    box-shadow: 0 0 0 0.25rem rgba(233, 76, 26, 0.25);
}

.btn-light:hover {
    background-color: #E94C1A;
    color: white;
    border-color: white;
}
</style>
