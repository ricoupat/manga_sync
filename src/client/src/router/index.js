import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import RegistrationPage from '@/views/RegistrationPage.vue';
import ProfilePage from '@/views/ProfilePage.vue'
import AboutPage from "@/views/AboutPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SearchPage from "@/views/SearchPage.vue";
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/Registration',
        name: 'RegistrationPage',
        component: RegistrationPage,
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch('checkAuth');

                if (!store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next(from.fullPath);
                }
            } catch (error) {
                next()
            }
        }
    },
    {
        path: '/Login',
        name: 'LoginPage',
        component: LoginPage,
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch('checkAuth');

                if (!store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next(from.fullPath);
                }
            } catch (error) {
                next()
            }
        }
    },
    {
        path: '/About',
        name: 'AboutPage',
        component: AboutPage
    },
    {
        path: '/Profile',
        name: 'ProfilePage',
        component: ProfilePage
    },
    {
        path: '/Search',
        name: 'SearchPage',
        component: SearchPage
    }
]

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

export default router;