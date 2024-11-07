<template>
  <div class="chatroom-tool flex justify-end space-x-4 p-2 bg-green-600 border-b border-gray-300">
    <!-- Create New Room Button -->
    <button @click="toggleCreateRoomModal" class="icon-button">
      <i class="fas fa-plus-circle text-gray-500 text-xl"></i>
    </button>

    <!-- Join Room Button -->
    <button @click="toggleJoinGroupModal" class="icon-button">
      <i class="fas fa-sign-in-alt text-green-700 text-xl"></i>
    </button>

    <CreateRoomModel
      v-if="isCreateRoomModalVisible"
      @close="isCreateRoomModalVisible = false"
      @success="handleSuccess"
    />

    <JoinGroupModel
      v-if="isJoinGroupModalVisible"
      @close="isJoinGroupModalVisible = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
import CreateRoomModel from "@/components/custom/CreateRoomModel.vue";
import JoinGroupModel from "@/components/custom/JoinGroupModel.vue";

export default {
  name: "ChatRoomTool",
  components: {
    CreateRoomModel,
    JoinGroupModel,
  },
  data() {
    return {
      isCreateRoomModalVisible: false, 
      isJoinGroupModalVisible: false,
    };
  },
  methods: {
    toggleCreateRoomModal() {
      this.isCreateRoomModalVisible = !this.isCreateRoomModalVisible;
    },
    toggleJoinGroupModal() {
      this.isJoinGroupModalVisible = !this.isJoinGroupModalVisible;
    },
    handleSuccess(message) {
      this.isCreateRoomModalVisible = false; // Close the modal
      this.isJoinGroupModalVisible = false;
      alert(message); // Display a success message
      this.$router.push({path: "/chat-room"});
    },
  },
};
</script>

<style scoped>
.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background-color: #f3f4f6; /* light gray background */
  transition: background-color 0.3s;
}

.icon-button:hover {
  background-color: #e2e8f0; /* slightly darker gray on hover */
}
</style>
