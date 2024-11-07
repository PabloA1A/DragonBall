<script setup>
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore()

</script>

<template>
    <nav class="navbar navbar-expand-md navbar-white bg-orange fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-link potta-one-regular">
                <img src="@/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                Dragon Ball
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <form class="d-flex invisible" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/planets" class="nav-link">Planets</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/login" v-if="!authStore.userLogin.isAuthenticated" class="nav-link">Login
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/register" v-if="!authStore.userLogin.isAuthenticated" class="nav-link">Register
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/favorite" v-if="authStore.userLogin.isAuthenticated" class="nav-link">Favorite
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/logout" v-if="authStore.userLogin.isAuthenticated" class="nav-link">Logout
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav-link {
    color: #fff;
}
</style>