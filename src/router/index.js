import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Preguntas from '../views/Preguntas.vue';

const routes = [
  { path: '/Ordenar-palabras/', 
    name: 'Home', 
    component: Home 
  },
  { path: '/preguntas/', 
    name: 'Preguntas', 
    component: Preguntas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
