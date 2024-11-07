<template>
  <div class="chat-input bg-white p-4 border-t flex items-center">
    <!-- Attachment Button -->
    <button @click="attachFile" class="text-gray-500 mr-4">
      <i class="fas fa-paperclip"></i>
    </button>

    <!-- Message Input Field -->
    <input
      v-model="message"
      @keydown.enter="handleSendMessage"
      type="text"
      placeholder="Write a message..."
      class="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none"
    />

    <!-- Send Button -->
    <button @click="handleSendMessage" class="ml-4 text-purple-500">
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
    attachFile() {
      console.log("Attachment button clicked.");
    },
    handleSendMessage() {
      if (this.message.trim()) {
        this.$emit("sendMessage", this.message);
        this.message = ""; // Clear input field
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
