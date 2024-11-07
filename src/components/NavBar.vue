<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { RouterLink } from 'vue-router';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
}

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
                        <button class="nav-link btn" v-if="authStore.userLogin.isAuthenticated" @click="handleLogout">Logout</button>
                    </li>
                </ul>
            </div>
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
</style>