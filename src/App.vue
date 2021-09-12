<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
    
        <v-tabs
       
          background-color="blue-grey darken-3 accent-4"
          centered
          dark
          icons-and-text
        >
      <v-tabs-slider></v-tabs-slider>

      <v-tab 
           href="#tab-1" 
           v-for="(link,index) in links" 
           :key="index"
           :to="link.to" >
        {{link.name}}
        <v-icon >{{link.icon}}</v-icon>
      </v-tab>
      
     
        </v-tabs>
      <!--Hacer una lista en vez de tabs-->
      
     

      
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row  justify="center">
          <v-col
            cols="12"
            md="8"
            sm="8"
     
           
            
            
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VueRouter from 'vue-router'

  export default {
    data: () => ({
      links: [
         { name:  'Listar', to: '/listar', icon: 'mdi-view-list'  },
        { name:  'Create', to: '/create', icon: 'mdi-playlist-plus'  },

        
     ],
     tables: [
       {name: 'Usuarios', to: '/usuarios', icon: 'mdi-folder'},
       {name: 'Empleados', to: '/listar', icon: 'mdi-folder'},
      
     ],
    }),
  

    methods:{
   
    }
  }
</script>