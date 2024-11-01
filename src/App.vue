<template>
  <div class="h-screen flex flex-col">
    <!-- Navigation Bar -->
    <nav class="bg-gray-800 p-4">
      <div class="flex justify-center space-x-8">
        <router-link
          to="/"
          class="text-white"
          active-class="font-bold"
        >
          Landing Page
        </router-link>
        <router-link
          to="/create-room"
          class="text-white"
          active-class="font-bold"
        >
          Create Room
        </router-link>
        <router-link
          to="/join-room"
          class="text-white"
          active-class="font-bold"
        >
          Join Room
        </router-link>
      </div>
    </nav>

    <!-- Page Content (The router-view will load the content of each page) -->
    <div class="flex-grow bg-purple-50">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Optional custom styles */
</style>
