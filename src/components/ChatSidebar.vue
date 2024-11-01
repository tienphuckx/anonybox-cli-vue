<template>
    <div class="contact-list">
      <div
        v-for="group in listGroup"
        :key="group.group_id"
        class="contact-item p-4 cursor-pointer hover:bg-gray-100 flex items-center"
        @click="$emit('selectContact', group)"
      >
        <!-- Avatar -->
        <div class="avatar w-10 h-10 bg-gray-300 rounded-full mr-4 overflow-hidden">
          <img src="@/assets/logo.png" alt="Avatar" class="w-full h-full object-cover" />
        </div>
  
        <!-- Group Info and Latest Message -->
        <div class="flex-grow">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-800 text-sm">{{ group.group_name }}</h2>
            <!-- Message time formatted, use moment.js or date-fns if needed -->
            <p class="mt-3 text-xs text-gray-400">{{ formatTime(group.latest_ms_time) }}</p>
          </div>
          
          <p class="text-sm text-gray-500 flex items-center">
            <!-- Seen icon, adjust style as needed -->
            <span>{{ group.latest_ms_content || "No messages yet" }}</span>
          </p>
        </div>
  
        <!-- Pin Icon (optional) -->
        <span class="text-gray-400 ml-2">
          <i class="fas fa-thumbtack"></i> <!-- Font Awesome icon for pin -->
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatSidebar",
    props: {
      listGroup: Array,
    },
    methods: {
      formatTime(time) {
        if (time === "1970-01-01 00:00:00") {
          return "No time";
        }
        // Customize date formatting if needed, or use a library like date-fns or moment.js
        const date = new Date(time);
        const options = { weekday: 'short' }; // e.g., "Wed"
        return date.toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e7eb; /* Light border between contacts */
  }
  .avatar img {
    border-radius: 50%;
  }
  .contact-item:hover .text-gray-800 {
    color: #4f46e5; /* Change name color on hover */
  }
  </style>
  