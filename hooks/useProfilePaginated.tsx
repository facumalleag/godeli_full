import { useEffect, useRef, useState } from 'react';
import { profileApi } from "../api/profileApi"
import { Datum } from '../interfaces/ProfileInterface';
import * as SecureStore from 'expo-secure-store'



const useProfilePaginated = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [foto, setFoto] = useState('')

  useEffect(() => {
    loadProfile()

  }, [])

  /* 
    useEffect(() => {
  
      loadProfile()
    }, []) */

  const nextPageUrl = useRef("http://godeli.mooo.com:3000/api/v1/users/me")

  const loadProfile = async () => {

    const clave = await SecureStore.getItemAsync('access_token');
    await profileApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    }).then(resp => {

      setNombre(resp.data.data[0].nombre)
      setEmail(resp.data.data[0].correo_electronico)
      setFoto(resp.data.data[0].url_imagen_perfil)
    }
    )
  }


  return {
    nombre, email, foto
  }


}

export default useProfilePaginated
