import {createRouter, createWebHistory} from 'vue-router'

// Import Each of your views from a view folder
import About from '../views/About'
import Home from '../views/Home'

// List your routes here as an object literal
const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router