<template>
  <div class="chat-input bg-white p-4 border-t flex items-center">
    <!-- Attachment Button -->
    <button @click="attachFile" class="text-gray-500 mr-4">
      <i class="fas fa-paperclip"></i>
    </button>

    <!-- Message Input Field -->
    <textarea
      v-model="message"
      @input="adjustHeight"
      @keydown="handleKeyPress"
      placeholder="Write a message..."
      ref="chatInput"
      class="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none resize-none custom-scroll"
      :style="{ maxHeight: '600px' }"
    ></textarea>

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
    adjustHeight() {
      const textarea = this.$refs.chatInput;
      textarea.style.height = "auto"; // Reset height to auto to calculate the new height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 600)}px`; // Set height to scrollHeight, but not more than 600px
      textarea.scrollTop = textarea.scrollHeight; // Ensure scrolling to the latest line
    },
    handleKeyPress(event) {
      if (event.key === "Enter" && !event.ctrlKey) {
        event.preventDefault(); // Prevent default Enter behavior
        this.handleSendMessage();
      } else if (event.key === "Enter" && event.ctrlKey) {
        // Add a new line when Ctrl+Enter is pressed
        const cursorPosition = event.target.selectionStart;
        this.message =
          this.message.slice(0, cursorPosition) +
          "\n" +
          this.message.slice(cursorPosition);
        this.$nextTick(() => {
          event.target.selectionStart = event.target.selectionEnd = cursorPosition + 1;
          this.adjustHeight(); // Adjust height for new content
        });
      }
    },
    handleSendMessage() {
      if (this.message.trim()) {
        this.$emit("sendMessage", this.message.trim());
        this.message = ""; // Clear the input field after sending
        this.$nextTick(() => this.adjustHeight()); // Reset the height after clearing the input
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

textarea {
  overflow-y: auto; /* Enable scrolling */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide scrollbar in IE 10+ */
}

textarea::-webkit-scrollbar {
  display: none; /* Hide scrollbar in Chrome, Safari, Edge */
}

textarea.custom-scroll {
  max-height: 600px; /* Enforce a maximum height */
  min-height: 40px; /* Optional: Set a minimum height */
  transition: height 0.2s ease-in-out; /* Smooth height adjustment */
  line-height: 1.5; /* Consistent line spacing for better readability */
}
</style>
