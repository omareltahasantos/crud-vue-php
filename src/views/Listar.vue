<template>
    <v-container justify="center" class="pt-10">
     <h2 class="text-center mb-5">Listado empleados</h2>
     <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                   <v-btn
                        color="blue darken-3"
                        class="ma-2 white--text"
                        @click="ordenarPorId()"
                      >
                        Id
                        <v-icon v-if="sortId === true"
                          right
                          dark
                        >
                          mdi-sort-bool-ascending-variant
                        </v-icon>
                        <v-icon v-if="sortId === false"
                          right
                          dark
                        >
                          mdi-sort-bool-descending-variant
                        </v-icon>

                    </v-btn>
                </th>
                <th class="text-left">
                 <v-btn
                        color="blue darken-3"
                        class="ma-2 white--text"
                        @click="ordenarPorNombre()"
                      >
                        Nombre
                        <v-icon v-if="sortNombre === true"
                          right
                          dark
                        >
                          mdi-sort-bool-ascending-variant
                        </v-icon>
                        <v-icon v-if="sortNombre === false"
                          right
                          dark
                        >
                          mdi-sort-bool-descending-variant
                        </v-icon>

                    </v-btn>
                </th>
                <th class="text-left">
                   <v-btn
                        color="blue darken-3"
                        class="ma-2 white--text"
                        @click="ordenarPorCorreo()"
                      >
                        Correo
                        <v-icon v-if="sortCorreo === true"
                          right
                          dark
                        >
                          mdi-sort-bool-ascending-variant
                        </v-icon>
                        <v-icon v-if="sortCorreo === false"
                          right
                          dark
                        >
                          mdi-sort-bool-descending-variant
                        </v-icon>

                    </v-btn>
                </th>
                <th class="t ext-left">
                  Acciones
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="empleado in lista"
                :key="empleado.id"
              >
                <td>{{ empleado.id }}</td>
                <td>{{ empleado.nombre }}</td>
                <td>{{ empleado.correo }}</td>
                <td >
                      <v-btn
                        color="blue darken-3"
                        class="ma-2 white--text slide-in-fwd-center"
                        :to="'/editar/'+empleado.id"
                      >
                        EDITAR
                        <v-icon
                          right
                          dark
                        >
                          mdi-pencil
                        </v-icon>
                    </v-btn>
                     <v-btn
                        color="red accent-4"
                        class="ma-2 white--text"
                        @click="eliminarEmpleado(empleado.id)"
                      >
                        DELETE
                        <v-icon
                          right
                          dark
                        >
                          mdi-delete
                        </v-icon>
                    </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> 
       
    </v-container>
    
</template>

<script>

import axios from 'axios'
export default {
  name: 'Listar',

  data(){
    return{
     lista: [
       
    ],
    info: '',
    sortId: false,
    sortNombre: false,
    sortCorreo: false,
    }
  },

  created() {
    
    //Llamamos a consultarDatos() para que siempre que cargue la vista, ya este disponible para iterar el array con el json

    this.consultarDatos()
  },
  methods:{ 

      //Consultar datos de todos los empleados que hay en la base de datos
      consultarDatos(){
         axios.get("http://localhost/empleados/").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
         })
      },
      //Eliminamos el empleado al cual le hayamos dado al boton eliminar.
      eliminarEmpleado(idEmpleado){

        //Por axios le pasamos en la url el id del empleado a eliminar y la API se encarga de capturar ese valor y eliminar dado que le pasamos una variable borrar
       axios.post("http://localhost/empleados/?borrar="+idEmpleado) //Enviamos por post a la URL de la api la variable insertar y ademas el objeto json convertido en string para que lo pueda leer la api 
        .then(response => console.log(response.data));

          window.location.href="listar" //Nos refresca la pagina para que salga que se ha eliminado el usuario
      },
      //Ordenamos los empleados en orden asc o desc dependiendo del valor que tenga sort id
      ordenarPorId(){
        this.sortId = !this.sortId

        if (this.sortId === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
     
          //Obtengo todos los empleados en orden descendiente por id
          axios.get("http://localhost/empleados/?ordenarDescId=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })

        }else if (this.sortId === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
           //Obtengo todos los empleados en orden descendiente por id
        
          axios.get("http://localhost/empleados/?ordenarAscId=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })
      }
    },
    ordenarPorNombre(){
       this.sortNombre = !this.sortNombre

        if (this.sortNombre === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
     
          //Obtengo todos los empleados en orden descendiente por id
          axios.get("http://localhost/empleados/?ordenarDescNombre=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })

        }else if (this.sortId === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
           //Obtengo todos los empleados en orden descendiente por id
        
          axios.get("http://localhost/empleados/?ordenarAscNombre=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })
      }
    },
    ordenarPorCorreo(){
        this.sortCorreo = !this.sortCorreo
        if (this.sortCorreo === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
    
        //Obtengo todos los empleados en orden descendiente por id
        axios.get("http://localhost/empleados/?ordenarDescCorreo=1").then((result) => {

        this.lista = result.data //Metemos todo el json dentro del array lista
        })

      }else if (this.sortCorreo === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
          //Obtengo todos los empleados en orden descendiente por id
      
        axios.get("http://localhost/empleados/?ordenarAscCorreo=1").then((result) => {

        this.lista = result.data //Metemos todo el json dentro del array lista
        })
    }
    }

  }
}
</script>

<style>
.btn-id{

  color: red;
}
</style>