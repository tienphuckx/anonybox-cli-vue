<template>
  <div class="message-container">
    <!-- Display each message with sender name, content, and timestamp -->
    <div
      v-for="(message, index) in groupDetails.messages"
      :key="index"
      :class="['message-item', message.user_id === currentUserId ? 'sent' : 'received']"
    >
      <div class="message-header">
        <span class="message-sender font-semibold">{{ message.user_name }}</span>
        <span class="message-time text-xs text-gray-400 mx-3">{{ formatTime(message.created_at) }}</span>
      </div>

      <p class="message-content text-sm text-gray-800">
        <span v-if="message.message_type === 'text'">{{ message.content }}</span>
        <a v-else-if="message.message_type === 'link'" :href="message.content" target="_blank" class="text-blue-500">
          {{ message.content }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessages",
  props: {
    groupDetails: {
      type: Object,
      required: false
    },
    currentUserId: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-item {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
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
  white-space: pre-wrap; /* Preserves line breaks in message content */
}

.message-time {
  font-size: 0.75rem;
}
</style>
