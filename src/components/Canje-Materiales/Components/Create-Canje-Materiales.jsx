import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";

const CreateCanjeMaterialForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    CentroDeAcopio: "",
    Cliente: "",
    FechaCanje: "",
    Detalles: {
      materiales: [{ material: "", cantidad: 0, subTotalEcoMonedas: 0 }],
    },
  });

  const [errors, setErrors] = useState({});
  const [materiales, setMateriales] = useState([]);
  const [centrosDeAcopio, setCentrosDeAcopio] = useState([]);

  useEffect(() => {
    // Simulación de una API que devuelve centros de acopio
    // Puedes reemplazar esto con la llamada real a tu API
    axios.get("tu-api/centros-de-acopio").then((response) => {
      setCentrosDeAcopio(response.data);
    });
  }, []);

  const fetchMateriales = (centroDeAcopioId) => {
    // Llama a la API de materiales según el centro de acopio seleccionado
    axios.get(`tu-api/materiales?centroDeAcopioId=${centroDeAcopioId}`).then((response) => {
      setMateriales(response.data);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es obligatorio"),
    year: Yup.string().required("El año es obligatorio"),
    CentroDeAcopio: Yup.string().required("El centro de acopio es obligatorio"),
    Cliente: Yup.string().required("El cliente es obligatorio"),
    FechaCanje: Yup.date().required("La fecha de canje es obligatoria"),
    Detalles: Yup.object().shape({
      materiales: Yup.array().of(
        Yup.object().shape({
          material: Yup.string().required("El material es obligatorio"),
          cantidad: Yup.number()
            .required("La cantidad es obligatoria")
            .positive("La cantidad debe ser positiva"),
          subTotalEcoMonedas: Yup.number()
            .required("El subtotal en EcoMonedas es obligatorio")
            .positive("El subtotal en EcoMonedas debe ser positivo"),
        })
      ),
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "CentroDeAcopio") {
      // Si el campo es el de CentroDeAcopio, llama a la API de materiales
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        Detalles: {
          ...prevData.Detalles,
          materiales: [{ material: "", cantidad: 0, subTotalEcoMonedas: 0 }],
        },
      }));
      fetchMateriales(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newMateriales = [...prevData.Detalles.materiales];
      newMateriales[index] = {
        ...newMateriales[index],
        [name]: value,
      };
      return {
        ...prevData,
        Detalles: {
          ...prevData.Detalles,
          materiales: newMateriales,
        },
      };
    });
  };

  const handleAddMaterial = () => {
    setFormData((prevData) => ({
      ...prevData,
      Detalles: {
        ...prevData.Detalles,
        materiales: [...prevData.Detalles.materiales, { material: "", cantidad: 0, subTotalEcoMonedas: 0 }],
      },
    }));
  };

  const handleRemoveMaterial = (index) => {
    setFormData((prevData) => {
      const newMateriales = [...prevData.Detalles.materiales];
      newMateriales.splice(index, 1);
      return {
        ...prevData,
        Detalles: {
          ...prevData.Detalles,
          materiales: newMateriales,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Aquí puedes realizar la llamada a la API para crear el nuevo objeto CanjeMaterial
        // Puedes usar formData para enviar los datos al servidor

        // Ejemplo de cómo imprimir los datos en la consola
        console.log("Nuevo CanjeMaterial:", formData);
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Detalles del Canje
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="centro-de-acopio-label">Centro de Acopio</InputLabel>
            <Select
              labelId="centro-de-acopio-label"
              id="CentroDeAcopio"
              name="CentroDeAcopio"
              value={formData.CentroDeAcopio}
              onChange={handleChange}
              error={!!errors.CentroDeAcopio}
            >
              <MenuItem value="" disabled>
                Seleccione un centro de acopio
              </MenuItem>
              {centrosDeAcopio.map((centro) => (
                <MenuItem key={centro.id} value={centro.nombre}>
                  {centro.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.CentroDeAcopio && (
              <Typography variant="caption" color="error">
                {errors.CentroDeAcopio}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="material-label">Material</InputLabel>
            {formData.Detalles.materiales.map((material, index) => (
              <div key={index}>
                <Select
                  labelId="material-label"
                  id={`material-${index}`}
                  name={`Detalles.materiales[${index}].material`}
                  value={material.material}
                  onChange={(e) => handleNestedChange(e, index)}
                  error={!!errors.Detalles?.materiales?.[index]?.material}
                >
                  <MenuItem value="" disabled>
                    Seleccione un material
                  </MenuItem>
                  {materiales.map((mat) => (
                    <MenuItem key={mat.id} value={mat.nombre}>
                      {mat.nombre}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Cantidad"
                  type="number"
                  name={`Detalles.materiales[${index}].cantidad`}
                  value={material.cantidad}
                  onChange={(e) => handleNestedChange(e, index)}
                  error={!!errors.Detalles?.materiales?.[index]?.cantidad}
                  style={{ marginLeft: "8px" }}
                />
                <TextField
                  label="SubTotalEcoMonedas"
                  type="number"
                  name={`Detalles.materiales[${index}].subTotalEcoMonedas`}
                  value={material.subTotalEcoMonedas}
                  onChange={(e) => handleNestedChange(e, index)}
                  error={!!errors.Detalles?.materiales?.[index]?.subTotalEcoMonedas}
                  style={{ marginLeft: "8px" }}
                />
                {index > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleRemoveMaterial(index)}
                  >
                    Eliminar Material
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddMaterial}>
              Agregar Material
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Crear CanjeMaterial
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCanjeMaterialForm;
