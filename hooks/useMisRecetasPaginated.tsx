import React, { useEffect, useState } from 'react'
import { misRecetasApi } from '../api/misRecetasApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/MisRecetasInterface'
import { createTokenSlice } from '../stores/tokenService'


  const useMisRecetasPaginated = () => {
    const store = createTokenSlice(state => state)
  const [isLoading, setIsLoading] = useState(true)
  const [simpleMisRecetasList, setSimpleMisRecetasList] = useState<Datum[]>([])
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  useEffect(() => {
    getMisRecetas()
  }, [])

  const getMisRecetas = async () => {
    setIsLoading(true);
    let misRecetas = "http://godeli.mooo.com:3000/api/v1/recipes/?user=me"
    
    const clave = store.token
    const resp = await misRecetasApi.get(misRecetas, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })
    if(resp.status !== 200) {
      setIsError(true)
    } else {
      setIsSuccess(true)
    }

    if(resp.data.data.length === 0){
        setIsLoading(true);
        return; 
    }else{
      const newMisRecetasList: Datum[] = resp.data.data.length.map(({ id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo }) => {
        return {
          id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo
        }
      });
      setSimpleMisRecetasList([...simpleMisRecetasList,...newMisRecetasList])
      setIsLoading(false)
      return newMisRecetasList;
    }
//    console.log(resp)
  }

  return{
    isLoading,
    simpleMisRecetasList,
    getMisRecetas,
    isError,
    isSuccess,
    setIsError,
    setIsSuccess,
  }
}

export default useMisRecetasPaginated
