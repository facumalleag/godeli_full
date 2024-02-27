import React, { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import { createTokenSlice } from '../stores/tokenService'


  const useIngredients = () => {
    const store = createTokenSlice(state => state)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ingredients, setIngredients] = useState([])

  const getIngredients = async (desc: string) => {
    try {
      setIsLoading(true);
      let getIngredients = "http://godeli.mooo.com:3000/api/v1/ingredients?limit=500&offset=2&descripcion=" + desc
      const clave = store.token
      const resp = await favoritosApi.get(getIngredients, {
        headers: {
          Authorization: `Bearer ${clave}`
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
