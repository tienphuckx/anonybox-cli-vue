import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import CreateRoom from '../components/CreateRoom.vue';
import JoinRoom from '../components/JoinRoom.vue';
import WaitingJoinRoom from "../components/WaitingJoinRoom.vue";
import ChatRoom from "../components/ChatRoom.vue";

const routes = [
  { path: '/', component: LandingPage },
  { path: '/create-room', component: CreateRoom },
  { path: '/join-room', component: JoinRoom },
  {
    path: "/waiting-join-room",
    name: "WaitingJoinRoom",
    component: WaitingJoinRoom,
  },
  {
    path: "/chat-room",
    name: "ChatRoom",
    component: ChatRoom,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
