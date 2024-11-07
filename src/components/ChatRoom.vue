<template>
  <ChatRoomTool @refreshGroups="refresh_list_group_and_chat_area" />
  <div class="chatroom-container h-full flex bg-gray-200">
    <!-- Sidebar for Chats -->
    <aside class="sidebar w-1/5 bg-white border-r border-gray-300 overflow-y-auto">
      <ChatSidebar :listGroup="listGroup" @selectContact="selectContact" />
    </aside>

    <!-- Main Chat Area -->
    <main class="chat-area flex flex-col">

      <ChatHeader
        v-if="groupDetails"
        :groupDetails="groupDetails"
        :isSettingsOpen="isSettingsOpen"
        @toggleSettings="toggleSettings"
      />

      <div v-if="groupDetails" class="messages flex-grow overflow-y-auto p-4">
        <ChatMessages 
        v-if="groupDetails"
        :groupDetails="groupDetails" 
        :messages="messages" 
        :currentUserId="currentUserId"
        :isSettingsOpen="isSettingsOpen"
        @toggleSettings="toggleSettings" />
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
      @refreshGroups="refresh_list_group_and_chat_area" />

      
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
      groupDetails: null,
      currentGroupId: null,
      messages: [],
      currentUserId: null,
      isSettingsOpen: false,
    };
  },
  methods: {
    handleNoGroups() {
      alert("You haven't joined any groups yet!"); // Display a message to the user
      // Optionally, navigate to a different page or show a UI message
      this.listGroup = []; // Ensure the list is empty
    },
  async selectContact(group) {
    this.isSettingsOpen = false; 
    console.log("Selected Group:", group); // Check if this logs the selected group object
    // Update currentGroupId with the selected group ID
    this.currentGroupId = group.group_id;
    console.log("Updated currentGroupId:", this.currentGroupId); // Check if currentGroupId is set correctly

    // Fetch group details and set messages for the selected group
    this.groupDetails = await fetchGroupDetails(this.currentGroupId);
    console.log(this.groupDetails); //
    this.messages = this.groupDetails.messages || []; // Assume messages are part of groupDetails
  },
  async sendMessage(content) {
    console.log("Current User ID:", this.currentUserId);
    console.log("Current Group ID:", this.currentGroupId); // Confirm that currentGroupId is set correctly here

    if (!this.currentUserId || !this.currentGroupId) {
      console.error("User ID or Group ID is missing.");
      return;
    }

    const payload = {
      user_id: this.currentUserId,
      group_id: this.currentGroupId,
      content: content,
      message_type: "text",
    };

    console.log("Payload:", payload); // Confirm that the payload is correctly formatted here

    try {
      const response = await sendMessageToServer(payload);
      console.log(response);

      this.messages.push({
        user_id: this.currentUserId,
        group_id: this.currentGroupId,
        content: content,
        message_type: "text",
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

    // empty chat group message
    this.groupDetails = null;
    this.isSettingsOpen = false;
    
    try {
      const response = await fetchListGroups(this.currentUserId);
      if (response) {
        console.log("List of groups fetched:", response.list_gr);
        this.listGroup = response.list_gr;
      } else {
        console.error("Failed to fetch list of groups:", response.error);
      }
    } catch (error) {
      console.error("Error fetching list of groups:", error.message);
    }
  }

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
  height: 90vh;
}

.chat-area {
  flex-grow: 1;
  transition: width 0.3s;
}

.chat-area.with-settings-open {
  width: 70%;
}

.settings-panel {
  overflow-y: auto;
  transition: width 0.3s;
}
</style>