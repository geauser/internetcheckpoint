import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, onAuthStateChanged } from "firebase/auth";


export default defineNuxtPlugin(nuxtApp => {

  const config = useRuntimeConfig();


  if (!config.public.firebaseConfig) return;

  const firebaseConfig = JSON.parse(config.public.firebaseConfig);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  if (config.public.stage.startsWith('local')) {
    console.info('Using auth emulator...');
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }


  onAuthStateChanged(auth, async (user) => {

    const store = useStore();

    try {

      store.currentUser = user;
      store.idToken = await user?.getIdToken() ?? '';

      store.waitingForFirebase = false;

      if (process.dev) console.log('[TOKEN]', store.idToken);

    } catch (error) {
      console.error('[ERROR]', error);
    }

  });

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

});
