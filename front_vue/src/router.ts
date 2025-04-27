import {createRouter, createWebHistory} from 'vue-router'
import Login from "./domain/auth/view/login.vue";
import Register from "./domain/auth/view/register.vue";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router