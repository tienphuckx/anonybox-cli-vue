<template>
  <div v-if="groupDetails" class="message-container" ref="messageContainer">
    <!-- Display each message with sender name, content, and timestamp -->
    <div
      v-for="(message, index) in groupDetails.messages"
      :key="index"
      :class="['message-item', message.user_id === currentUserId ? 'sent' : 'received']"
    >
      <div class="message-header">
        <span class="message-sender font-semibold">{{ message.user_name }}</span>
      </div>

      <p class="message-content text-sm text-gray-800">
        <span v-if="message.message_type === 'text'">{{ message.content }}</span>
        <a v-else-if="message.message_type === 'link'" :href="message.content" target="_blank" class="text-blue-500">
          {{ message.content }}
        </a>
      </p>

      <div class="message-footer">
        <span class="message-time text-xs text-gray-400">{{ formatTime(message.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessages",
  props: {
    groupDetails: {
      type: Object,
      required: false,
    },
    currentUserId: {
      type: Number,
      required: true,
    },
  },
  watch: {
    // Watch for changes in messages to scroll to the bottom
    "groupDetails.messages": {
      handler() {
        this.scrollToBottom();
      },
      deep: true, // Detect changes in the array's content
    },
  },
  methods: {
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth", // Smooth scrolling effect
        });
      }
    },
    formatTime(utcTime) {
      try {
        if (!utcTime) return "Invalid time";

        const date = new Date(utcTime); // Convert UTC string to Date object
        if (isNaN(date.getTime())) return "Invalid time";

        date.setHours(date.getHours() + 7); // Add 7 hours for Vietnam timezone

        return date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } catch (error) {
        console.error("Error formatting time:", error);
        return "Invalid time";
      }
    },
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  height: 100%; /* Adjust height based on parent container */

  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.message-container::-webkit-scrollbar {
  display: none; /* Webkit browsers */
}

.message-item {
  max-width: 70%; /* Limit message width to 70% of the container */
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
  word-wrap: break-word; /* Break long words onto a new line */
  white-space: pre-wrap; /* Preserve line breaks in the message content */
}

.message-item.sent {
  background-color: #dcf8c6;
  align-self: flex-end;
  border-radius: 10px 0 10px 10px;
}

.message-item.received {
  background-color: #fff;
  align-self: flex-start;
  border-radius: 0 10px 10px 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-sender {
  color: #075e54;
}

.message-content {
  white-space: pre-wrap;
}

.message-time {
  font-size: 0.75rem;
}
</style>
