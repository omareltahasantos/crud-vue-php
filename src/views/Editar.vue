<template>
   <v-container justify="center" class="pt-10">
    <h2 class="text-center">Editar empleados</h2>
    <v-form
    ref="form"
    @submit.prevent="editarEmpleados(id)"
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
  name: 'Update',

  props: ['id'],

  data(){
    return{

        empleado: {
          id: '',
          name: '',
          email: ''
        }
    }
  },

  created(){

    // Con this.id recibimos el id por prop que viene por la URL
        axios.get("http://localhost/empleados/?consultar="+this.id).then((result) => {

     
          this.empleado.id = result.data[0].id
          this.empleado.name = result.data[0].nombre
          this.empleado.email = result.data[0].correo
          
         
         })
    
  },

  methods:{

    editarEmpleados(id){
      const idEmpleado = id
     console.log("Este es el id del empleado que queremos editar: " + idEmpleado)

        const datosEnviar2 =  { id:this.empleado.id, nombre: this.empleado.name, correo: this.empleado.email}

        console.log("La variable datos enviar contiene: " + datosEnviar2.nombre + " " + datosEnviar2.correo)

        


       axios.post("http://localhost/empleados/?actualizar="+this.empleado.id, datosEnviar2) //Enviamos por post a la URL de la api la variable insertar y ademas el objeto json convertido en string para que lo pueda leer la api 
       .then(response => console.log(response.data));

      ///FALTA HACER EL UPDATE CON LA BASE DE DATOS, NO LLEGAN BIEN LOS VALORES
      setTimeout(() => {
          window.location.href= "listar"  
      }, 1000);
      
    }
    
  }
};
</script>

<style>
</style>
