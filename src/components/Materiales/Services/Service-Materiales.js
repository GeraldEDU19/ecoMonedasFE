import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"material"
 //localhost:81/api/movie/
 class MaterialesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getMateriales(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getMaterialById(MaterialId){
    return axios.get(BASE_URL+"/"+MaterialId)
  }
  createMaterial(Material){
    return axios.post(BASE_URL, Material);
}
 }
 export default new MaterialesService()