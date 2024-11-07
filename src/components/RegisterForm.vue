<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const passwordRepeat = ref('')

const route = useRoute()
const router = useRouter()

const store = useAuthStore()

function register() {
    if (isEmptyForm()) {
        alert('Fields cannot be empty')
    } else if (password.value === passwordRepeat.value) {
        if (store.register(username.value, password.value)) {
            const registerModal = document.getElementById('registerModal')
            const registerModalInstance = bootstrap.Modal.getInstance(registerModal)
            registerModalInstance.hide()

            const loginModal = document.getElementById('loginModal')
            const loginModalInstance = new bootstrap.Modal(loginModal)
            loginModalInstance.show()
        } else {
            alert('The user exists, try another name')
        }
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
            <button type="button" class="btn btn-link text-orange p-0" data-bs-toggle="modal"
                data-bs-target="#loginModal" data-bs-dismiss="modal">
                login
            </button>
        </p>
    </form>
</template>

<style scoped></style>
