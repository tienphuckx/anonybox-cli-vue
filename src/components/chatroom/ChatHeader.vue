<template>
  <header class="chat-header bg-gray-100 border-b p-4 flex items-center">
    <!-- Group Avatar -->
    <div class="avatar w-10 h-10 bg-gray-300 rounded-full mr-4 overflow-hidden">
      <img src="@/assets/logo.png" alt="Group Avatar" class="w-full h-full object-cover" />
    </div>

    <div class="flex-grow space-y-2">
    <!-- Group Name -->
    <h2 class="font-semibold text-gray-800 text-lg">{{ groupDetails.group_name || 'Group Name' }}</h2>
    
    <!-- Members Count -->
      <div class="flex items-center space-x-2 text-sm">
        <p class="text-gray-500">
          <span class="text-green-600 font-medium">{{ groupDetails.joined_member }}</span>
          <span class="text-gray-500">/</span>
          <span class="text-gray-500">{{ groupDetails.max_member || '∞' }}</span>
          <span class="text-gray-500"> members</span>
        </p>
        <span v-if="groupDetails.max_member" class="px-2 py-0.5 text-xs text-white bg-blue-500 rounded-full">
          {{ groupDetails.max_member - groupDetails.joined_member }} slots left
        </span>
      </div>

      <!-- Waiting for Approval -->
      <div v-if="groupDetails.waiting_member > 0" class="flex items-center space-x-2 text-sm">
        <p class="text-gray-500">
          <span class="text-yellow-600 font-medium">{{ 5 }}</span>
          <span class="text-gray-500">{{ groupDetails.waiting_member }} member(s) waiting for approval</span>
        </p>
        <i class="fas fa-clock text-yellow-500"></i>
      </div>
    </div>


    <!-- Header Icons -->
    <div class="flex space-x-3 text-gray-500">
      <!-- <button>
        <i class="fas fa-search"></i>
      </button>
      <button>
        <i class="fas fa-comments"></i>
      </button> -->
      <div class="flex space-x-3 text-gray-500">
        <button :class="{ 'text-blue-500': isSettingsOpen }" @click="$emit('toggleSettings')">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ChatHeader",
  props: {
    groupDetails: {
      type: Object,
      required: true
    },
    isSettingsOpen: Boolean
  }
};
</script>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar img {
  border-radius: 50%;
}
</style>
