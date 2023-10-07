import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'AllNotes',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/add',
      name: 'AddNote',
      component: () => import('@/views/AddNotePage.vue'),
    }, 
    // {
    //   path: '/edit',
    //   name: 'EditNote',
    //   component: Home
    // }, 
    {
      path: '/view/:id',
      name: 'ViewNote',
      component: () => import('@/views/ViewNotePage.vue'),
    }
  ],
})