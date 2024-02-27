import { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import {Tag} from '../interfaces/FavoritesInterface'
import { createTokenSlice } from '../stores/tokenService'

  const useTags = () => {
    const store = createTokenSlice(state => state)
  const [isLoading, setIsLoading] = useState(true)
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const getTags = async () => {
    setIsLoading(true);
    let tags = "http://godeli.mooo.com:3000/api/v1/tags"
    const clave = store.token
    const resp = await favoritosApi.get(tags, {
      headers: {
        Authorization: `Bearer ${clave}`
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
