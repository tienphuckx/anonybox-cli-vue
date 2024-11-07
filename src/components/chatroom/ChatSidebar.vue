<template>
  <div class="contact-list">
    <!-- Tabs -->
    <div class="tabs flex justify-around border-b border-gray-200">
      <button
        :class="[
          'tab-item py-2 px-4 text-sm font-medium',
          activeTab === 'joined' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
        ]"
        @click="activeTab = 'joined'"
      >
        Joined Groups ({{ listGroup.length }})
      </button>
      <button
        :class="[
          'tab-item py-2 px-4 text-sm font-medium',
          activeTab === 'waiting' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
        ]"
        @click="activeTab = 'waiting'"
      >
        Waiting Groups ({{ listWaitingGroup.length }})
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'joined'">
      <!-- Check if listGroup has data -->
      <div v-if="listGroup.length === 0" class="no-data-card p-6 rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center">
        <h2 class="text-lg font-semibold">You haven’t joined any group yet</h2>
        <p class="text-sm mt-2">Start by creating or joining a group now!</p>
        <div class="mt-4 space-x-4">
          <button
            @click="$emit('createGroup')"
            class="btn-gradient text-sm px-4 py-2 rounded-lg"
          >
            Create Group
          </button>
          <button
            @click="$emit('joinGroup')"
            class="btn-outline text-sm px-4 py-2 rounded-lg"
          >
            Join Group
          </button>
        </div>
      </div>

      <!-- Display joined groups -->
      <div
        v-for="group in listGroup"
        :key="group.group_id"
        :class="[
          'contact-item p-2 cursor-pointer flex items-center',
          group.group_id === selectedGroupId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        ]"
        @click="selectGroup(group)"
      >
        <!-- Avatar -->
        <div class="avatar w-10 h-10 bg-gray-300 rounded-full mr-4 overflow-hidden">
          <img src="@/assets/logo.png" alt="Avatar" class="w-full h-full object-cover" />
        </div>

        <!-- Group Info and Latest Message -->
        <div class="flex-grow mt-0">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-800 text-sm">{{ group.group_name }}</h2>
            <span class="text-gray-400 ml-2">
              <i class="fas fa-thumbtack"></i>
            </span>
          </div>

          <p class="text-sm text-gray-500 flex items-center">
            <span v-if="group.latest_ms_username" class="pr-2 text-green-700">{{ group.latest_ms_username }}:</span>
            <span class="text-sm truncate-content">
              {{ getSafeContent(group.latest_ms_content || "No messages yet") }}
            </span>
          </p>

          <div class="text-left">
            <span class="text-xs text-gray-400">{{ formatVietnamTime(group.latest_ms_time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Waiting Groups -->
    <div v-if="activeTab === 'waiting'">
      <!-- Display list of waiting groups -->
      <div v-if="listWaitingGroup.length === 0" class="no-data-card p-6 rounded-lg shadow-md bg-gradient-to-r from-gray-400 to-gray-600 text-white text-center">
        <h2 class="text-lg font-semibold">No groups in waiting list</h2>
        <p class="text-sm mt-2">You don't have any groups pending approval.</p>
      </div>

      <div
        v-for="group in listWaitingGroup"
        :key="group.group_id"
        class="contact-item p-4 cursor-pointer flex items-center"
      >
        <!-- Avatar -->
        <div class="avatar w-10 h-10 bg-gray-300 rounded-full mr-4 overflow-hidden">
          <img src="@/assets/logo.png" alt="Avatar" class="w-full h-full object-cover" />
        </div>

        <!-- Group Info -->
        <div class="flex-grow mt-0">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-800 text-sm">{{ group.group_name }}</h2>
          </div>
          <p class="text-sm text-gray-500">
            Waiting for approval...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatSidebar",
  props: {
    listGroup: Array,
    listWaitingGroup: Array,
  },
  data() {
    return {
      selectedGroupId: null, // Track the currently selected group
      activeTab: "joined", // Default tab is "joined"
    };
  },
  methods: {
    getSafeContent(content) {
      const maxChars = 25;
      if (!content) return "";
      return content.length > maxChars ? content.slice(0, maxChars) + "..." : content;
    },
    selectGroup(group) {
      this.selectedGroupId = group.group_id; // Update the selected group ID
      this.$emit("selectContact", group); // Emit the selection event
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
          second: "2-digit",
        });
      } catch (error) {
        console.error("Error formatting Vietnam time:", error);
        return "Invalid time";
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  margin-bottom: 1rem;
}

.tab-item {
  cursor: pointer;
}

.tab-item:hover {
  color: #2b6cb0;
}

.contact-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb; /* Light border between contacts */
}
</style>
