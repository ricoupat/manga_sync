import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            isAuthenticated: false,
        };
    },
    mutations: {
        setAuthenticated(state, value) {
            state.isAuthenticated = value;
        },
    },
    actions: {
        setAuthenticated({ commit }, value) {
            commit('setAuthenticated', value);
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
    },
});

export default store;
