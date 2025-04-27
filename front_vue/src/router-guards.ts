import {useAuthStore} from "./domain/auth/store/authStore";
import {storeToRefs} from "pinia";
import {RouteLocationNormalized} from "vue-router";

export const authGuard = (to: RouteLocationNormalized,
                          from: RouteLocationNormalized) => {
    const {token} = storeToRefs(useAuthStore())
    alert('You are not logged in --' + token.value + "--")
    if (!token.value || token.value === null  ) {
        return {name: 'login', query: {redirect: to.fullPath}}
    }
    return true
}