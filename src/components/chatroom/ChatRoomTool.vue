<template>
  <div class="chatroom-tool flex justify-end space-x-4 p-2 bg-green-600 border-b border-gray-300">

    <button
          @click="toggleCreateRoomModal"
          class="btn-gradient text-sm px-4 py-2 rounded-lg"
        >
          Create Group
        </button>
        <button
          @click="toggleJoinGroupModal"
          class="btn-outline text-sm px-4 py-2 rounded-lg"
        >
          Join Group
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
      this.$emit("refreshGroups");
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
.btn-gradient {
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
    color: white;
    border: none;
    transition: background 0.3s;
  }
  
  .btn-gradient:hover {
    background: linear-gradient(135deg, #8e44ad, #9b59b6);
  }
  
  .btn-outline {
    background: white;
    color: #8e44ad;
    border: 1px solid #8e44ad;
    transition: all 0.3s;
  }
  
  .btn-outline:hover {
    background: #8e44ad;
    color: white;
  }
</style>
