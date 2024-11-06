<template>
  <div class="flex justify-center items-center h-full bg-gradient-to-r from-purple-500 to-blue-500">
    <div class="bg-white p-12 -lg shadow-lg w-full max-w-2xl flex flex-col md:flex-row items-center">
      <!-- Image Section -->
      <!-- <div class="mb-8 md:mb-0 md:mr-8">
        <img src="@/assets/join-gr.png" alt="Join Room" class="w-56 h-56 object-contain" />
      </div> -->

      <!-- Form Section -->
      <div class="flex-grow w-full">
        <h1 class="text-4xl font-bold text-purple-700 text-center md:text-left mb-6">Join Room</h1>
        <form @submit.prevent="handleSubmit">
          <!-- Username Field -->
          <div class="mb-4">
            <label class="block text-purple-700 font-semibold">User Name</label>
            <input
              type="text"
              v-model="username"
              class="mt-1 p-3 w-full bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <!-- Group ID Field -->
          <div class="mb-4">
            <label class="block text-purple-700 font-semibold">Group Code</label>
            <input
              type="text"
              v-model="groupCode"
              class="mt-1 p-3 w-full  bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <p v-if="errors.groupCode" class="text-red-500 text-sm mt-1">{{ errors.groupCode }}</p>
          </div>

          <!-- Message Field -->
          <div class="mb-4">
            <label class="block text-purple-700 font-semibold">Message</label>
            <textarea
              v-model="message"
              class="mt-1 p-3 w-full  bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500"
              rows="3"
              placeholder="Enter your message here..."
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-4 mt-4 bg-purple-500 text-white -lg font-semibold hover:bg-purple-600 transition duration-200 text-lg"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { joinRoomService } from "@/services/joinRoomService";

export default {
  name: "JoinRoom",
  data() {
    return {
      username: "",
      groupCode: "",
      message: "",
      errors: {
        username: "",
        groupCode: "",
        message: "",
      },
    };
  },
  methods: {
    validateForm() {
      // Reset errors
      this.errors.username = "";
      this.errors.groupCode = "";
      this.errors.message = "";

      let isValid = true;

      // Validate each field
      if (!this.username) {
        this.errors.username = "User Name is required.";
        isValid = false;
      }
      if (!this.groupCode) {
        this.errors.groupCode = "Group ID is required.";
        isValid = false;
      }
      if (!this.message) {
        this.errors.message = "Message is required.";
        isValid = false;
      }

      return isValid;
    },
    async handleSubmit() {
      // Validate form before submitting
      if (!this.validateForm()) {
        return;
      }

      // Prepare the payload
      const payload = {
        group_code: this.groupCode,
        message: this.message,
        username: this.username,
      };

      try {
      // Call the join room service
      const response = await joinRoomService(payload, this.$router);
      console.log("Join room request successful:", response);
      // Redirect to the WaitingJoinRoom page on success
      // this.$router.push({ name: "WaitingJoinRoom" });
    } catch (error) {
      console.error("Failed to join room:", error);
      alert("Failed to send join request. Please try again.");
    }
    },
  },
};
</script>

<style>
/* Optional custom styles */
</style>
