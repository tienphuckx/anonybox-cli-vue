<template>
  <div class="h-screen flex flex-col">
    <!-- Conditionally render the NavBar component -->
    <NavBar v-if="showNavBar" />

    <!-- Page Content -->
    <div class="flex-grow bg-purple-50">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/TheFirstNavBar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();

    // Determine whether to show the NavBar based on the current route
    const showNavBar = computed(() => route.path !== "/chat-room");

    return { showNavBar };
  },
};
</script>

<style>
</style>
