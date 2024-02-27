import React, { useEffect, useRef, useState } from 'react'
import { recipesFullApi } from '../api/recipesFullApi'
import * as SecureStore from 'expo-secure-store'
import { Ingrediente } from '../interfaces/RecipesInterface';
import { createTokenSlice } from '../stores/tokenService';



const useRecipesPaginated = (id) => {
  const store = createTokenSlice(state => state)
const [isLoading, setIsLoading] = useState(true)

  const [calorias, setCalorias] = useState('')
  const [youtube, setYoutube] = useState('')
  const [tiempo_preparacion, setTiempo_preparacion] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [rendimiento, setrendimiento] = useState('')
  const [grasas, setGrasas] = useState('')
  const [proteinas, setProteinas] = useState('')
  const [preparacion, setPreparacion] = useState('')
  const [ingredientes, setIngredientes] = useState([])
  const [imagenes, setImagenes] = useState([])
  const [titulo, setTitulo] = useState('')
  const [puntaje, setPuntaje] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  

  useEffect(() => {
    getRecipes()
  }, [])

  const nextPageUrl = useRef(`http://godeli.mooo.com:3000/api/v1/recipes/${id}`)

  const getRecipes = async () => {
    setIsLoading(true);

    const clave = store.token
    const resp = await recipesFullApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
      
    })

    if(resp.status === 200) {
      setIsSuccess(true)
    } else {
      setIsError(true)
    }
    setTitulo(resp.data.data[0].titulo)
    setCalorias(resp.data.data[0].calorias)
    setYoutube(resp.data.data[0].youtube)
    setTiempo_preparacion(resp.data.data[0].tiempo_preparacion)
    setDescripcion(resp.data.data[0].descripcion)
    setrendimiento(resp.data.data[0].rendimiento)
    setGrasas(resp.data.data[0].grasas)
    setProteinas(resp.data.data[0].proteinas)
    setPreparacion(resp.data.data[0].preparacion)
    setIngredientes(resp.data.data[0].ingredientes)
    setImagenes(resp.data.data[0].imagenes)
    setPuntaje(resp.data.data[0].puntaje)

    setIsLoading(false);
  }
 
  return {
    isLoading,
    calorias,
    youtube,
    tiempo_preparacion,
    descripcion,
    rendimiento,
    grasas,
    proteinas,
    preparacion,
    ingredientes,
    titulo,
    imagenes,
    puntaje,
    isError,
    isSuccess
  }
}

export default useRecipesPaginated
