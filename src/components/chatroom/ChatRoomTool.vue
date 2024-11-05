<!-- src/components/ChatRoomTool.vue -->
<template>
    <div class="chatroom-tool flex justify-end space-x-4 p-4 bg-gray-100 border-b border-gray-300">
      <button @click="createNewRoom" class="icon-button">
        <!-- Icon for Create New Room -->
        <i class="fas fa-plus-circle text-gray-500 text-2xl"></i>
      </button>
      <button @click="joinNewRoom" class="icon-button">
        <!-- Icon for Join Room -->
        <i class="fas fa-sign-in-alt text-green-700 text-2xl"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatRoomTool",
    methods: {
      createNewRoom() {
        this.$router.push("/create-room");
      },
      joinNewRoom() {
        this.$router.push("/join-room");
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
  