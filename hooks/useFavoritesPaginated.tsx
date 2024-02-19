import React, { useEffect, useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/FavoritesInterface'


  const useFavoritesPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simpleFavoriteList, setSimpleFavoriteList] = useState<Datum[]>([])
  
  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    setIsLoading(true);
    let favoritos = "http://godeli.mooo.com:3000/api/v1/favorites"
    
    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await favoritosApi.get(favoritos, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })

    if(resp.data.data.length === 0){
        setIsLoading(true);
        return; 
    }else{
      mapSimplefavoriteList(resp.data.data)
      //setPage(page + 15);
    }
//    console.log(resp)
  }

  const mapSimplefavoriteList = (favoriteList: Datum[]) => {
    const newFavoriteList: Datum[] = favoriteList.map(({ id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo }) => {
      return {
        id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo
      }
    });
    setSimpleFavoriteList([...newFavoriteList])
    setIsLoading(false)
  }

  return{
    isLoading,
    simpleFavoriteList,
    getFavorites
  }
}

export default useFavoritesPaginated
