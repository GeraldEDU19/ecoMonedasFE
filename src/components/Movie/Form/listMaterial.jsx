import { useEffect, useState } from "react";
import MovieService from "../../services/MovieService";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import AccessTime from '@mui/icons-material/AccessTime'
import Language from '@mui/icons-material/Language'
import { Link } from "react-router-dom";
import { Info } from '@mui/icons-material'
import papel from '../../assets/papel.png'
export function ListMaterial() {
  //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener la lista de peliculas
    const material= [{
"MaterialID": "1",
"Nombre": "Papel",
"descripcion": "Hoja delgada hecha con pasta de fibras vegetales obtenidas de trapos, madera, paja, etc., molidas, blanqueadas y desleídas en agua, que se hace secar y endurecer por procedimientos especiales.",
"Imagen": {papel},
"UnidadMedida": "pulgadas",
"Color": "blanco",
"Precio": "250"
    },
]
    MovieService.getMovies()
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
    }      
    )
  },[])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>     
     {data && data.map((item)=>(  
          <Grid item xs={4} key={item.id}   >
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title={item.title}
                subheader={item.year}
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  <AccessTime /> {item.time}   minutos
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <Language /> {item.lang}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <IconButton component={Link} to={`/movie/${item.id}`} aria-label='Detalle' sx={{ ml: 'auto' }}>
                  <Info/>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
       ))}
    </Grid>
  )
}