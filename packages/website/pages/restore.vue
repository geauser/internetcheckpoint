<script lang="ts" setup>
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const config = useRuntimeConfig();
const store = useStore();

const firstTimeLoading     = ref(true);
const hasLoadedCheckpoints = ref(false);
const loadingCheckpoints   = ref(false);
const notGranted           = ref(false);
const loggingIn            = ref(false);


const checkpoints = ref<any[]>([]);

async function getCheckpoints() {

  if (!store.idToken) return [];

  const res = await fetch(`${config.public.apiUrl}/checkpoints`, {
    headers: {
      Authorization: `Bearer ${store.idToken}`
    }
  });
  const data = await res.json() as any[];
  return data;
}

async function loginWithGoogle() {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  provider.setCustomParameters({
    prompt: 'consent', // Force consent everytime
  });


  try {

    loggingIn.value = true;

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const { user } = result;

    if (!credential?.accessToken) {
      notGranted.value = true;
      return;
    }

    store.idToken = await user.getIdToken(true);
    store.currentUser = user;

    loadingCheckpoints.value = true;

    const res = await fetch(`${config.public.apiUrl}/restore?token=${credential?.accessToken}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${store.idToken}`
      }
    });
    const data = await res.json();

    if (data.error === 'PERMISSION_DENIED') {
      notGranted.value = true;
      await store.logout();
      return;
    }

    checkpoints.value =  await getCheckpoints();
    hasLoadedCheckpoints.value = true;
    loadingCheckpoints.value = false;

    loggingIn.value = false;


  } catch (err: any) {
    console.log(err.code);
    loggingIn.value = false;
    loadingCheckpoints.value = false;
  }

}

function tryAgain() {
  notGranted.value = false;
  hasLoadedCheckpoints.value = false;
  store.logout();
}

watch(() => store.waitingForFirebase, async () => {

  if (store.waitingForFirebase && !hasLoadedCheckpoints.value) return;

  if (store.idToken) {
    checkpoints.value = await getCheckpoints();
    hasLoadedCheckpoints.value = true;
  }

  firstTimeLoading.value = false;

}, { immediate: true });

watch(() => store.currentUser, () => {

  if (!store.currentUser) {
    loadingCheckpoints.value = false;
    hasLoadedCheckpoints.value = false;
    checkpoints.value = [];
  }

}, { immediate: true });

</script>

<template>

  <section class="px-4 sm:px-0">

    <div class="flex justify-center max-w-lg mx-auto mt-14 sm:mt-0 mb-8 pt-10">
      <RestoreGoBackToComments class="" />
    </div>

    <Transition name="fade" mode="out-in">

      <div
        v-if="store.waitingForFirebase || firstTimeLoading"
        class="flex justify-center items-center h-full">
        <CircleLoading class="h-5 w-5 border-gray-500" />
      </div>

      <div
        v-else
        class="
          flex flex-col items-center
          max-w-lg mx-auto w-full">

        <Transition name="fade" mode="out-in">

          <RestoreCheckpointsList
            v-if="hasLoadedCheckpoints && checkpoints.length"
            :checkpoints="checkpoints" />
          <RestoreNoCheckpointsFound
            v-else-if="hasLoadedCheckpoints && checkpoints.length === 0"
            @tryAgain="tryAgain" />
          <RestoreNotGranted
            v-else-if="notGranted"
            @tryAgain="loginWithGoogle" />
          <RestoreGatheringCheckpointsLoading v-else-if="loadingCheckpoints" />
          <RestoreExplanationProcess
            v-else
            :loging-in="loggingIn"
            @login="loginWithGoogle" />

        </Transition>

      </div>

    </Transition>


    <div
      v-if="false"
      class="flex flex-col items-center mt-14 sm:mt-0 pt-10 max-w-lg mx-auto w-full h-full px-6">

      <Transition name="fade" mode="out-in">

        <div
          v-if="!hasLoadedCheckpoints"
          class="flex flex-col items-center">


          <Transition name="fade">

            <div
              v-if="!loadingCheckpoints"
              class="mt-10">


            </div>

          </Transition>

          <div
            v-if="loadingCheckpoints"
            class="inline-flex justify-center items-center animate-fade-in-up mt-10 space-x-2 border border-gray-200 bg-white px-4 py-2 rounded-md shadow-sm">
            <p class="text-sm text-gray-500">Gathering checkpoints...</p>
            <CircleLoading class="h-3 w-3 border-gray-300" />
          </div>

        </div>

      </Transition>

    </div>

  </section>

</template>

<style scoped>

a {
  @apply font-medium text-blue-700 hover:underline;
}

</style>
