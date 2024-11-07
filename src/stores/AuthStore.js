import { ref } from "vue"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', () => {

    const userLogin = ref({
        username: '',
        isAuthenticated: false
    })

    const users = ref([
        {
            username: 'admin',
            password: 'admin',
        }
    ])

    const login = (username, password) => {
        const user = users.value.find(user => user.username === username && user.password === password)
        if (user) {
            userLogin.value.username = user.username
            userLogin.value.isAuthenticated = true
            return true
        }
        return false
    }

    const register = (username, password) => {
        const userExists = users.value.some(user => user.username === username)
        if (!userExists) {
            users.value.push({ username, password })
            return true
        }
        return false
    }

    const logout = () => {
        userLogin.value.username = ''
        userLogin.value.isAuthenticated = false
        router.push('/')
    }

    return { users, userLogin, login, register, logout }
})