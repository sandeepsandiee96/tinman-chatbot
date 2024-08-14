import axios from 'axios';

const state = {
  user: null,
};


const getters = {
    user: (state) => state.user,
    currentUserId: (state) => (state.user ? state.user.id : null), 
  };
  
const actions = {
  async login({ commit }, nickname) {
    try {
      const response = await axios.post('/login', { nickname });
      commit('SET_USER', response.data.user);
      localStorage.setItem('userid', response.data.user.id); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  async logout({ commit }) {
    try {
      await axios.post('/logout');
      commit('LOGOUT');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
};

const mutations = {
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    },
  };

export default {
  state,
  mutations,
  actions,
  getters,
};
