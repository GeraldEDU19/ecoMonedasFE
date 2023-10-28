import { useEffect, useState } from "react";
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
// import papel from '../../../assets/papel.png'
// import plastico from '../../../assets/plastico.png'
// import vidrio from '../../../assets/vidrio.png'

export function ListMateriales() {
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

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data &&
        data.map((item) => (
          <Grid item xs={4} key={item.MaterialID}>
            <Card
              sx={{
                border: `4px dotted ${item.Color}`,
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
                subheader={item.Descripcion}
              />
              <CardContent>
                <img
                  src={`/assets/${item.Imagen}`}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white,
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
                <IconButton
                  component={Link}
                  to={`/movie/${item.MaterialID}`}
                  aria-label="Detalle"
                  sx={{ ml: "auto" }}
                >
                  <Info />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
