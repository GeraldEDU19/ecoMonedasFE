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
    getClientes(){
      return axios.get(BASE_URL+"/getAllClientes/"+1)
    }
    getAdministradoresSinCentro(){
      return axios.get(BASE_URL+"/getAllAdministradoresSinCentro/"+1)
    }
    createUser(User){
      return axios.post(BASE_URL, User);
    }
    loginUser(User){
      return axios.post(BASE_URL+ '/login/', User);
    }
    changePassword(user) {
      console.log("🚀 ~ file: Service-Usuarios.js:25 ~ UsuarioService ~ changePassword ~ user:", user)
      return axios.post(BASE_URL+"/changePassword/", user);
    }
   }
   export default new UsuarioService()