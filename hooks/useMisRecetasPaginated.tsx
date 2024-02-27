import React, { useEffect, useState } from 'react'
import { misRecetasApi } from '../api/misRecetasApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/MisRecetasInterface'


  const useMisRecetasPaginated = () => {
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
    
    // const clave = await SecureStore.getItemAsync('access_token');
    const resp = await misRecetasApi.get(misRecetas, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
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
      mapMisRecetasList(resp.data.data)
      //setPage(page + 15);
    }
//    console.log(resp)
  }

  const mapMisRecetasList = (misRecetasList: Datum[]) => {
    const newMisRecetasList: Datum[] = misRecetasList.map(({ id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo }) => {
      return {
        id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo
      }
    });
    setSimpleMisRecetasList([...simpleMisRecetasList,...newMisRecetasList])
    setIsLoading(false)
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
