import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//Componentes para Empleados
import Listar from '../views/Listar.vue'
import Create from '../views/Create.vue'
import Editar from '../views/Editar.vue'
import Delete from '../views/Delete.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeListar',
    component: Listar
  },
  {
    path: '/listar',
    name: 'Listar',
    component: Listar
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar,
    props: true
  },

  {
    path: '/Delete',
    name: 'Delete',
    component: Delete,
  
  },
 
]

const router = new VueRouter({
  routes
})

export default router
