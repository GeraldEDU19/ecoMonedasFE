import axios from "axios";
const BASE_URL=import.meta.env.VITE_BASE_URL+"usuario"
class CentroAcopioService{
    //Definición para Llamar al API y obtener el listado de películas
    //localhost:81/api/movie
    getUsuarios(){
      return axios.get(BASE_URL);
    }
    getAdministradores(){
      return axios.get(BASE_URL+"/getAllAdministradores/"+1)
    }
    //localhost:81/api/movie/2
   
   }
   export default new CentroAcopioService()