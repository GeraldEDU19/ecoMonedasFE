import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"canjesMateriales"
 //localhost:81/api/movie/
 class CanjeMaterialesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCanjesMateriales(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getCanjeMaterialById(CanjeMaterialId){
    return axios.get(BASE_URL+"/"+CanjeMaterialId)
  }
  createCanjeMateriales(canjeMateriales){
    console.log('entro aqui')
    return axios.post(BASE_URL, canjeMateriales);
}
  getCanjeMaterialByClienteID(ClienteID){
    console.log(BASE_URL+"/getByClienteID/"+ClienteID)
    return axios.get(BASE_URL+"/getByClienteID/"+ClienteID)
  }
  getCanjeMaterialByAdministradorID(AdministradorID){
    console.log(BASE_URL+"/getByAdministradorID/"+AdministradorID)
    return axios.get(BASE_URL+"/getByAdministradorID/"+AdministradorID)
  }
 }
 export default new CanjeMaterialesService()