import React, { useEffect, useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import { Datum } from '../interfaces/FavoritesInterface'
import { createTokenSlice } from '../stores/tokenService'


  const useFavoritesPaginated = () => {
    const store = createTokenSlice(state => state)
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
    const clave = store.token
    const resp = await favoritosApi.get(favoritos, {
      headers: {
        Authorization: `Bearer ${clave}`
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
      const clave = store.token
      const resp = await favoritosApi.post(addFavorito, {}, {
        headers: {
          Authorization: `Bearer ${clave}`
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
