import axios from "axios";
const BASE_URL=import.meta.env.VITE_BASE_URL+"centro"
class CentroAcopioService{
    //Definición para Llamar al API y obtener el listado de películas
    //localhost:81/api/movie
    getCentros(){
      return axios.get(BASE_URL);
    }
    //localhost:81/api/movie/2
   
   }
   export default new CentroAcopioService()