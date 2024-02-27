import { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import {Tag} from '../interfaces/FavoritesInterface'

  const useTags = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const getTags = async () => {
    setIsLoading(true);
    let tags = "http://godeli.mooo.com:3000/api/v1/tags"
    
    // const clave = await SecureStoreSecureStore.getItemAsync('access_token');
    const resp = await favoritosApi.get(tags, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODk5NzMwMjIzNiwiZXhwIjoxNzA5MDAwOTAyMjM2fQ.qUrCi4QS460MNZ0D1H9Rq7k7sPGrodzfcFqIzRW4LpQ`
      }
    })
    if(resp.status === 200) {
      setIsSuccess(true)
    } else {
      setIsError(true)
    }

    if(resp.data.data.length === 0){
        setIsLoading(false);
        return; 
    }else{
        setAllTags(resp.data.data)
    }
  }

  return{
    isLoading,
    getTags,
    allTags,
    isError,
    isSuccess
  }
}

export default useTags
