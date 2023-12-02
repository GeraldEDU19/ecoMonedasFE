import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import UsuarioService from "../../Usuarios/Services/Service-Usuarios";
import ServiceCentrosAcopio from "../../Centros-Acopio/Services/Service-Centros-Acopio";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CanjeMaterialesService from "../../Canje-Materiales/Services/Service-Canje-Materiales"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateCanjeMaterialForm = () => {
  const [formData, setFormData] = useState({
    Administrador: "",
    Cliente: "",
    FechaCanje: "",
    Detalles: {
      materiales: [{ material: "", cantidad: 1, subTotalEcoMonedas: 0 }],
    },
  });

  const [errors, setErrors] = useState({});
  const [administradores, setAdministradores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [centrosDeAcopio, setCentrosDeAcopio] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [materialErrors, setMaterialErrors] = useState([]);
  const [created, setCreated] = useState(false);
  const [total, setTotal] = useState(0);
const [totalError, setTotalError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    UsuarioService.getAdministradores()
      .then((response) => setAdministradores(response.data.results))
      .catch((error) => console.error("Error fetching administrators:", error));
  }, []);

  useEffect(() => {
    UsuarioService.getClientes()
      .then((response) => setClientes(response.data.results))
      .catch((error) => console.error("Error fetching Clientes:", error));
  }, []);

  useEffect(() => {
    if (created) {
      toast.success('Factura creada, Redirigiendo...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [created]);

  useEffect(() => {
    if (formData.Administrador !== "") {
      ServiceCentrosAcopio.getCentroDeAcopioPorAdministrador(formData.Administrador)
        .then((response) => {
          const centroDeAcopio = response.data.results;
          setCentrosDeAcopio([centroDeAcopio]);
          setMateriales(centroDeAcopio.Materiales);

          // Actualizar el estado del formulario para incluir el ID del CentroDeAcopio
          setFormData((prevData) => ({
            ...prevData,
            CentroDeAcopio: centroDeAcopio.ID,
            Detalles: {
              materiales: [{ material: "", cantidad: 1, subTotalEcoMonedas: 0 }],
            },
          }));
        })
        .catch((error) => console.error("Error fetching materials:", error));
    } else {
      // Si no hay administrador seleccionado, reinicia la lista de materiales y detalles
      setMateriales([]);
      setFormData((prevData) => ({
        ...prevData,
        CentroDeAcopio: "", // Asegúrate de establecer el ID del CentroDeAcopio a un valor adecuado aquí
        Detalles: {
          materiales: [{ material: "", cantidad: 1, subTotalEcoMonedas: 0 }],
        },
      }));
    }
  }, [formData.Administrador, setFormData, setMateriales]);

  const calculateTotal = () => {
    const newTotal = formData.Detalles.materiales.reduce(
      (acc, material) => acc + Number(material.subTotalEcoMonedas),
      0
    );
    setTotal(newTotal);
  };
  

  useEffect(() => {
    // Esta función se ejecutará cada vez que cambien los materiales
    calculateTotal();
  }, [formData.Detalles.materiales]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Administrador") {
      // Si el nombre es "Administrador", actualiza el estado del administrador
      setFormData((prevData) => ({ ...prevData, [name]: value, CentroDeAcopio: "" }));
    } else if (name === "CentroDeAcopio") {
      // Si el nombre es "CentroDeAcopio", actualiza el estado del centro de acopio
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // Para otros campos, simplemente actualiza el estado
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    if (name === "Administrador") {
      setMateriales([]);
    }
  };


  const handleMaterialChange = (index, value) => {
    setFormData((prevData) => {
      const newMateriales = [...prevData.Detalles.materiales];
      newMateriales[index].material = value;
  
      // Find the selected material in the list
      const selectedMaterial = materiales.find((mat) => mat.ID === value);
  
      // Get the material cost or set it to 0 if not found
      const materialCost = selectedMaterial ? selectedMaterial.Precio : 0;
  
      // Set the quantity to 1 automatically
      newMateriales[index] = {
        ...newMateriales[index],
        cantidad: 1,
        subTotalEcoMonedas: materialCost, // Calculate the subtotal automatically
      };
  
      // Call handleCantidadChange to update the subtotal calculation
      handleCantidadChange(index, 1);
  
      // Clear the material error for the current index
      setMaterialErrors((prevErrors) => {
        const newMaterialErrors = [...prevErrors];
        newMaterialErrors[index] = "";
        return newMaterialErrors;
      });
  
      // Recalculate the total
      
  
      return { ...prevData, Detalles: { ...prevData.Detalles, materiales: newMateriales } };
    });
  };
  



  const handleCantidadChange = (index, value) => {
    setFormData((prevData) => {
      const newMateriales = [...prevData.Detalles.materiales];
      const materialId = newMateriales[index].material || "";

      // Buscar el material en la lista de materiales
      const selectedMaterial = materiales.find((mat) => mat.ID === materialId);

      // Obtener el precio del material o establecerlo en 0 si no se encuentra
      const materialCost = selectedMaterial ? selectedMaterial.Precio : 0;

      const cantidad = parseInt(value, 10) || 0;

      newMateriales[index] = {
        ...newMateriales[index],
        cantidad: cantidad,
        subTotalEcoMonedas: cantidad * materialCost,
      };

      // Eliminar la línea si la cantidad es 0 o menos y no es la primera línea
      if (index > 0 && cantidad <= 0) {
        console.log("🚀 ~ file: Create-Canje-Materiales.jsx:138 ~ setFormData ~ index:", index)

        handleRemoveMaterial(index);
      }
      return { ...prevData, Detalles: { ...prevData.Detalles, materiales: newMateriales } };
    });
  };





  const handleAddMaterial = () => {
    setFormData((prevData) => ({
      ...prevData,
      Detalles: {
        ...prevData.Detalles,
        materiales: [...prevData.Detalles.materiales, { material: "", cantidad: 1, subTotalEcoMonedas: 0 }],
      },
    }));
  };

  const handleRemoveMaterial = (index) => {
    setFormData((prevData) => {
      console.log("------------------------------------------------")
      const newMateriales = [...prevData.Detalles.materiales];
      const removedMaterial = newMateriales.splice(index, 1)[0];

      setMaterialErrors((prevErrors) => {
        const newMaterialErrors = [...prevErrors];
        newMaterialErrors.splice(index, 1);
        return newMaterialErrors;
      });

      // Desseleccionar el material antes de eliminarlo
      if (removedMaterial) {
        removedMaterial.material = "";
      }
      return { ...prevData, Detalles: { ...prevData.Detalles, materiales: newMateriales } };
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    Yup.object()
      .shape({
        Administrador: Yup.string().required("El administrador es obligatorio"),
        Cliente: Yup.string().required("El cliente es obligatorio"),
        Detalles: Yup.object().shape({
          materiales: Yup.array().of(
            Yup.object().shape({
              material: Yup.string().required("El material es obligatorio"),
              cantidad: Yup.number().required("La cantidad es obligatoria").positive("La cantidad debe ser positiva"),
              subTotalEcoMonedas: Yup.number().required("El subtotal en EcoMonedas es obligatorio").positive("El subtotal en EcoMonedas debe ser positivo"),
            })
          ),
        }),
      })
      .validate(formData, { abortEarly: false })

      .then(() => {
        const totalEcoMonedas = formData.Detalles.materiales.reduce((total, material) => total + material.subTotalEcoMonedas, 0);
        formData.total = totalEcoMonedas;
        console.log("🚀 ~ file: Create-Canje-Materiales.jsx:229 ~ .then ~ formData:", formData)
        CanjeMaterialesService.createCanjeMateriales(formData)
          
          .then((response) => {
            console.log(response)
            setCreated(true)
            setTimeout(() => {
              navigate('/canjesMaterialesByAdministrador/');
            }, 2000);
          })
          .catch((error) => {
            console.error('Error creating canje Materiales:', error);
        });
      

        
      })
      .catch((err) => {
        console.error("Errores de validación:", err);
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };


  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Container maxWidth="sm" sx={{ marginTop: 0 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Sección: Detalles del Canje */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Detalles del Canje
              </Typography>
            </Grid>

            {/* Sección: Administrador */}
            {/* Bloque para el campo de Administrador */}
<Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel id="administrador-label">Administrador</InputLabel>
    <Select
      labelId="administrador-label"
      id="Administrador"
      name="Administrador"
      value={formData.Administrador}
      onChange={handleInputChange}
      error={!!errors.Administrador}
      variant="outlined"
      fullWidth
    >
      <MenuItem value="" disabled>
        Seleccione un administrador
      </MenuItem>
      {administradores.map((admin) => (
        <MenuItem key={admin.ID} value={admin.ID}>
          {`${admin.PrimerNombre} ${admin.SegundoNombre} ${admin.PrimerApellido} ${admin.SegundoApellido}`}
        </MenuItem>
      ))}
    </Select>
    {errors.Administrador && (
      <Typography variant="caption" color="error">
        {errors.Administrador}
      </Typography>
    )}
  </FormControl>
</Grid>

{/* Bloque para el campo de Cliente */}
<Grid item xs={12}>
  <FormControl fullWidth spacing={7}>
    <InputLabel id="cliente-label">Cliente</InputLabel>
    <Select
      labelId="cliente-label"
      id="Cliente"
      name="Cliente"
      value={formData.cliente}
      onChange={handleInputChange}
      error={!!errors.cliente}
      variant="outlined"
      fullWidth
    >
      <MenuItem value="" disabled>
        Seleccione un Cliente
      </MenuItem>
      {clientes.map((cliente) => (
        <MenuItem key={cliente.ID} value={cliente.ID}>
          {`${cliente.PrimerNombre} ${cliente.SegundoNombre} ${cliente.PrimerApellido} ${cliente.SegundoApellido}`}
        </MenuItem>
      ))}
    </Select>
    {errors.Cliente && (
      <Typography variant="caption" color="error">
        {errors.Cliente}
      </Typography>
    )}
  </FormControl>
</Grid>


            {/* Sección: Centro de Acopio */}
            <Grid item xs={12}>
              {centrosDeAcopio.length === 1 ? (
                <TextField
                  fullWidth
                  label="Centro de Acopio"
                  value={centrosDeAcopio[0].Nombre}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="centro-de-acopio-label">Centro de Acopio</InputLabel>
                  <Select
                    labelId="centro-de-acopio-label"
                    id="CentroDeAcopio"
                    name="CentroDeAcopio"
                    value={formData.CentroDeAcopio}
                    onChange={handleInputChange}
                    error={!!errors.CentroDeAcopio}
                    variant="outlined"
                    fullWidth
                  >
                    {centrosDeAcopio.map((centro) => (
                      <MenuItem key={centro.ID} value={centro.ID}>
                        {centro.Nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.CentroDeAcopio && (
                    <Typography variant="caption" color="error">
                      {errors.CentroDeAcopio}
                    </Typography>
                  )}
                </FormControl>
              )}
            </Grid>

            {/* Sección: Materiales */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Material</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>SubTotalEcoMonedas</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.Detalles.materiales.map((material, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <FormControl fullWidth>
                            <Select
  labelId={`material-label-${index}`}
  id={`material-${index}`}
  name={`material-${index}`}
  value={material.material.ID}
  onChange={(e) => handleMaterialChange(index, e.target.value)}
  error={!!materialErrors[index]}
  variant="outlined"
  fullWidth
  autoWidth={false}
  sx={{
    backgroundColor: material.material.Color
      ? `rgba(${parseInt(material.material.Color.slice(1, 3), 16)}, ${parseInt(material.material.Color.slice(3, 5), 16)}, ${parseInt(material.material.Color.slice(5, 7), 16)}, 0.5)`
      : "transparent",
    borderRadius: 4,
    // Agrega más estilos según tus preferencias
  }}
>
  <MenuItem value="" disabled>
    Seleccione un material
  </MenuItem>
  {materiales.map((mat) => (
    <MenuItem
      key={mat.ID}
      value={mat.ID}
      sx={{
        backgroundColor: mat.Color
          ? `rgba(${parseInt(mat.Color.slice(1, 3), 16)}, ${parseInt(mat.Color.slice(3, 5), 16)}, ${parseInt(mat.Color.slice(5, 7), 16)}, 0.5)`
          : "transparent",
        // Agrega más estilos según tus preferencias
      }}
    >
      {mat.Nombre}
    </MenuItem>
  ))}
</Select>


                              <Typography variant="caption" color="error">
                                {materialErrors[index]}
                              </Typography>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label="Cantidad"
                              type="number"
                              name={`cantidad-${index}`}
                              value={material.cantidad === 0 ? 0 : material.cantidad || ""}
                              onChange={(e) => handleCantidadChange(index, e.target.value)}
                              error={!!errors.Detalles?.materiales?.[index]?.cantidad}
                              helperText={errors.Detalles?.materiales?.[index]?.cantidad}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography>{material.subTotalEcoMonedas}</Typography>
                          </TableCell>
                          <TableCell>
                            {index > 0 && (
                              <IconButton color="error" onClick={() => handleRemoveMaterial(index)}>
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Sección: Agregar Material */}
                <IconButton color="primary" onClick={handleAddMaterial}>
                  <AddCircleIcon />
                </IconButton>
              </FormControl>
              {/* Sección: Total */}
  <Typography variant="h6" gutterBottom>
    Total: {total} EcoMonedas
  </Typography>
            </Grid>


            {/* Sección: Botones de Acción */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Facturar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );


};

export default CreateCanjeMaterialForm;
