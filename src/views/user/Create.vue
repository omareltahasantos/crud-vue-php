<template>
  <v-container justify="center" class="pt-10">
    <h2 class="text-center">Crear Usuario</h2>
    <v-form
    ref="form"
    @submit.prevent="agregarUsuarios()"
   >
    <v-text-field
      v-model="empleado.name"
      label="Name"
      placeholder="Introduce tu nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="empleado.email"
      label="E-mail"
      placeholder="Introduce tu e-mail"
      required
    ></v-text-field>

    
   
    <v-btn
    type="submit"
      color="success"
      class="mr-4"
    >
      Agregar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"  
    >
     <router-link to="/usuarios/listar" class="cancelarBtn">Cancelar</router-link>
    </v-btn>
  </v-form>
      <!--Snackbar que se desplegara cuando le demos  a crear un registro-->
   <v-snackbar
             v-model="snackbarCreate"
        >
          {{textCreate}}
         <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbarCreate= false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
  </v-container>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Create',
  
  data(){

    return{

        empleado:
       {
         name: '',
         email: '',
       },
       snackbarCreate: false,
        textCreate: ''
    }
  },

  methods:{
    //Agregar empleados
    agregarUsuarios(){


      const datosEnviar = { nombre: this.empleado.name, correo: this.empleado.email };

      console.log(datosEnviar)
      axios.post("http://localhost/usuarios/?insertar=1", datosEnviar) //Enviamos por post a la URL de la api la variable insertar y ademas el objeto json convertido en string para que lo pueda leer la api 
        .then(response => console.log(response.data));

        this.snackbarCreate = !this.snackbarCreate
        
        this.textCreate = 'El registro con nombre: ' + this.empleado.name + ' ha sido creado!'

      //Redireccionar a /listar
      setTimeout(() => {
         window.location.href= "usuarios/listar"
      }, 1000);

     

    },

  
  }
}

</script>

<style>

.cancelarBtn{
  
  text-decoration: none;

}

.cancelarBtn:visited{
  
  text-decoration: none;
  color: white;

}
</style>
