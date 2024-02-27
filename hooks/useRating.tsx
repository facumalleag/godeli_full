import React, { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'


  const useRating = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addRating = async (id, rating) => {
    try {
      setIsLoading(true);
      let addRating = "http://godeli.mooo.com:3000/api/v1/ratings"
      // const clave = await SecureStore.getItemAsync('access_token');
      const resp = await favoritosApi.post(addRating, {
        id_recipe: id, rating
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
        }
      })
      console.log(resp.status)
      if(resp.status === 200){
        setIsSuccess(true)
        setIsLoading(false);
        return; 
      }else{
        setIsError(true)
        console.log('error al agregar un rating')
      }
    } catch(error) {
      console.log('error al intentar agregar un rating: ', error)
    }
  }



  return{
    isLoading,
    addRating,
    isError,
    isSuccess,
    setIsError,
    setIsSuccess
  }
}

export default useRating
