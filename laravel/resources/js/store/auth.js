import { OK, CREATED } from "../util";

const state = {
    user: null,
    apiStatus: null,
};

const getters = {
    check: state => !!state.user,
    username: state => (state.user ? state.user.name : ""),
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setApiStatus(state, status) {
        state.apiStatus = status;
    },
};

const actions = {
    async register(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/register", data);

        if (response.status === CREATED) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data);
            return false;
        }
        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },
    async login(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/login", data);

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data);
            return false;
        }

        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },
    async logout(context) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/logout");

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", null);
            return false;
        }

        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },

    async currentUser(context) {
        context.commit("setApiStatus", null);
        const response = await axios.get("/api/user");
        const user = response.data || null;

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", user);
            return false;
        }

        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
