import { useEffect, useRef, useState } from 'react';
import { profileApi } from "../api/profileApi"
import { Datum } from '../interfaces/ProfileInterface';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcwODE5MTk1ODA2MiwiZXhwIjoxNzA4MTk1NTU4MDYyfQ.Xx87jCrm80t1p-zHSKwZKNvEt_CUfm-VytN0zoiXMkw"



const useProfilePaginated = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [foto, setFoto ]= useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  //const url="https://jsonplaceholder.typicode.com/posts"
  const nextPageUrl = useRef("http://18.224.38.52:3000/api/v1/users/me")

  const loadProfile = async () => {
   await profileApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp =>{
      
      setEmail(resp.data.data[0].correo_electronico)
      setFoto(resp.data.data[0].url_imagen_perfil)
      setNombre(resp.data.data[0].nombre)
    }
    )
    //mapProfile(resp.data.data)
  }

  const mapProfile= (resp:Datum[]) =>{
    setEmail(resp[0].correo_electronico)
    setFoto(resp[0].url_imagen_perfil)
    setNombre(resp[0].nombre)

  }

  return{
    nombre,email,foto
  }


}

export default useProfilePaginated
