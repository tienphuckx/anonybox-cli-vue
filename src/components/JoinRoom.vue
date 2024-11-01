<template>
  <div class="flex justify-center items-center h-full">
    <div class="bg-purple-100 p-8 rounded-lg">
      <h1 class="text-3xl font-bold text-purple-700">Join Room</h1>
      <form class="mt-4">
        <div class="mb-4">
          <label class="block text-purple-700">User Name</label>
          <input type="text" class="mt-1 p-2 w-full rounded bg-gray-100" />
        </div>
        <div class="mb-4">
          <label class="block text-purple-700">Room Code</label>
          <input type="text" class="mt-1 p-2 w-full rounded bg-gray-100" />
        </div>
        <button type="submit" class="px-4 py-2 bg-purple-500 text-white rounded">Join</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinRoom',
};
</script>
