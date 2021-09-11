<template>
  <v-container justify="center" class="pt-10">
    <h2 class="text-center">Crear empleado</h2>
    <v-form
    ref="form"
    @submit.prevent="agregarEmpleados()"
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
     <router-link to="/listar" class="cancelarBtn">Cancelar</router-link>
    </v-btn>
  </v-form>
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
         email: ''
       },
    }
  },

  methods:{
    //Agregar empleados
    agregarEmpleados(){


      const datosEnviar = { nombre: this.empleado.name, correo: this.empleado.email };

      console.log(datosEnviar)
      axios.post("http://localhost/empleados/?insertar=1", datosEnviar) //Enviamos por post a la URL de la api la variable insertar y ademas el objeto json convertido en string para que lo pueda leer la api 
        .then(response => console.log(response.data));

      //Redireccionar a /listar

      window.location.href= "/listar"

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
