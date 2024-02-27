import { useEffect, useRef, useState } from 'react';
import { profileApi } from "../api/profileApi"
import { Datum } from '../interfaces/ProfileInterface';
import * as SecureStore from 'expo-secure-store'
import { createTokenSlice } from '../stores/tokenService';



const useProfilePaginated = () => {
  const store = createTokenSlice(state => state)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [foto, setFoto] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    loadProfile()

  }, [])

  /* 
    useEffect(() => {
  
      loadProfile()
    }, []) */

  const nextPageUrl = useRef("http://godeli.mooo.com:3000/api/v1/users/me")

  const loadProfile = async () => {

    const clave = store.token
    await profileApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    }).then(resp => {
      setIsSuccess(true)
      setNombre(resp.data.data[0].nombre)
      setEmail(resp.data.data[0].correo_electronico)
      setFoto(resp.data.data[0].url_imagen_perfil)
    }
    ).catch(() => {
        setIsError(true)
      }
    )
  }


  return {
    nombre, email, foto, isError, isSuccess, setIsError, setIsSuccess
  }


}

export default useProfilePaginated
