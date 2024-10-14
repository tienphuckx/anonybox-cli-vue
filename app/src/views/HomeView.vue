<template>
    <div class="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 class="text-3xl font-bold text-blue-500 mb-6">Welcome to the Home Page</h1>
      
      <!-- Create a New Chat Room Button -->
      <button 
        class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        @click="goToCreateRoom">
        Create a New Chat Room
      </button>
  
      <!-- Join a Chat Room Button -->
      <button 
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        @click="goToJoinRoom">
        Join a Chat Room
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    methods: {
      goToCreateRoom() {
        // Navigate to CreateRoomView (path: '/create-room')
        this.$router.push({ name: 'CreateRoom' });
      },
      goToJoinRoom() {
        // Navigate to JoinRoomView (path: '/join-room')
        this.$router.push({ name: 'JoinRoom' });
      }
    }
  };
  </script>
  