<template>
  <div v-if="groupDetails" class="message-container" ref="messageContainer" @click="closeContextMenu">
    <!-- Display each message with sender name, content, and timestamp -->
    <div
      v-for="(message, index) in groupDetails.messages"
      :key="index"
      :class="['message-item', message.user_id === currentUserId ? 'received' : 'received']"
      class="relative group hover:bg-gray-100 p-2 rounded-lg transition duration-300"
      @contextmenu.prevent="showContextMenu($event, message)"
    >
      <div class="message-header">
        <span class="message-sender font-semibold">{{ message.user_name }}</span>
      </div>

      <p class="message-content text-sm text-gray-800">
        <span v-if="message.message_type === 'text'">
          <span>{{ message.content }}</span>
        </span>
      </p>

      <div class="message-footer flex justify-between items-center">
        <span class="message-time text-xs text-gray-400">{{ formatTime(message.created_at) }}</span>
      </div>
    </div>

    <!-- Context Menu -->
    <div
      v-if="contextMenu.visible"
      :class="['context-menu', contextMenu.visible ? 'visible' : '']"
      :style="{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }"
      @click.stop
    >
      <ul>
        <li @click="reactToMessage(contextMenu.message, 'heart')">❤️ React</li>
        <li @click="replyToMessage(contextMenu.message)">💬 Reply</li>
        <li @click="editMessage(contextMenu.message)">✏️ Edit</li>
        <li @click="pinMessage(contextMenu.message)">📌 Pin</li>
        <li @click="copyMessage(contextMenu.message)">📋 Copy Text</li>
        <li @click="deleteMessage(contextMenu.message)">🗑️ Delete</li>
      </ul>
    </div>
  </div>
</template>





<script>
export default {
  name: "ChatMessages",
  data() {
    return {
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        message: null,
      },
    };
  },
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
    "groupDetails.messages": {
      handler() {
        this.scrollToBottom();
      },
      deep: true,
    },
  },
  methods: {
    showContextMenu(event, message) {
      const menuWidth = 150; // Approximate width of the context menu
      const menuHeight = 200; // Approximate height of the context menu
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = event.clientX;
      let y = event.clientY;

      // Adjust the menu position if it overflows the viewport
      if (x + menuWidth > viewportWidth) {
        x = viewportWidth - menuWidth - 10; // Add some margin
      }
      if (y + menuHeight > viewportHeight) {
        y = viewportHeight - menuHeight - 10; // Add some margin
      }

      this.contextMenu.visible = true;
      this.contextMenu.x = x;
      this.contextMenu.y = y;
      this.contextMenu.message = message;
    },

    // Close the context menu
    closeContextMenu() {
      this.contextMenu.visible = false;
    },

    // Action methods
    reactToMessage(message, reaction) {
      console.log(`Reacted with ${reaction} to`, message);
      this.closeContextMenu();
    },
    replyToMessage(message) {
      console.log("Replied to", message);
      this.closeContextMenu();
    },
    editMessage(message) {
      console.log("Editing message:", message);
      this.closeContextMenu();
    },
    pinMessage(message) {
      console.log("Pinned message:", message);
      this.closeContextMenu();
    },
    copyMessage(message) {
      console.log("Copying message:", message);
      navigator.clipboard.writeText(message.content);
      this.closeContextMenu();
    },
    deleteMessage(message) {
      console.log("Deleting message:", message);
      this.closeContextMenu();
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    formatTime(utcTime) {
      try {
        if (!utcTime) return "Invalid time";

        const date = new Date(utcTime);
        if (isNaN(date.getTime())) return "Invalid time";

        date.setHours(date.getHours() + 7);

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
/* Container Styles */
.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.message-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar in WebKit browsers */
}

.message-item {
  max-width: 70%; /* Limit message width to 70% of the container */
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 10px;
  word-break: break-word; /* Break long words */
  white-space: pre-wrap; /* Preserve line breaks */
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
}

.message-sender {
  color: #075e54;
}

.message-content {
  word-wrap: break-word; /* Wrap long words to prevent overflow */
  overflow-wrap: break-word; /* Ensure breaking behavior across browsers */
}

/* Footer Styles */
.message-footer {
  font-size: 0.75rem;
}

.context-menu {
  position: absolute;
  z-index: 1000;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px 0;
  width: 150px;
  cursor: default;

  /* Initial state for the animation */
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.2s ease, transform 0.2s ease; /* Smooth animation */
}

/* Visible state for the animation */
.context-menu.visible {
  opacity: 1;
  transform: scale(1); /* Return to normal size */
}

/* List styling */
.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu li {
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.context-menu li:hover {
  background-color: #f5f5f5;
}
</style>



