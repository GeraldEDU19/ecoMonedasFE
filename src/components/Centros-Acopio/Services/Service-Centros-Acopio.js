import axios from "axios";
const BASE_URL=import.meta.env.VITE_BASE_URL+"centroAcopio"
class CentroAcopioService{
    //Definición para Llamar al API y obtener el listado de películas
    //localhost:81/api/movie
    getCentros(){
      return axios.get(BASE_URL);
    }
    //localhost:81/api/movie/2
    getCentroById(CentroAcopioId){
      return axios.get(BASE_URL+"/"+CentroAcopioId)
    }
    createCentroAcopio(CentroAcopio){
      console.log('entro aqui')
      return axios.post(BASE_URL, CentroAcopio);
  }
  updateCentroAcopio(CentroAcopio){
    return axios.put(BASE_URL, CentroAcopio);
}
getCentroAcopioFormById(CentroAcopioId){
  return axios.get(BASE_URL + '/getForm/' + CentroAcopioId);
}
   }
   export default new CentroAcopioService()