<template>
    <header class="chat-header bg-gray-100 border-b p-4 flex items-center">
      <!-- Group Avatar -->
      <div class="avatar w-10 h-10 bg-gray-300 rounded-full mr-4 overflow-hidden">
        <img src="@/assets/logo.png" alt="Group Avatar" class="w-full h-full object-cover" />
      </div>
  
      <!-- Group Information -->
      <div class="flex-grow">
        <h2 class="font-semibold text-gray-800 text-lg">{{ groupDetails.group_name || 'Group Name' }}</h2>
        <p class="text-sm text-gray-500">
          {{ groupDetails.joined_member }} members
        </p>
      </div>
  
      <!-- Header Icons -->
      <div class="flex space-x-3 text-gray-500">
        <button>
          <i class="fas fa-search"></i>
        </button>
        <button>
          <i class="fas fa-comments"></i>
        </button>
        <button>
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "ChatHeader",
    props: {
      groupDetails: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .avatar img {
    border-radius: 50%;
  }
  </style>
  