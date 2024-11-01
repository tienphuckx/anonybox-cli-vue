<template>
    <div class="chat-input bg-white p-4 border-t flex items-center">
      <input
        v-model="message"
        @keydown.enter="sendMessage"
        type="text"
        placeholder="Write a message..."
        class="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none"
      />
      <button @click="sendMessage" class="ml-4 text-purple-500">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatInput",
    data() {
      return {
        message: "",
      };
    },
    methods: {
      sendMessage() {
        if (this.message.trim()) {
          this.$emit("sendMessage", this.message);
          this.message = ""; // Clear the input after sending
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-input {
    display: flex;
    align-items: center;
  }
  </style>
  