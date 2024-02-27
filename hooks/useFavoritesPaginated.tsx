import React, { useEffect, useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/FavoritesInterface'


  const useFavoritesPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simpleFavoriteList, setSimpleFavoriteList] = useState<Datum[]>([])
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    setIsLoading(true);
    let favoritos = "http://godeli.mooo.com:3000/api/v1/favorites"
    // const clave = await SecureStore.getItemAsync('access_token');
    const resp = await favoritosApi.get(favoritos, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
      }
    })

    if(resp.status !== 200) {
      setIsError(true)
    }
    if(resp.data.data.length === 0){
        setIsLoading(false);
        return; 
    }else{
      mapSimplefavoriteList(resp.data.data)
      //setPage(page + 15);
    }
//    console.log(resp)
  }

  const addFavorite = async (id) => {
    try {
      setIsLoading(true);
      let addFavorito = "http://godeli.mooo.com:3000/api/v1/favorites/" + id
      // const clave = await SecureStore.getItemAsync('access_token');
      const resp = await favoritosApi.post(addFavorito, {}, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
        }
      })
      console.log(resp.status)
      if(resp.status === 200){
          setIsLoading(false);
          setIsSuccess(true)
          return; 
      }else{
        setIsError(true)
        console.log('error al agregar un favorito')
      }
    } catch(error) {
      setIsError(true)
      console.log('error al intentar agregar un favorito: ', error)
    }
  }

  const mapSimplefavoriteList = (favoriteList: Datum[]) => {
    const newFavoriteList: Datum[] = favoriteList.map(({ id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo }) => {
      return {
        id_receta,nombre,imagen,puntaje,tiempo_preparacion,titulo
      }
    });
    setSimpleFavoriteList([...simpleFavoriteList,...newFavoriteList])
    setIsLoading(false)
  }

  return{
    isLoading,
    simpleFavoriteList,
    getFavorites,
    addFavorite,
    isError,
    isSuccess,
    setIsError,
    setIsSuccess
  }
}

export default useFavoritesPaginated
