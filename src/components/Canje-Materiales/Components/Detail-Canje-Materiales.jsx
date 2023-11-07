import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Grid } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import ServiceCanjeMateriales from "../Services/Service-Canje-Materiales";

export function DetailCanjeMateriales() {
  const routeParams = useParams();
  console.log(routeParams);

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ServiceCanjeMateriales.getCanjeMaterialById(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        console.log(
          "🚀 ~ file: Detail-Canje-Materiales.jsx:31 ~ useEffect ~ response.data.results:",
          response.data.results
        );
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }}>
      {data && (
        <div>
        <Grid container spacing={1}>
          <Grid item={true} xs={7}>
          <Typography variant="h3" component="h1" gutterBottom>
              Número Factura: {data.ID}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.title}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {data.year}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Centro de Acopio:
              </Box>{" "}
              {data.CentroDeAcopio.Nombre}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Cliente:
              </Box>{" "}
              {data.Cliente.PrimerNombre}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Administrador:
              </Box>{" "}
              {data.CentroDeAcopio.Administrador.PrimerNombre}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Fecha:
              </Box>{" "}
              {data.FechaCanje}
            </Typography>

            <div>
              <h1>Detalles de Canje</h1>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Material
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Cantidad
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Subtotal en EcoMonedas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.Detalles.map((detalle, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {detalle.Material[0].Nombre}
                      </td>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {detalle.Cantidad}
                      </td>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {detalle.SubTotalEcoMonedas}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              
            </div>

            

          </Grid>


          
        </Grid>
        <div style={{textAlign: "right"}}>
              <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Total de EcoMonedas: {data.TotalEcoMonedas}
                </Box>
              </Typography>
            </div>
        </div>
      )}
    </Container>
  );
}
