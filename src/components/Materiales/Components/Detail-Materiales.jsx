import Container from '@mui/material/Container';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';

  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';

  import { CardContent, Grid } from '@mui/material';


import ServiceMateriales from "../Services/Service-Materiales";

  export function DetailMateriales() {
    const routeParams = useParams()
    console.log(routeParams)

      //Resultado de consumo del API, respuesta
  const [data,setData]=useState(null);
  //Error del API
  const [error,setError]=useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded,setLoaded]=useState(false);  

  useEffect(()=>{
    ServiceMateriales.getMaterialById(routeParams.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    })


  }, [routeParams.id])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
    return (
      <Container component='main' sx={{ mt: 8, mb: 2 }} >
      {data && ( 
          <Grid container spacing={2}>
            
            <Grid item={true} xs={5} >  
            <Box component='img'
            sx={{
              borderRadius:'4%',
              maxWidth:'100%',
              height: 'auto',
            }}
            alt="Detalle Material"
            />  
              
            </Grid>
            <Grid item={true} xs={7}>
              
                <Typography variant='h4' component='h1' gutterBottom>
                {data.Nombre}
                </Typography>
                <Typography variant='subtitle1' component='h1' gutterBottom>
                {data.Descripcion}
                <CardContent>
                <img
                  src={`/assets/${data.Imagen}`}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </CardContent>
                </Typography>
                <Typography component='span' variant='subtitle1' display='block'>
                  <Box fontWeight='bold' display='inline'>
                    Unidad de medida: {data.UnidadMedida}
                  </Box>{' '}
             
                </Typography>
                <Typography component='span' variant='subtitle1' display='block'>
                  <Box fontWeight='bold' display='inline'>
                    Precio: 
                  </Box>{' '}
                  {data.Precio}
                </Typography>
             
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }