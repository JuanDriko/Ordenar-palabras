import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Preguntas from '../views/Preguntas.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/preguntas', name: 'Preguntas', component: Preguntas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// import { createRouter, createWebHistory } from "vue-router";
// import Home from "@/views/Home.vue";
// import Details from "@/views/Details.vue";
// import SearchResults from "@/views/SearchResults.vue";
// import Genres from "@/views/Genres.vue";


// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/MoviePlay/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/movie/:id',
//       name: 'Details',
//       component: Details,
//       props: true
//     },
//     {
//       path: '/search/:querySearch',
//       name: 'SearchResults',
//       component: SearchResults,
//       props: true
//     },
//     {
//       path: '/Genres/',
//       name: 'Genres',
//       component: Genres,
//       props: true
//     },
//   ]
// });

// export default router;