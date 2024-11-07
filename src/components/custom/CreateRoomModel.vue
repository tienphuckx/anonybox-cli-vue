<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content create-room-modal">
        <h2 class="text-xl font-semibold text-purple-700 mb-6 text-center">Create New Room</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- User Name Field -->
          <div>
            <label class="block text-purple-700 font-semibold mb-1">User Name</label>
            <input
              type="text"
              v-model="username"
              class="input-field"
              placeholder="Enter your name"
            />
            <p v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</p>
          </div>
  
          <!-- Group Name Field -->
          <div>
            <label class="block text-purple-700 font-semibold mb-1">Group Name</label>
            <input
              type="text"
              v-model="groupName"
              class="input-field"
              placeholder="Enter group name"
            />
            <p v-if="groupNameError" class="text-red-500 text-sm mt-1">{{ groupNameError }}</p>
          </div>
  
          <!-- Duration Field -->
          <div>
            <label class="block text-purple-700 font-semibold mb-1">Duration</label>
            <select v-model="duration" class="select-field">
              <option :value="30">30 minutes</option>
              <option :value="60">1 hour</option>
              <option :value="120">2 hours</option>
              <option :value="180">3 hours</option>
            </select>
          </div>
  
          <!-- Maximum Members Field -->
          <div>
            <label class="block text-purple-700 font-semibold mb-1">Maximum Members</label>
            <select v-model="maximumMembers" class="select-field">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
  
          <!-- Approval Checkbox -->
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="approvalRequire"
              class="checkbox-field"
            />
            <label class="ml-2 text-purple-700 font-semibold">
              New members need approval to join
            </label>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4">
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-confirm">Create</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { createRoomService } from "@/services/createRoomService";
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true,
      },
    },
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
      closeModal() {
        this.$emit("close");
      },
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
            // Retrieve x-user-code from localStorage
            const x_user_code = localStorage.getItem("x-user-code");
            
            const payload = {
              username: this.username,
              group_name: this.groupName,
              duration: this.duration,
              maximum_members: this.maximumMembers,
              approval_require: this.approvalRequire,
            };
  
            const response = await createRoomService(payload, x_user_code);
            const { user_code, user_id } = response.data.gr;
  
            // Save user info to localStorage
            localStorage.setItem("x-user-id", user_id);
            localStorage.setItem("x-user-code", user_code);
  
            this.$emit("success", "Room created successfully.");
            this.closeModal();
          } catch (error) {
            this.usernameError = error.response?.data?.message || "An error occurred.";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    width: 100%;
    max-width: 450px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: border-color 0.3s;
  }
  
  .input-field:focus {
    border-color: #9b59b6;
    outline: none;
  }
  
  .select-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f3e9ff;
    color: #6b46c1;
    transition: border-color 0.3s;
  }
  
  .select-field:focus {
    border-color: #6b46c1;
    outline: none;
  }
  
  .checkbox-field {
    height: 18px;
    width: 18px;
    border: 1px solid #ddd;
    border-radius: 3px;
    accent-color: #9b59b6;
  }
  
  .btn-cancel {
    padding: 10px 20px;
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-cancel:hover {
    background-color: #e5e7eb;
  }
  
  .btn-confirm {
    padding: 10px 20px;
    background-color: #6b46c1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-confirm:hover {
    background-color: #553c9a;
  }
  </style>
  