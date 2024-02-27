import React, { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'


  const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ingredients, setIngredients] = useState([])

  const getIngredients = async (desc: string) => {
    try {
      setIsLoading(true);
      let getIngredients = "http://godeli.mooo.com:3000/api/v1/ingredients?limit=500&offset=2&descripcion=" + desc
      // const clave = await SecureStore.getItemAsync('access_token');
      const resp = await favoritosApi.get(getIngredients, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
        }
      })
      if(resp.data.data.length > 0) {
        setIngredients(resp.data.data)
      }
      if(resp.status === 200){
        setIsSuccess(true)
        setIsLoading(false);
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
    getIngredients,
    isError,
    isSuccess,
    setIsError,
    setIsSuccess,
    ingredients
  }
}

export default useIngredients
