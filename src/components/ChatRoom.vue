<template>
  <ChatRoomTool @refreshGroups="refresh_list_group_and_chat_area" />
  <div class="chatroom-container h-full flex bg-gray-200">
    <!-- Sidebar for Chats -->
    <aside class="sidebar w-1/5 bg-white border-r border-gray-300 overflow-y-auto">
      <ChatSidebar 
        :listGroup="listGroup" 
        :listWaitingGroup="listWaitingGroup"
        @selectContact="selectContact" 
      />
    </aside>

    <!-- Main Chat Area -->
    <main class="chat-area flex flex-col">
      <ChatHeader
        v-if="groupDetails"
        :groupDetails="groupDetails"
        :isSettingsOpen="isSettingsOpen"
        @toggleSettings="toggleSettings"
      />

      <div class="messages-container flex-grow overflow-y-auto p-4">
        <ChatMessages 
          v-if="groupDetails"
          :groupDetails="groupDetails" 
          :messages="messages" 
          :currentUserId="currentUserId"
        />
        <p v-else class="text-gray-500 text-center">
          Select a group to start chatting
        </p>
      </div>

      <ChatInput
        v-if="groupDetails"
        :currentUserId="currentUserId"
        :currentGroupId="currentGroupId"
        @sendMessage="sendMessage"
      />
    </main>

    <section 
      v-if="isSettingsOpen" 
      class="settings-panel bg-white shadow-lg transition-all duration-300"
    >
      <ChatSettingsPanel 
        :groupId="currentGroupId"
        :userId="currentUserId"
        :groupDetails="groupDetails"
        @refreshGroups="refresh_list_group_and_chat_area" 
      />
    </section>
  </div>
</template>

<script>
import ChatSidebar from "@/components/chatroom/ChatSidebar.vue";
import ChatHeader from "@/components/chatroom/ChatHeader.vue";
import ChatMessages from "@/components/chatroom/ChatMessages.vue";
import ChatInput from "@/components/chatroom/ChatInput.vue";
import ChatRoomTool from "@/components/chatroom/ChatRoomTool.vue";
import ChatSettingsPanel from "@/components/chatroom/ChatSettingsPanel.vue";
import { fetchGroupDetails, fetchListGroups, sendMessageToServer } from "@/services/chatRoomService";
// import { useWebSocket } from '@vueuse/core';
export default {
  name: "ChatRoom",
  components: {
    ChatSidebar,
    ChatHeader,
    ChatMessages,
    ChatInput,
    ChatRoomTool,
    ChatSettingsPanel,
  },
  data() {
    return {
      listGroup: [],
      listWaitingGroup: [],
      groupDetails: null,
      currentGroupId: null,
      messages: [],
      currentUserId: null,
      isSettingsOpen: false,
    };
  },
  methods: {
    connectWebSocket() {
      if (this.ws) {
        console.log("Closing previous WebSocket connection...");
        this.ws.close();
      }

      const xUserCode = localStorage.getItem("x-user-code");
      if (!xUserCode) {
        console.error("x-user-code is missing from localStorage.");
        return;
      }

      if (!this.currentGroupId) {
        console.error("currentGroupId is not set. Cannot establish WebSocket connection.");
        return;
      }

      const wsUrl = `ws://localhost:8080/ws/groups/${this.currentGroupId}?x-user-code=${encodeURIComponent(xUserCode)}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.wsStatus = "connected";
        console.log("WebSocket connected");
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Message from server:", message);
          // Handle incoming messages and update the messages list
          this.messages.push(message);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        this.wsStatus = "disconnected";
        console.log("WebSocket disconnected");
        // this.reconnectWebSocket();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.ws.close();
      };
    },

    handleNoGroups() {
      alert("You haven't joined any groups yet!"); // Display a message to the user
      this.listGroup = []; // Ensure the list is empty
      this.groupDetails = null;
      this.messages = [];
    },

    reconnectWebSocket(attempt = 1) {
      if (attempt > 5) {
        console.error("Maximum reconnection attempts reached.");
        return;
      }

      setTimeout(() => {
        console.log(`Reconnecting WebSocket... Attempt ${attempt}`);
        // this.connectWebSocket();
      }, attempt * 3000); // Exponential backoff
    },

    async selectContact(group) {
      this.isSettingsOpen = false;

      if (!group || !group.group_id) {
        console.error("Invalid group selected.");
        return;
      }

      // console.log("Selected Group:", group);

      this.currentGroupId = group.group_id;
      // console.log("Updated currentGroupId:", this.currentGroupId);

      try {
        this.groupDetails = await fetchGroupDetails(this.currentGroupId);
        this.messages = this.groupDetails.messages || [];
        // console.log("Group details fetched:", this.groupDetails);

        // this.connectWebSocket();
      } catch (error) {
        console.error("Failed to fetch group details:", error);
        this.groupDetails = null;
        this.messages = [];
      }
    },

    async sendMessage(content) {
      if (!content || !content.trim()) {
        console.error("Cannot send empty message.");
        return;
      }

      console.log("Current User ID:", this.currentUserId);
      console.log("Current Group ID:", this.currentGroupId);

      if (!this.currentUserId || !this.currentGroupId) {
        console.error("User ID or Group ID is missing.");
        return;
      }

      const payload = {
        user_id: this.currentUserId,
        group_id: this.currentGroupId,
        content: content.trim(),
        message_type: "text",
      };

      console.log("Payload:", payload);

      try {
        const response = await sendMessageToServer(payload);
        console.log("Message sent successfully:", response);

        // Update the local messages list
        this.messages.push({
          ...payload,
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },

    async refresh_list_group_and_chat_area() {
      console.log("fetchListGroups triggered");

      this.groupDetails = null;
      this.isSettingsOpen = false;

      try {
        const response = await fetchListGroups(this.currentUserId);
        if (response && response.list_gr) {
          console.log("List of groups fetched:", response.list_gr);
          this.listGroup = response.list_gr;
        } else {
          console.error("Failed to fetch list of groups:", response?.error || "Unknown error.");
          this.handleNoGroups();
        }
      } catch (error) {
        console.error("Error fetching list of groups:", error.message);
        this.handleNoGroups();
      }
    },
  },

  async created() {
    const userCode = localStorage.getItem("x-user-code");
    const userId = localStorage.getItem("x-user-id");

    console.log("Created: from localstorage: ", userCode, userId);

    // Check if userId is valid (not null, empty, or undefined)
    if (!userId || userId.trim() === "" || isNaN(parseInt(userId, 10))) {
      this.handleNoGroups(); // Call a function to show the appropriate message
      return;
    }

    this.currentUserId = parseInt(userId, 10);
    const response = await fetchListGroups(this.currentUserId);

    console.log("List of waitting gr:", response.list_waiting_gr);
    if (response.list_waiting_gr) {
      this.listWaitingGroup = response.list_waiting_gr;
    }

    if (response) {
      this.listGroup = response.list_gr;
    } else {
      console.error("Failed to fetch list of groups:", response.error);
    }
  },
};
</script>

<style scoped>
.chatroom-container {
  display: flex;
  height: 93vh;
}

.chat-area {
  flex-grow: 1;
  overflow: hidden; /* Prevent content overflow */
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  height: 100%;
  max-width: 100%; /* Limit width to the parent container */
}

.settings-panel {
  overflow-y: auto;
  transition: width 0.3s;
}
</style>