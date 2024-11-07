<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const username = ref('')
const password = ref('')

const route = useRoute()
const router = useRouter()

const store = useAuthStore()

function login() {
    store.user.forEach(function (element, index, array) {
        if (username.value == element.username && password.value == element.password) {
            store.userLogin.username = element.username
            store.userLogin.isAuthenticated = true
            const redirectPath = route.query.redirect || '/favorite'
            router.push(redirectPath)
        }
    })
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
            <RouterLink to="/register" class="text-orange">register</RouterLink>
        </p>
    </form>
</template>

<style scoped></style>
