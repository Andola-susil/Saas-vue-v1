import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import StyleGuide from '../views/StyleGuide.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import DynamicTable from '../components/table/TableComponent.vue'
import Table from '../views/Table.vue'
import Dashboard from '../views/DashboardPage.vue'
const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
  {
    path: '/styleGuide',
    name: 'StyleGuide',
    component: StyleGuide
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { hideSidebar: true }
  },
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    meta: { hideSidebar: true }
  },
  {
    path: '/DynamicTable',
    name: 'DynamicTable',
    component: DynamicTable,
  },
  {
    path: '/tablepage',
    name: 'TableView',
    component: Table,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
