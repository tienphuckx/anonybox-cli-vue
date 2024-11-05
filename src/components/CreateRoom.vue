<template>
  <div class="flex justify-center items-center h-full bg-gradient-to-r from-purple-500 to-blue-500">
    <div class="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-3xl font-bold text-purple-700 text-center">Create New Room</h1>
      <form @submit.prevent="handleSubmit" class="mt-6">
        <!-- User Name Field -->
        <div class="mb-4">
          <label class="block text-purple-700 font-semibold">User Name</label>
          <input
            type="text"
            v-model="username"
            class="mt-1 p-2 w-full rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
          />
          <p v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</p>
        </div>

        <!-- Group Name Field -->
        <div class="mb-4">
          <label class="block text-purple-700 font-semibold">Group Name</label>
          <input
            type="text"
            v-model="groupName"
            class="mt-1 p-2 w-full rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
          />
          <p v-if="groupNameError" class="text-red-500 text-sm mt-1">{{ groupNameError }}</p>
        </div>

        <!-- Duration Field -->
        <div class="mb-4">
          <label class="block text-purple-700 font-semibold">Duration</label>
          <select v-model="duration" class="mt-1 p-2 w-full rounded bg-purple-100 text-purple-700 border border-purple-500 focus:outline-none focus:border-purple-700">
            <option :value="30">30 minutes</option>
            <option :value="60">1 hour</option>
            <option :value="120">2 hours</option>
            <option :value="180">3 hours</option>
          </select>
        </div>

        <!-- Maximum Members Field -->
        <div class="mb-4">
          <label class="block text-purple-700 font-semibold">Maximum Members</label>
          <select v-model="maximumMembers" class="mt-1 p-2 w-full rounded bg-purple-100 text-purple-700 border border-purple-500 focus:outline-none focus:border-purple-700">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>

        <!-- Approval Checkbox -->
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="approvalRequire" class="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500" />
          <label class="ml-2 text-purple-700 font-semibold">A new member needs to be approved to join</label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 mt-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { createRoomService } from "@/services/createRoomService";

export default {
  name: "CreateRoom",
  data() {
    return {
      username: "",
      groupName: "",
      duration: 60, // Default duration
      maximumMembers: 10, // Default maximum members
      approvalRequire: false, // Default approval requirement
      usernameError: "",
      groupNameError: "",
    };
  },
  methods: {
    async handleSubmit() {
      // Reset errors
      this.usernameError = "";
      this.groupNameError = "";

      // Basic validation
      if (!this.username) {
        this.usernameError = "User Name is required.";
      }
      if (!this.groupName) {
        this.groupNameError = "Group Name is required.";
      }

      // Proceed only if no errors
      if (!this.usernameError && !this.groupNameError) {
        try {
          const payload = {
            username: this.username,
            group_name: this.groupName,
            duration: this.duration,
            maximum_members: this.maximumMembers,
            approval_require: this.approvalRequire,
          };

          const response = await createRoomService(payload);

          // Extract user and group IDs from the response
          const userId = response.data.gr.user_id;
          const groupId = response.data.gr.group_id;

          console.log(groupId);

          // Navigate to the chat room with the user and group IDs
          this.$router.push({
            path: "/chat-room",
            query: { user_id: userId, group_id: groupId },
          });

        } catch (error) {
          if (error.message.includes("Username")) {
            this.usernameError = error.message;
          }
        }
      }
    },
  },
};
</script>
