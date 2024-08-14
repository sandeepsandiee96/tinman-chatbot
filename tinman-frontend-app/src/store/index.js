import { createStore } from 'vuex';
import auth from './modules/auth';
import chat from './modules/chat';

const store = createStore({
  modules: {
    auth,
    chat,
  },
});

export default store; 
