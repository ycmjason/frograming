import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counts: { won: 0, lost: 0 },
  },

  getters: {
    level: ({ route }) => {
      if (route.name !== 'level') return undefined;
      return Number(route.params.level);
    },
  },

  mutations: {
    setLevel: (state, l) => state.level = l,
    resetCounts: (state) => state.count = { won: 0, lost: 0 },
    won: ({ counts }) => counts.won++,
    lost: ({ counts }) => counts.lost++,
  },
  actions: {
    nextLevel ({ commit, state }) {
      commit('setLevel', state.level + 1);
      commit('resetCounts');
    },

    won: ({ commit }) => commit('won'),
    lost: ({ commit }) => commit('lost'),
  },
});
