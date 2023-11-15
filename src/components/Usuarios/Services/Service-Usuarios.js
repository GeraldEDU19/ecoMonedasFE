import axios from "axios";
const BASE_URL=import.meta.env.VITE_BASE_URL+"usuario"
class UsuarioService{
    //Definición para Llamar al API y obtener el listado de películas
    //localhost:81/api/movie
    getUsuarios(){
      return axios.get(BASE_URL);
    }
    getAdministradores(){
      return axios.get(BASE_URL+"/getAllAdministradores/"+1)
    }
    getAdministradoresSinCentro(){
      return axios.get(BASE_URL+"/getAllAdministradoresSinCentro/"+1)
    }
   
   }
   export default new UsuarioService()