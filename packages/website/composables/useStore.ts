import { getAuth, User } from 'firebase/auth';
import { defineStore, acceptHMRUpdate } from 'pinia';


export const useStore = defineStore('main', {

  state: () => ({

    currentUser: null as User | null,
    idToken: '',
    loggingOutFlag: false,

    waitingForFirebase: true,

    previousRoutePath: '',

  }),

  getters: {

    isLoggedIn: (state) => !!state.currentUser && !state.loggingOutFlag,

  },

  actions: {

    async logout() {
      this.loggingOutFlag = true;
      await getAuth().signOut();
      this.currentUser = null;
      this.loggingOutFlag = false;

      // Reset all data
      this.previousRoutePath = '';
      this.waitingForFirebase = false;
    },

    async refreshIdToken() {
      this.idToken = await this.currentUser?.getIdToken(true) ?? '';
      return this.idToken;
    },

  },

});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
