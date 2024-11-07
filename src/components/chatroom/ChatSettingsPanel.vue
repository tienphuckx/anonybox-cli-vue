<template>
    <div class="settings-panel bg-white h-full shadow-lg p-6 w-full">
      <h2 class="font-semibold text-xl mb-4">Group Setting</h2>
      
      <!-- Settings Content -->
      <div class="space-y-6">
        <!-- Group Member Info -->
        <div class="flex items-center space-x-4">
          <img src="@/assets/logo.png" alt="Avatar" class="w-12 h-12 rounded-full">
          <div>
            <h3 class="text-lg font-semibold">{{ groupInfo.group_name || 'Group Name' }}</h3>
            <p class="text-gray-500">{{ groupInfo.total_joined_member || 0 }} members</p>
            <p class="text-gray-500">
                Expires: {{ groupInfo.expired_at ? formatVietnamTime(groupInfo.expired_at) : "No expiry date" }}
            </p>
            <p class="text-red-500">
                ({{ getTimeLeft(groupInfo.expired_at) }})
            </p>
          </div>
          
        </div>

        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-2">
            <div class="h-full bg-blue-500 transition-all duration-300"
                :style="{ width: getProgress(groupInfo.expired_at, groupInfo.created_at) + '%' }"
            >
            </div>
        </div>
  
        <div v-if="groupInfo.list_joined_member.length" class="border-t pt-4 space-y-2">
        <h4 class="text-lg font-semibold">Joined Members</h4>
        <ul class="list-disc pl-6 space-y-2">
          <li
            v-for="member in visibleMembers"
            :key="member.user_id"
            class="grid grid-cols-2 items-center gap-4"
          >
            <!-- Member Name in First Column -->
            <span>
              <span v-if="member.user_id === groupInfo.owner_id" class="text-green-600">You</span>
              <span v-else class="text-gray-600">{{ member.username }}</span>
            </span>

            <!-- Actions in Second Column (Only visible if the user is the group owner and not 'You') -->
            <span
              v-if="isGroupOwner && member.user_id !== groupInfo.owner_id"
              class="flex space-x-4 justify-end"
            >
              <button
                @click="confirmRemoveMember(member.user_id, member.username)"
                class="text-red-500"
                title="Remove Member"
              >
                <i class="fas fa-user-slash"></i>
              </button>
              <button
                @click="muteMember(member.user_id)"
                class="text-yellow-500"
                title="Mute Member"
              >
                <i class="fas fa-volume-mute"></i>
              </button>
            </span>
          </li>
        </ul>

        
        <div class="flex justify-end">
            <button
            v-if="!showAllMembers && groupInfo.list_joined_member.length > 5"
            @click="showAllMembers = true"
            class="text-blue-500 mt-2"
            >
            See All Members
            </button>
        </div>
        </div>

  
        <!-- Waiting Members List -->
        <div v-if="groupInfo.total_waiting_member > 0" class="border-t pt-4 space-y-2">
          <h4 class="text-lg font-semibold">Waiting Members</h4>
          <ul class="list-disc pl-6">
            <li v-for="member in groupInfo.list_waiting_member" :key="member.user_id">
              {{ member.username }}
            </li>
          </ul>
        </div>
  
        <!-- Media, Files, and Links -->
        <div class="border-t pt-4 space-y-2">
          <h4 class="text-lg font-semibold">Media</h4>
          <div class="flex space-x-2">
            <!-- Images thumbnails here (can use a loop with placeholders) -->
            <img src="@/assets/logo.png" class="w-16 h-16 object-cover rounded-md" v-for="n in 4" :key="n">
          </div>
          <button class="text-blue-500">See more</button>
        </div>
  
        <div>
          <h4 class="text-lg font-semibold">File</h4>
          <p class="text-gray-500">No files shared yet</p>
        </div>
        <div>
          <h4 class="text-lg font-semibold">Link</h4>
          <p class="text-gray-500">No links shared yet</p>
        </div>
      </div>

      <div class="flex justify-between space-x-4 mt-4">
        <!-- Delete Group Button (only for the owner) -->
        <button
          v-if="isGroupOwner"
          @click="deleteGroup"
          class="text-red-500 flex items-center space-x-2 px-4 py-2 border border-red-500 rounded hover:bg-red-100"
          title="Delete Group"
        >
          <i class="fas fa-trash"></i>
          <span>Delete Group</span>
        </button>

        <!-- Leave Group Button (only for members) -->
        <button
          v-else
          @click="leaveGroup"
          class="text-red-500 flex items-center space-x-2 px-4 py-2 border border-red-500 rounded hover:bg-red-100"
          title="Leave Group"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Leave Group</span>
        </button>
      </div>

      <CustomModal
        v-if="showModal"
        :title="modalTitle"
        :message="modalMessage"
        :type="modalType"
        @close="showModal = false"
        @confirm="confirmRemove"
        />
    </div>
  </template>
  
  <script>
  import { removeUserFromGroup ,delete_group, leave_group} from "@/services/chatRoomService";
  import CustomModal from "@/components/custom/CustomModal.vue";
  export default {
    name: "ChatSettingsPanel",
    components: { CustomModal },
    props: {
      groupId: {
        type: Number,
        required: true
      },
      userId: {
        type: Number,
        required: true
      }
    },
    computed: {
        visibleMembers() {
        // Show only the first 5 members if showAllMembers is false
        return this.showAllMembers
            ? this.groupInfo.list_joined_member
            : this.groupInfo.list_joined_member.slice(0, 5);
        }, 
        isGroupOwner() {
            const userId = localStorage.getItem("x-user-id");
            return parseInt(userId, 10) === this.groupInfo.owner_id;
        }
    },
    data() {
      return {
        showModal: false,
        showAllMembers: false,
        groupInfo: {
          group_name: '',
          total_joined_member: 0,
          expired_at: '',
          list_joined_member: [],
          list_waiting_member: []
        }
      };
    },
    async created() {
      await this.fetchGroupDetails();
    },
    methods: {
        getProgress(utcTime, createdAt) {
            if (!utcTime || !createdAt) return 0;

            const now = new Date(); // Current time
            const target = new Date(utcTime); // Expiration time
            const start = new Date(createdAt); // Start time

            target.setHours(target.getHours() + 7); // Adjust for Vietnam timezone
            start.setHours(start.getHours() + 7);

            const totalDuration = target - start; // Total time span in ms
            const elapsedDuration = now - start; // Elapsed time in ms

            if (totalDuration <= 0) return 100; // Avoid division by zero

            const progress = (elapsedDuration / totalDuration) * 100; // Progress in percentage
            return Math.min(Math.max(progress, 0), 100); // Clamp between 0% and 100%
        },
        formatVietnamTime(utcTime) {
            try {
                if (!utcTime) return "Invalid time";

                const date = new Date(utcTime); // Convert UTC string to Date object
                if (isNaN(date.getTime())) return "Invalid time";

                date.setHours(date.getHours() + 7); // Add 7 hours for Vietnam timezone

                return date.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });
            } catch (error) {
                console.error("Error formatting Vietnam time:", error);
                return "Invalid time";
            }
        },
        getTimeLeft(utcTime) {
            if (!utcTime) return "No time left";

            const now = new Date(); // Current time
            const target = new Date(utcTime); // Convert UTC string to Date object
            target.setHours(target.getHours() + 7); // Adjust for Vietnam timezone

            const differenceMs = target - now; // Time difference in milliseconds
            if (differenceMs <= 0) return "Expired";

            const hours = Math.floor(differenceMs / (1000 * 60 * 60)); // Hours left
            const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes left

            return `${hours} hours and ${minutes} minutes left`;
        },
        async confirmRemove() {
            console.log("Confirm button clicked, proceeding with removal"); // Debug log
            await this.removeMember(this.userIdToRemove);
        }
        ,
        async confirmRemoveMember(userId, userName) {
            this.userIdToRemove = userId;
            this.modalTitle = "Confirm Removal";
            this.modalMessage = `Are you sure you want to remove ${userName} from the group?`;
            this.modalType = "confirm";
            this.showModal = true;
        },
        async removeMember(userId) {
            try {
                const payload = {
                    gr_id: this.groupId,
                    gr_owner_id: parseInt(localStorage.getItem("x-user-id"), 10),
                    rm_user_id: userId
                };
                const response = await removeUserFromGroup(payload);

                // Check response code and display the appropriate message
                if (response.code === 200) {
                    this.modalTitle = "Success";
                    this.modalMessage = response.message || "User removed successfully.";
                    this.modalType = "success";
                    this.showModal = true;
                    await this.fetchGroupDetails(); // Refresh member list
                }
            } catch (error) {
                this.modalTitle = "Error";
                this.modalMessage = `Failed to remove user: ${error.message}`;
                this.modalType = "error";
                this.showModal = true;
            }
        },
        muteMember(userId) {
            console.log(`Muting member with ID: ${userId}`);
        },
        async fetchGroupDetails() {
        try {
            // const userId = localStorage.getItem("x-user-id");
            const url = `http://localhost:8080/group-detail/setting/${this.groupId}`;

            console.log(url);
          const response = await fetch(url);
          const data = await response.json();
  
          if (data.code === 0) {
            this.groupInfo = data.data;
          } else {
            console.error("Failed to fetch group details:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching group details:", error);
        }
      },
      async deleteGroup() {
        try {
          const confirmation = confirm("Are you sure you want to delete this group?");
          if (!confirmation) return;

          const payload = {
            gr_id: this.groupId,
            u_id: this.groupInfo.owner_id, // Make sure `userId` is correctly defined
          };

          const response = await delete_group(payload);

          // Check response code
          if (response.code !== 0) {
            alert(`Failed to delete group: ${response.message}`);
            return;
          }

          // Display success message and redirect
          alert(response.message || "Group deleted successfully!");
          this.$router.push("/groups");
        } catch (error) {
          console.error("Error deleting group:", error.message);
          alert(`Error: ${error.message}`);
        }
      },

      async leaveGroup() {
        try {
          // Show confirmation prompt
          const confirmation = confirm("Are you sure you want to leave this group?");
          if (!confirmation) return;

          // Prepare payload
          const payload = {
            gr_id: this.groupId,
            u_id: parseInt(localStorage.getItem("x-user-id"), 10),
          };

          // Call the `leave_group` service
          const response = await leave_group(payload);

          // Check response code
          if (response.code !== 200) {
            alert(`Failed to leave the group: ${response.message}`);
            return;
          }

          // Display success message
          alert(response.message || "You have successfully left the group.");

          // Redirect to /chat-room
          this.$router.push("/chat-room");
        } catch (error) {
          // Log and display error message
          console.error("Error leaving group:", error.message);
          alert(`Error: ${error.message}`);
        }
      },
    }}

  </script>
  
  <style scoped>
  .settings-panel {
    transition: transform 0.3s ease;
  }
  </style>
  