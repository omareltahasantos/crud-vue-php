<template>
    <v-container justify="center" class="pt-10">
     <!--<h2 class="text-center mb-5">Listado usuarios</h2>-->


     <!---->
     <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                   <v-btn
                        text
                        class="ma-2 black--text "
                        @click="ordenarPorId()"
                      >
                        id
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
                        text
                        class="ma-2 black--text"
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
                        text
                        class="ma-2 black--text"
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
    <!--Si el primer parametro que tiene limit es 0, querra decir que comienza del principio y entonces el boton previous debe estar en disabled-->

        <v-btn
              v-if="limitFirstParam === 0"
              color="blue darken-3"
              class="ma-2 white--text slide-in-fwd-center"
              @click="getPreviousEmployees(limitFirstParam, limitSecondParam)"
              disabled
        >
        Previous
        </v-btn>
         <v-btn
              v-if="limitFirstParam != 0"
              color="blue darken-3"
              class="ma-2 white--text slide-in-fwd-center"
              @click="getPreviousEmployees(limitFirstParam, limitSecondParam)"
              
        >
        previous
         </v-btn>

         <!--Si noMoreRecords es true, querra decir que no hay mas resultados para mostrar, entonces se aplicara un disable al boton-->
          <v-btn
              v-if="noMoreRecords === true"
              color="blue darken-3"
              class="ma-2 white--text slide-in-fwd-center"
              @click="getNextEmployees(limitFirstParam, limitSecondParam)"
              disabled
              
        >
        Next
        </v-btn>
          <v-btn
              v-if="noMoreRecords === false"
              color="blue darken-3"
              class="ma-2 white--text slide-in-fwd-center"
              @click="getNextEmployees(limitFirstParam, limitSecondParam)"
              
              
        >
        Next
        </v-btn>

       <!-- Snackbar para el boton delete -->
        <v-snackbar
             v-model="snackbarDelete"
        >
          {{textDelete }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbarDelete = false"
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
  name: 'Listar',

  data(){
    return{
     lista: [
       
    ],
    info: '',
    sortId: false,
    sortNombre: false,
    sortCorreo: false,
    snackbarDelete: false, //Variable para desplegar snackbar delete
    textDelete: '',
    limitFirstParam: 0,
    limitSecondParam: 2,
    noMoreRecords: false,
    totalRecords: '',
    contador: '',
    resultado: '',
    }
  },

  created() {
    
    //Llamamos a consultarDatos() para que siempre que cargue la vista, ya este disponible para iterar el array con el json

    this.consultarDatos(this.limitFirstParam, this.limitSecondParam)
    this.getCountEmployees()
    //Crear otra funcion para cuantas paginas hay
  },
  updated(){

    
  },
  methods:{ 

      //Consultar datos de todos los usuarios que hay en la base de datos
      consultarDatos(limitFirstParam, limitSecondParam){

       // console.log(limitFirstParam)
        // console.log(limitSecondParam)
         axios.get("http://localhost/usuarios/?limitFirstParam="+limitFirstParam+"&limitSecondParam="+limitSecondParam).then((result) => {
          
            console.log(result.data)
        this.lista = result.data //Metemos todo el json dentro del array lista
       })
      },
      
      //Eliminamos el empleado al cual le hayamos dado al boton eliminar.
      eliminarEmpleado(idEmpleado){

        //Por axios le pasamos en la url el id del empleado a eliminar y la API se encarga de capturar ese valor y eliminar dado que le pasamos una variable borrar
       axios.post("http://localhost/usuarios/?borrar="+idEmpleado) //Enviamos por post a la URL de la api la variable insertar y ademas el objeto json convertido en string para que lo pueda leer la api 
        .then(response => console.log(response.data));

        this.snackbarDelete = !this.snackbarDelete

        this.textDelete = 'El registro con id: ' + idEmpleado + ', ha sido eliminado!'
        
        setTimeout(() => {
          window.location.href="listar" //Nos refresca la pagina para que salga que se ha eliminado el usuario
        }, 1000);
        
      },
      //Ordenamos los usuarios en orden asc o desc dependiendo del valor que tenga sort id
      ordenarPorId(){
        this.sortId = !this.sortId

        if (this.sortId === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
     
          //Obtengo todos los usuarios en orden descendiente por id
          axios.get("http://localhost/usuarios/?ordenarDescId=1&limitFirstParam="+limitFirstParam+"&limitSecondParam="+limitSecondParam).then((result) => {
           console.log(result.data)
         // this.lista = result.data //Metemos todo el json dentro del array lista
          })

        }else if (this.sortId === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
           //Obtengo todos los usuarios en orden descendiente por id
        
          axios.get("http://localhost/usuarios/?ordenarAscId=1&limitFirstParam="+limitFirstParam+"&limitSecondParam="+limitSecondParam).then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })
      }
    },
    ordenarPorNombre(){
       this.sortNombre = !this.sortNombre

        if (this.sortNombre === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
     
          //Obtengo todos los usuarios en orden descendiente por id
          axios.get("http://localhost/usuarios/?ordenarDescNombre=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })

        }else if (this.sortId === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
           //Obtengo todos los usuarios en orden descendiente por id
        
          axios.get("http://localhost/usuarios/?ordenarAscNombre=1").then((result) => {

          this.lista = result.data //Metemos todo el json dentro del array lista
          })
      }
    },
    ordenarPorCorreo(){
        this.sortCorreo = !this.sortCorreo
        if (this.sortCorreo === true) { ///Tiene que salir la tabla que las filas salgan de mayor a menor
    
        //Obtengo todos los usuarios en orden descendiente por id
        axios.get("http://localhost/usuarios/?ordenarDescCorreo=1").then((result) => {

        this.lista = result.data //Metemos todo el json dentro del array lista
        })

      }else if (this.sortCorreo === false) { //Tiene que salir la tabla que las filas salgan de menor a mayor 
          //Obtengo todos los usuarios en orden descendiente por id
      
        axios.get("http://localhost/usuarios/?ordenarAscCorreo=1").then((result) => {

        this.lista = result.data //Metemos todo el json dentro del array lista
        })
    }
    },
    getCountEmployees(){
       axios.get("http://localhost/usuarios/?count=1").then((result) => {

          this.totalRecords=  result.data
        
            
        // En caso de this.limitFirstParam ser mayor, this.noMoreRecords = true
       })
    },
    //Funcion que se ejecuta cuando damos a next en la paginacion
    getNextEmployees(limitFirstParam, limitSecondParam){

        
        this.limitFirstParam = limitFirstParam
        this.limitSecondParam = limitSecondParam
        this.limitFirstParam = (this.limitFirstParam + this.limitSecondParam)
    
       axios.get("http://localhost/usuarios/?limitFirstParam="+this.limitFirstParam+"&limitSecondParam="+this.limitSecondParam).then((result) => {
          
          if ((this.totalRecords - this.limitSecondParam) === this.limitFirstParam) {
              console.log("El primer parametro y el segundo son iguales")
              this.noMoreRecords = true
              this.lista = result.data
          }else{
            this.lista = result.data
          }


    })
    },
    getPreviousEmployees(limitFirstParam, limitSecondParam){
        this.noMoreRecords = false

      console.log(limitFirstParam + " " + limitSecondParam)

      this.limitFirstParam = limitFirstParam
      this.limitSecondParam = limitSecondParam

      this.limitFirstParam = (this.limitFirstParam - this.limitSecondParam)

      console.log(this.limitFirstParam)


      axios.get("http://localhost/usuarios/?limitFirstParam="+this.limitFirstParam+"&limitSecondParam="+this.limitSecondParam).then((result) => {
        
        console.log(result.data)
        this.lista = result.data //Metemos todo el json dentro del array lista
      })




    }

  }
}
</script>

<style>
.btn-id{

  color: red;
}
/* Helper classes */

</style>