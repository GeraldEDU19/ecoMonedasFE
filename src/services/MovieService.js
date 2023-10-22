import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"movie"
 //localhost:81/api/movie/
 class MovieService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getMovies(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getMovieById(MovieId){
    return axios.get(BASE_URL+"/"+MovieId)
  }
 }
 export default new MovieService()