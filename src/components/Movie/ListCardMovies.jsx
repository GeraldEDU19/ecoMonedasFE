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
import PropTypes from 'prop-types';


export function ListCardMovies ({data}) {
  
  
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>     
     
          <Grid item xs={4}   >
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title=''
                subheader=''
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  <AccessTime />    minutos
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <Language /> 
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <IconButton component={Link} to={`/movie/`} aria-label='Detalle' sx={{ ml: 'auto' }}>
                  <Info/>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
      ))   
    </Grid>
  )
}
