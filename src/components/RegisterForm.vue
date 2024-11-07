<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const username = ref('')
const password = ref('')
const passwordRepeat = ref('')

const route = useRoute()
const router = useRouter()

const store = useAuthStore()

function register() {
    if (isEmptyForm()) {
        alert('Fields cannot be empty')
    } else if (password.value == passwordRepeat.value) {
        if (!existUserInStorage(store.user, username.value)) {
            store.user.push({ username: username.value, password: password.value })
            const redirectPath = route.query.redirect || '/login'
            router.push(redirectPath)
        } else alert('The user exists, try another name')
    } else {
        alert('Password does not match')
    }
}

function isEmptyForm() {
    if (username.value == '' || password.value == '' || passwordRepeat.value == '')
        return true
}

function existUserInStorage(myArray, datName) {
    let temp = false
    myArray.forEach(element => {
        if (element.username == datName)
            temp = true
    })
    return temp
}
</script>

<template>
    <form @submit.prevent="register" class="d-grid gap-2 mb-4 mt-4 needs-validation">
        <p class="h3 fw-normal inter-600 text-center"><strong>Register</strong></p>
        <p class="text-black text-center"> Enter your name and password</p>
        <div>
            <input type="text" class="form-control mb-2" id="floatingInput" placeholder="Name" v-model="username"
                required>
            <input type="password" class="form-control mb-2" id="floatingPassword" placeholder="Password"
                v-model="password" required>
            <input type="password" class="form-control" id="floatingpasswordRepeat" placeholder="PasswordRepeat"
                v-model="passwordRepeat" required>
        </div>
        <button class="btn btn-orange" type="submit">Register</button>
        <p class="mt-3 text-muted text-center">If you have an account
            <RouterLink to="/login" class="text-orange">login</RouterLink>
        </p>
    </form>
</template>

<style scoped></style>
