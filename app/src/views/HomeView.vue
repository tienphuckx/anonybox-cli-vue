<template>
  <div class="main flex flex-col justify-center items-center h-screen space-y-4">
    <h1 class="text-3xl font-bold text-blue-500 mb-6">Welcome to Anonymous chatbox</h1>
    
    <!-- Create a New Chat Room Button -->
    <button 
      class="create-btn text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-75"
      @click="goToCreateRoom">
      Create a New Chat Room
    </button>

    <!-- Join a Chat Room Button -->
    <button 
      class="join-btn text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-75"
      @click="goToJoinRoom">
      Join a Chat Room
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToCreateRoom() {
      this.$router.push({ name: 'CreateRoom' });
    },
    goToJoinRoom() {
      this.$router.push({ name: 'JoinRoom' });
    }
  }
};
</script>

<style>
.main {
  background-color: black;
  height: 100vh; 
  width: 100vw; 
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Radial gradient background */
  background: rgb(238,174,234);
  background: -moz-radial-gradient(circle, rgba(238,174,234,1) 0%, rgba(148,187,233,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(238,174,234,1) 0%, rgba(148,187,233,1) 100%);
  background: radial-gradient(circle, rgba(238,174,234,1) 0%, rgba(148,187,233,1) 100%);
}

.create-btn {
  width: 500px;
  background-color: rgba(238,174,234,1);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.create-btn:hover {
  background-color: rgb(248, 143, 241);
  transform: scale(1.01);
}

.join-btn {
  width: 500px;
  background-color: rgba(148,187,233,1);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.join-btn:hover {
  background-color: rgb(17, 122, 171);
  transform: scale(1.01);
}

</style>