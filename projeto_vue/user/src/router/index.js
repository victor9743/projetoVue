import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Users from '../views/users.vue'
import Edit from '../views/Edit.vue'

function AdminAuth(to, from, next){

  var req ={
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  
  if(localStorage.getItem('token') != undefined){
    
    axios.post("http://localhost:8686/validate",{}, req).then(res=>{
      console.log(res);

      next();

    }).catch(err =>{

      console.log(err.response);
      next("/login");
    })
    
  }else{
    next("/login");
  }
  
}



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
     path: '/register', // nome da rota
    name: 'register',
    component: Register // variavel resgister
  
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: AdminAuth

      
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
