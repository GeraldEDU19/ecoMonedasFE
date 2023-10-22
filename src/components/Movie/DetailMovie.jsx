import Container from '@mui/material/Container';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';
  import List from '@mui/material/List';
  import ListItemText from '@mui/material/ListItemText';
  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import MovieService from '../../services/MovieService';
  import StarIcon from '@mui/icons-material/Star';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemButton from '@mui/material/ListItemButton';
  import ArrowRightIcon from '@mui/icons-material/ArrowRight';
  import { Grid } from '@mui/material';
  import ticket from '../../assets/ticket.jpg'
import { ArrowRightAlt } from '@mui/icons-material';

  export function DetailMovie() {
    const routeParams = useParams()
    console.log(routeParams)

      //Resultado de consumo del API, respuesta
  const [data,setData]=useState(null);
  //Error del API
  const [error,setError]=useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded,setLoaded]=useState(false);  

  useEffect(()=>{
    MovieService.getMovieById(routeParams.id)
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
            alt="Ticket pelicula"
            src={ticket}/>  
              
            </Grid>
            <Grid item={true} xs={7}>
              
                <Typography variant='h4' component='h1' gutterBottom>
                {data.title}
                </Typography>
                <Typography variant='subtitle1' component='h1' gutterBottom>
                {data.year}
                </Typography>
                <Typography component='span' variant='subtitle1' display='block'>
                  <Box fontWeight='bold' display='inline'>
                    Tiempo: {data.time}
                  </Box>{' '}
                  minutos
                </Typography>
                <Typography component='span' variant='subtitle1' display='block'>
                  <Box fontWeight='bold' display='inline'>
                    Idioma: 
                  </Box>{' '}
                  {data.lang}
                </Typography>
                <Typography component='span' variant='subtitle1' display='block'>
                  <Box fontWeight='bold' display='inline'>
                    Director: 
                  </Box>{' '}
                  {data.director.fname} {data.director.lname}
                </Typography>
                <Typography component='span' variant='subtitle1'>
                  <Box fontWeight='bold'>Generos:</Box>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {data.genres.map((item)=>(
                      <ListItemButton key= {item.id}>
                        <ListItemIcon>
                         <ArrowRightIcon/>
                         </ListItemIcon>
                         <ListItemText primary={item.title}/>
                      </ListItemButton>
                    ))}
                  </List>
                </Typography>
                <Typography component='span' variant='subtitle1'>
                  <Box fontWeight='bold'>Actores:</Box>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {data.actors.map((item)=>(
                      <ListItemButton key= {item.id}>
                        <ListItemIcon>
                         <ArrowRightIcon/>
                         </ListItemIcon>
                         <ListItemText primary={'${item.fname} ${item.lname}'}/>
                      </ListItemButton>
                    ))}
                  </List>
                </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }