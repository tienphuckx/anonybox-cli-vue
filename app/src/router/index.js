import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import CreateRoomView from '../views/CreateRoomView.vue';
import JoinRoomView from '@/views/JoinRoomView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/create-room',
    name: 'CreateRoom',
    component: CreateRoomView
  },
  {
    path: '/join-room',
    name: 'JoinRoom',
    component: JoinRoomView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
