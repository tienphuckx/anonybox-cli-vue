<template>
  <div class="h-screen flex flex-col">
    <!-- Navigation Bar -->
    <nav class="bg-gradient-to-r from-purple-600 to-blue-500 p-4">

      <div class="flex justify-center space-x-8">
        <router-link
          to="/"
          class="font-bold text-white border-2 border-transparent rounded px-6 py-1"
          active-class="font-bold text-white-500 border-white"
        >
          Home
        </router-link>
        <router-link
          to="/create-room"
          class="font-bold text-white border-2 border-transparent rounded px-6 py-1"
          active-class="font-bold text-white-500 border-white"
        >
          New Room
        </router-link>
        <router-link
          to="/join-room"
          class="font-bold text-white border-2 border-transparent rounded px-6 py-1"
          active-class="font-bold text-white-500 border-white"
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
