import { useState } from 'react'
import { favoritosApi } from '../api/favoritosApi'
import * as SecureStore from 'expo-secure-store'
import {Tag} from '../interfaces/FavoritesInterface'

  const useTags = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [allTags, setAllTags] = useState<Tag[]>([])

  const getTags = async () => {
    setIsLoading(true);
    let tags = "http://godeli.mooo.com:3000/api/v1/tags"
    
    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await favoritosApi.get(tags, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })

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
    allTags
  }
}

export default useTags
