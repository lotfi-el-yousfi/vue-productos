import {ref} from "vue";
import {defineStore} from "pinia";
import {login, register} from '@/domain/auth/service/ressources/authService'


export const useAuthStore = defineStore('AuthStore', () => {

    //state variable
    const token = ref<string[]>([]);

    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);


    //add action functions here

    const dispatch_login = async (username: string, password: string) => {
        isLoading.value = true
        error.value = null
        try {
            token.value = await login(username, password)
        } catch (err) {

            error.value = err
        }
        isLoading.value = false
    }
    const dispatch_register = async (username: string, password: string) => {
        isLoading.value = true
        error.value = null
        try {
            token.value = await register(username, password)
        } catch (err) {
            error.value = err
        }
        isLoading.value = false
    }
    return {
        token,

        isLoading,
        error,
        //add your functions here
        dispatch_login,
        dispatch_register
    };
}, {persist: true});
// 👇 This part is for Hot Module Replacement (in dev)
// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
//     import.meta.hot.dispose(() => useAuthStore().$dispose());
// }
//