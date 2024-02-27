import React, { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import { createTokenSlice } from '../stores/tokenService'


  const useRating = () => {
    const store = createTokenSlice(state => state)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addRating = async (id, rating) => {
    try {
      setIsLoading(true);
      let addRating = "http://godeli.mooo.com:3000/api/v1/ratings"
      const clave = store.token
      const resp = await favoritosApi.post(addRating, {
        id_recipe: id, rating
      }, {
        headers: {
          Authorization: `Bearer ${clave}`
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
