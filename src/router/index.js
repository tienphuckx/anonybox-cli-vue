import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import CreateRoom from '../components/CreateRoom.vue';
import JoinRoom from '../components/JoinRoom.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/create-room', component: CreateRoom },
  { path: '/join-room', component: JoinRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
