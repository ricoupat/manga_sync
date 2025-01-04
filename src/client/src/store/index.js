import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            isAuthenticated: false,
            alert: {
                type: '',
                message: '',
                visible: false,
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
            }, 5000);
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        alert(state) {
            return state.alert;
        }
    },
});

export default store;
