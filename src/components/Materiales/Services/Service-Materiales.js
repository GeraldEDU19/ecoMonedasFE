import axios from 'axios';
const URL = import.meta.env.VITE_BASE_URL
const BASE_URL = URL + "material";

class MaterialesService {
  getMateriales() {
    return axios.get(BASE_URL);
  }

  getMaterialById(MaterialId) {
    return axios.get(BASE_URL + "/" + MaterialId);
  }

  createMaterial(formData) {
    return axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido adecuado
      },
    });
  }

  getImagenMaterial(MaterialImagenName) {
    const imagenUrl = `${URL}imagen/${MaterialImagenName}`;

    console.log("🚀 ~ file: Service-Materiales.js:25 ~ MaterialesService ~ getImagenMaterial ~ imagenUrl:", imagenUrl)
  
    return axios.get(imagenUrl, {
      responseType: 'arraybuffer',
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('Error al obtener la imagen:', error);
        throw error;
      });
  }
  getImagenMaterialURL(MaterialImagenName) {
    const imagenUrl = `${URL}imagen/${MaterialImagenName}`;

    return imagenUrl
  }
}

export default new MaterialesService();
