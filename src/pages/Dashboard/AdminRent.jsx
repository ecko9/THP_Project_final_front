import React from 'react'
import {Grid} from '@mui/material'
import { Typography } from '@mui/material'
import APIManager from 'services/Api'
import RentedList from './RentedList'
import { setSnackbar } from 'store/snackbar/actions';
import { useDispatch } from 'react-redux'

const AdminRent = () => {
  const [rented, setRented] = React.useState()
  const [wishlist, setWishlist] = React.useState()
  const dispatch = useDispatch()

  React.useEffect(
    () => {
      const fetchRents = async  () => {
        const response = await APIManager.getRentsAdmin()
        if(response.error){
          dispatch(setSnackbar(true, "error", response.error))
        } else {
          setRented(response.rented)
          setWishlist(response.wishlist)
        }
      }
      fetchRents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []

  )

  return (
    <>
    <Grid container width={"100%"}>
      <Grid item md={12}>
        <Typography variant="h2" align="center">Locations en cours</Typography>
        <RentedList rented={rented}/>
      </Grid>
      <Grid item md={12}>
      <Typography variant="h2" align="center"> 
        Locations à Livrer
      </Typography>
        <RentedList rented={wishlist}/>
      </Grid>
    </Grid>

  
    </>
  )  
}

export default AdminRent