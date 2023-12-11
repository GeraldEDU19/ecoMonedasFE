import { useContext, useEffect, useState } from "react";
import MaterialesService from "../Services/Service-Materiales";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AttachMoney, Info} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from "../../../context/UserContext";


export const ListMateriales = () => {
  const location = useLocation();
  const { user, decodeToken, autorize } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())
    useEffect(() => {
      setUserData(decodeToken())
    }, [user])

  useEffect(() => {

    


    const queryParams = new URLSearchParams(location.search);
    const created = queryParams.get('created');

    if (created) {
      // Display your success message
      toast.success('Material creado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location]);
 //Resultado de consumo del API, respuesta
 const [data, setData] = useState(null);
 //Error del API
 const [error, setError] = useState("");
 //Booleano para establecer sí se ha recibido respuesta
 const [loaded, setLoaded] = useState(false);
 useEffect(() => {
   setLoaded(true);

   MaterialesService.getMateriales()
     .then((response) => {
       setData(response.data.results);
       console.log(response.data);
       setError(response.error);
       setLoaded(true);
     })
     .catch((error) => {
       console.log(error);
       setError(error);
       throw new Error("Respuesta no válida del servidor");
     });
 }, []);

 const getImageUrl = async (materialName) => {
  try {
    const response = await MaterialesService.getImagenMaterial(materialName);
    const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/*' }));
    return imageUrl;
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    throw error;
  }
}

 if (!loaded) return <p>Cargando...</p>;
 if (error) return <p>Error: {error.message}</p>;
  // Rest of your component
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
    {data &&
      data.map((item) => (
        <Grid item xs={4} key={item.ID}>
          <Card
            sx={{
              border: `1px solid black`,
              borderRadius: "10px",
            }}
          >
            <CardHeader
              sx={{
                p: 0,
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.black,
              }}
              style={{ textAlign: "center" }}
              title={item.Nombre}
             
            />
            <CardContent>
              <img
                src={MaterialesService.getImagenMaterialURL(item.ID)}
                alt=""
                width={"100%"}
                height={"100%"}
              />
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                backgroundColor:  item.Color,
                color: `${item.Color}50`,
              }}
            >
              <div>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem"}}
              >
                <AttachMoney /> <span><strong>{item.Precio}</strong></span>
              </Typography>
              </div>
              {user && autorize({ allowedRoles: ["Administrador"] }) && (
              <IconButton component={Link} to={`/material/${item.ID}`} aria-label='Detalle' sx={{ ml: 'auto' }}>
                <EditIcon />
              </IconButton >
              )}
              <IconButton component={Link} to={`/material/${item.ID}`} aria-label='Detalle' sx={{ ml: 'auto' }}>
                <Info />
              </IconButton >
            </CardActions>
          </Card>
        </Grid>
      ))}
  </Grid> 
  );
};

