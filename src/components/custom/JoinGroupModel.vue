<template>
    <div class="modal-overlay" v-if="visible">
      <div class="modal-content join-group-modal">
        <h1 class="text-2xl font-bold text-purple-700 text-center mb-6">Join Room</h1>
        <form @submit.prevent="handleSubmit">
          <!-- Username Field -->
          <div class="mb-4" v-if="!isUserExists">
            <label class="block text-purple-700 font-semibold">User Name</label>
            <input
                type="text"
                v-model="username"
                class="input-field"
                placeholder="Enter your name"
            />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
            </div>
  
          <!-- Group Code Field -->
          <div class="mb-4">
            <label class="block text-purple-700 font-semibold">Group Code</label>
            <input
              type="text"
              v-model="groupCode"
              class="input-field"
              placeholder="Enter group code"
            />
            <p v-if="errors.groupCode" class="text-red-500 text-sm mt-1">{{ errors.groupCode }}</p>
          </div>
  
          <!-- Message Field -->
          <div class="mb-4">
            <label class="block text-purple-700 font-semibold">Message</label>
            <textarea
              v-model="message"
              class="textarea-field"
              rows="3"
              placeholder="Enter your message here..."
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4">
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-confirm">Join</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { joinRoomService } from "@/services/joinRoomService";
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isUserExists: true,
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
      closeModal() {
        this.$emit("close");
      },
      validateForm() {
        this.errors.username = "";
        this.errors.groupCode = "";
        this.errors.message = "";
  
        let isValid = true;
  
        if (!this.username) {
          this.errors.username = "User Name is required.";
          isValid = false;
        }
        if (!this.groupCode) {
          this.errors.groupCode = "Group Code is required.";
          isValid = false;
        }
        if (!this.message) {
          this.errors.message = "Message is required.";
          isValid = false;
        }
  
        return isValid;
      },
      async created() {
        const userId = localStorage.getItem("x-user-id");

        // If x-user-id exists, hide the username field and set a default value
        if (userId && !isNaN(parseInt(userId, 10))) {
            this.isUserExists = true; // User exists
            this.username = "xxx";   // Default username value
        } else {
            this.isUserExists = false; // User does not exist
        }
        },
      async handleSubmit() {
        if (!this.validateForm()) {
          return;
        }
  
        const payload = {
          group_code: this.groupCode,
          message: this.message,
          username: this.username,
        };
        const x_user_code = localStorage.getItem("x-user-code");
        try {
            const response = await joinRoomService(payload, this.$router, x_user_code);            
            console.log(response);
            this.$emit("success", "Join request sent successfully.");
            this.closeModal();
            this.$emit("refreshGroups");
        } catch (error) {
          console.error("Error joining room:", error.message);
          alert("Failed to join room. Please try again.");
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
  
  .textarea-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: border-color 0.3s;
  }
  
  .textarea-field:focus {
    border-color: #9b59b6;
    outline: none;
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
  