<template>
    <div class="chatroom-container h-full flex bg-gray-200">
      <!-- Sidebar for Chats -->
      <aside class="sidebar w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
        <ChatSidebar :listGroup="listGroup" @selectContact="selectContact" />
      </aside>
  
       <!-- Main Chat Area -->
        <main class="chat-area w-3/4 flex flex-col">
        <!-- Pass group details to ChatHeader -->
        <ChatHeader v-if="groupDetails" :groupDetails="groupDetails" />

        <!-- Messages List -->
        <div v-if="groupDetails" class="messages flex-grow overflow-y-auto p-4">
          <!-- Pass currentUserId to ChatMessages component -->
          <ChatMessages :groupDetails="groupDetails" :messages="messages" :currentUserId="currentUserId" />
        </div>

        <!-- Message Input Area -->
            <ChatInput v-if="groupDetails" @sendMessage="sendMessage" />
        </main>

    </div>
  </template>
  
  <script>
  import ChatSidebar from "@/components/ChatSidebar.vue";
  import ChatHeader from "@/components/ChatHeader.vue";
  import ChatMessages from "@/components/ChatMessages.vue";
  import ChatInput from "@/components/ChatInput.vue";
  import { fetchGroupDetails, fetchListGroups, sendMessageToServer } from "@/services/chatRoomService";
  
  export default {
    name: "ChatRoom",
    components: {
      ChatSidebar,
      ChatHeader,
      ChatMessages,
      ChatInput,
    },
    data() {
      return {
        listGroup: [], // List of groups fetched from the API
        selectedGroupId: null, // Currently selected group ID
        groupDetails: null, // Details of the selected group
        messages: [], // Messages in the selected group
        currentUserId: this.$route.query.user_id, // Get user_id from query parameters
      };
    },
    methods: {
      async selectContact(contact) {
        this.selectedGroupId = contact.group_id;
        this.groupDetails = await fetchGroupDetails(this.selectedGroupId);
        this.messages = [];
      },
      async sendMessage(content) {
        if (content.trim()) {
          const newMessage = {
            content,
            sender: "me",
            timestamp: new Date(),
          };
          this.messages.push(newMessage);
  
          // Optionally send the message to the server
          await sendMessageToServer(this.selectedContact.group_id, content);
        }
      },
    },
    async created() {
      const userId = this.$route.query.user_id;
      if (!userId) {
        console.error("User ID is missing in the query parameters.");
        return;
      }

      this.currentUserId = Number(userId); // Ensure currentUserId is a number

      const response = await fetchListGroups(this.currentUserId);
      if (response) {
        this.listGroup = response.list_gr;
      } else {
        console.error("Failed to fetch list of groups:", response.error);
      }
    },
  };
  </script>

  