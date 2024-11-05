<template>
  <ChatRoomTool />
  <div class="chatroom-container h-full flex bg-gray-200">
    <!-- Sidebar for Chats -->
    <aside class="sidebar w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
      <ChatSidebar :listGroup="listGroup" @selectContact="selectContact" />
    </aside>

    <!-- Main Chat Area -->
    <main class="chat-area w-3/4 flex flex-col">

      <!-- Chat Header -->
      <ChatHeader v-if="groupDetails" :groupDetails="groupDetails" />

      <!-- Messages List -->
      <div v-if="groupDetails" class="messages flex-grow overflow-y-auto p-4">
        <ChatMessages :groupDetails="groupDetails" :messages="messages" :currentUserId="currentUserId" />
      </div>

      <!-- Chat Input Area -->
      <ChatInput
        v-if="groupDetails"
        :currentUserId="currentUserId"
        :currentGroupId="currentGroupId"
        @sendMessage="sendMessage"
      />
    </main>
  </div>
</template>

<script>
import ChatSidebar from "@/components/ChatSidebar.vue";
import ChatHeader from "@/components/ChatHeader.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatInput from "@/components/ChatInput.vue";
import ChatRoomTool from "@/components/chatroom/ChatRoomTool.vue";
import { fetchGroupDetails, fetchListGroups, sendMessageToServer } from "@/services/chatRoomService";

export default {
  name: "ChatRoom",
  components: {
    ChatSidebar,
    ChatHeader,
    ChatMessages,
    ChatInput,
    ChatRoomTool,
  },
  data() {
    return {
      listGroup: [],
      groupDetails: null,
      currentGroupId: null,
      messages: [],
      currentUserId: Number(this.$route.query.user_id),
    };
  },
  methods: {
  async selectContact(group) {
    console.log("Selected Group:", group); // Check if this logs the selected group object
    // Update currentGroupId with the selected group ID
    this.currentGroupId = group.group_id;
    console.log("Updated currentGroupId:", this.currentGroupId); // Check if currentGroupId is set correctly

    // Fetch group details and set messages for the selected group
    this.groupDetails = await fetchGroupDetails(this.currentGroupId);
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
},

  async created() {
    const response = await fetchListGroups(this.currentUserId);
    if (response) {
      this.listGroup = response.list_gr;
    } else {
      console.error("Failed to fetch list of groups:", response.error);
    }
  },
};
</script>
