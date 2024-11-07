<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const route = useRoute()
const router = useRouter()

const store = useAuthStore()

function login() {
    if (store.login(username.value, password.value)) {
        const modal = document.getElementById('loginModal')
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
    } else {
        alert('Usuario o contraseña incorrectos')
    }
}
</script>

<template>
    <form @submit.prevent="login" class="d-grid gap-2 mb-5 mt-5 needs-validation">
        <p class="h3 fw-normal inter-600 text-center"><strong>Login</strong></p>
        <p class="text-black text-center"> Enter your name and password to login </p>
        <div>
            <input type="text" class="form-control mb-2" id="floatingInput" placeholder="Name" v-model="username"
                required>
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password"
                required>
        </div>
        <button class="btn btn-orange" type="submit">Sign up</button>
        <p class="mt-3 text-muted text-center">If you don't have an account
            <button type="button" class="btn btn-link text-orange p-0" data-bs-toggle="modal"
                data-bs-target="#registerModal" data-bs-dismiss="modal">
                register
            </button>
        </p>
    </form>
</template>

<style scoped></style>
