import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({
    state() {
        return {
            isAuthenticated: false,
            alert: {
                type: '',
                message: '',
                visible: false,
            },
            defaultSearchManga: {
                items: []
            }
        };
    },
    mutations: {
        setAuthenticated(state, value) {
            state.isAuthenticated = value;
        },
        setAlert(state, { message, type }) {
            state.alert.type = type;
            state.alert.message = message;
            state.alert.visible = true;
        },
        clearAlert(state) {
            state.alert.message = '';
            state.alert.type = '';
            state.alert.visible = false;
        },
        setDefaultSearchManga(state, value) {
            state.defaultSearchManga = value;
        }
    },
    actions: {
        setAuthenticated({ commit }, value) {
            commit('setAuthenticated', value);
        },
        triggerAlert({ commit }, { message, type }) {
            commit('setAlert', { message, type });

            setTimeout(() => {
                commit('clearAlert');
            }, 1500);
        },
        fetchDefaultSearchManga({ commit }, value) {
            commit('setDefaultSearchManga', value);
        },
        async checkAuth({ commit }) {
            try {
                await axios.post('/api/auth/check-auth', {}, { withCredentials: true })
                commit('setAuthenticated', true);
            } catch (error) {
                commit('setAuthenticated', false);
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        alert(state) {
            return state.alert;
        },
        defaultSearchManga(state) {
            return state.defaultSearchManga;
        }
    },
});

export default store;
