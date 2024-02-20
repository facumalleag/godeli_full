import React, { useEffect, useState } from 'react'
import { misRecetasApi } from '../api/misRecetasApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/MisRecetasInterface'


  const useMisRecetasPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simpleMisRecetasList, setSimpleMisRecetasList] = useState<Datum[]>([])
  
  useEffect(() => {
    getMisRecetas()
  }, [])

  const getMisRecetas = async () => {
    setIsLoading(true);
    let misRecetas = "http://godeli.mooo.com:3000/api/v1//recipes/?user=me"
    
    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await misRecetasApi.get(misRecetas, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })

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
    setSimpleMisRecetasList([...newMisRecetasList])
    setIsLoading(false)
  }

  return{
    isLoading,
    simpleMisRecetasList,
    getMisRecetas
  }
}

export default useMisRecetasPaginated