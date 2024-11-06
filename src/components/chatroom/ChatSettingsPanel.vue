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
            <p class="text-gray-500">Expires: {{ groupInfo.expired_at }}</p>
          </div>
        </div>
  
        <!-- Joined Members List -->
        <div v-if="groupInfo.list_joined_member.length" class="border-t pt-4 space-y-2">
          <h4 class="text-lg font-semibold">Members</h4>
          <ul class="list-disc pl-6">
            <li v-for="member in groupInfo.list_joined_member" :key="member.user_id">
              {{ member.username }}
            </li>
          </ul>
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
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatSettingsPanel",
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
    data() {
      return {
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
      async fetchGroupDetails() {
        try {
            // const url = `http://localhost:8080/group-detail/setting/${this.groupId}/${this.userId}`;
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
      }
    }
  };
  </script>
  
  <style scoped>
  .settings-panel {
    transition: transform 0.3s ease;
  }
  </style>
  