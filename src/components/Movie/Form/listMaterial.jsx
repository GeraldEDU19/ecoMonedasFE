import { useEffect, useState } from "react";
// import MovieService from "../../services/MovieService";
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
import { AttachMoney, ColorLens, Info } from '@mui/icons-material'
// import papel from '../../../assets/papel.png'
// import plastico from '../../../assets/plastico.png'
// import vidrio from '../../../assets/vidrio.png'

export function ListMaterial() {
  //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
 const material= [{
  "MaterialID": "1",
  "Nombre": "Papel",
  "Descripcion": "Hoja delgada hecha con pasta de fibras vegetales obtenidas de trapos, madera, paja, etc., molidas, blanqueadas y desleídas en agua, que se hace secar y endurecer por procedimientos especiales.",
  "Imagen": "papel.png",
  "UnidadMedida": "pulgadas",
  "Color": "#C1BEF0",
  "Precio": "250"
      },
      {
        "MaterialID": "2",
        "Nombre": "Plastico",
        "Descripcion": " material constituido por compuestos orgánicos o sintéticos que tienen la propiedad de ser maleables y por tanto pueden ser moldeados en objetos sólidos de diversas formas. Esta propiedad confiere a los plásticos una gran variedad de aplicaciones.",
        "Imagen": "plastico.png",
        "UnidadMedida": "galga",
        "Color": "#BEDAF0",
        "Precio": "150"
  
      },
      {
        "MaterialID": "3",
        "Nombre": "Vidrio",
        "Descripcion": " material inorgánico duro, frágil, transparente y amorfo que se encuentra en la naturaleza, aunque también puede ser producido por el ser humano.",
        "Imagen": "vidrio.png",
        "UnidadMedida": "milimetros",
        "Color": "#16DBE7",
        "Precio": "150"
  
      },
  ]
  useEffect(()=>{
    setLoaded(true);
  
    // MovieService.getMovies()
    // .then( response=>{
    //   setData(response.data.results)
    //   console.log(response.data)
    //   setError(response.error)
    //   setLoaded(true)
    // }
    // ).catch( error=>{
    //   console.log(error)
    //   setError(error)
    //   throw new Error("Respuesta no válida del servidor")
    // }      
    // )
  },[])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
console.log(material[0].Imagen.papel);
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
  {material &&
    material.map((item) => (
      <Grid item xs={4} key={item.MaterialID}>
        <Card
          sx={{
            border: `4px dotted ${item.Color}`,
            borderRadius: '10px',
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,
              border: "2px solid black"
            }}
            style={{ textAlign: 'center' }}
            title={item.Nombre}
            subheader={item.Descripcion}
          />
          <CardContent>
            <img src={`/assets/${item.Imagen}`} alt="" width={'100%'} height={'100%'} />
            <Typography variant='body2' color='text.secondary'>
              <ColorLens /> {item.Color}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <AttachMoney /> {item.Precio}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              backgroundColor: (theme) => theme.palette.action.focus,
              color: (theme) => theme.palette.common.white,
            }}
          >
            <IconButton component={Link} to={`/movie/${item.MaterialID}`} aria-label='Detalle' sx={{ ml: 'auto' }}>
              <Info/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    ))}
</Grid>


  )
}