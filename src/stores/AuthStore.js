import { ref } from "vue"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', () => {

    const userLogin = ref(
        {
            username: '',
            isAuthenticated: false
        }
    )

    const user = ref(
        [{
            username: 'admin',
            password: 'admin',
        }]
    )

    return { user, userLogin}
})