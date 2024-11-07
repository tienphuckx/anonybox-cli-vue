<template>
  <div class="contact-list">
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

    <!-- Display groups if data is found -->
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
</template>

  
  <script>
  export default {
    name: "ChatSidebar",
    props: {
      listGroup: Array,
    },
    data() {
    return {
      selectedGroupId: null, // Track the currently selected group
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
                    second: "2-digit"
                });
            } catch (error) {
                console.error("Error formatting Vietnam time:", error);
                return "Invalid time";
            }
    },
      formatTime(time) {
        if (time === "1970-01-01 00:00:00") {
          return "No time";
        }
        // Customize date formatting if needed, or use a library like date-fns or moment.js
        const date = new Date(time);
        const options = { weekday: 'short' }; // e.g., "Wed"
        return date.toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e7eb; /* Light border between contacts */
  }
  .contact-item.bg-blue-100 {
    background-color: #ebf8ff; /* Blue background for selected */
  }
  
  .contact-item.text-blue-700 {
    color: #2b6cb0; /* Blue text for selected */
  }
  .avatar img {
    border-radius: 50%;
  }
  .contact-item:hover .text-gray-800 {
    color: #4f46e5;
  }
  
  .truncate-content {
    display: inline-block; /* Ensure it acts like a block for proper overflow behavior */
    max-width: 80%; /* Restrict width to the parent container */
    white-space: nowrap; /* Prevent wrapping to the next line */
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Add ellipsis for overflowing text */
  }
  
  /* No data card styles */
  .no-data-card {
    margin: 7px 7px;
    max-width: 400px;
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
  
