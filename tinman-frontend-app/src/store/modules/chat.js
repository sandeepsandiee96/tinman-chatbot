
import axios from 'axios';

const state = {
  threads: [],
  messages: [],
};

const mutations = {
  SET_THREADS(state, threads) {
    state.threads = threads;
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  }
};

const actions = {

    async fetchThreads({ commit }) {
        try {
          const response = await axios.get('/threads');
          commit('SET_THREADS', response.data); 
        } catch (error) {
          console.error('Failed to fetch threads:', error);
          throw error;
        }
      },
  async createThread({ commit },{ recipient }) {
    try {
      const response = await axios.post('/threads', { recipient });
      commit('SET_THREADS', response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async sendMessage({ commit }, { threadId, message }) {
    try {
      const response = await axios.post(`/threads/${threadId}/messages`, { message });
      commit('ADD_MESSAGE', response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async fetchMessages({ commit }, threadId) {
    try {
      const response = await axios.get(`/threads/${threadId}/messages`);
      commit('SET_MESSAGES', response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

const getters = {
  threads: (state) => state.threads,
  messages: (state) => state.messages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
