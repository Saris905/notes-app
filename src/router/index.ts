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
    {
      path: '/edit/:id',
      name: 'EditNote',
      component: () => import('@/views/EditNotePage.vue'),
    }, 
    {
      path: '/view/:id',
      name: 'ViewNote',
      component: () => import('@/views/ViewNotePage.vue'),
    }
  ],
})