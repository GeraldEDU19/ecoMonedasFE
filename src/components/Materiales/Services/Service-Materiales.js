import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + "material";

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
}

export default new MaterialesService();
