<!-- src/components/NavBar.vue -->
<template>
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
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  
  <style scoped>
  </style>
  