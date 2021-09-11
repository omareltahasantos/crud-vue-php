<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <!--Hacer una lista en vez de tabs-->
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="(link,index) in links"
          :key="index"
          :to="link.to"
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
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
  export default {
    data: () => ({
      links: [
         { name:  'Listar', to: '/listar'  },
        { name:  'Create', to: '/create'  },

        
     ],
      
    }),
  }
</script>