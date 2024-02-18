import React, { useEffect, useRef, useState } from 'react'
import { recipesFullApi } from '../api/recipesFullApi'
import { Datum, SimpleRecipe } from '../interfaces/RecipesHomeInterface';
import * as SecureStore from 'expo-secure-store'
import { RecetaFull, Ingrediente } from '../interfaces/RecipesInterface';



const useRecipesPaginated = (id) => {
const [isLoading, setIsLoading] = useState(true)

  const [calorias, setCalorias] = useState('')
  const [youtube, setYoutube] = useState('')
  const [tiempo_preparacion, setTiempo_preparacion] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [rendimiento, setrendimiento] = useState('')
  const [grasas, setGrasas] = useState('')
  const [proteinas, setProteinas] = useState('')
  const [preparacion, setPreparacion] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [imagenes, setImagenes] = useState('')

  useEffect(() => {
    getRecipes()
  }, [])

  const nextPageUrl = useRef(`http://godeli.mooo.com:3000/api/v1/recipes/${id}`)

  const getRecipes = async () => {
    setIsLoading(true);

    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesFullApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
      
    })
   // console.log(resp.data.data[0].ingredientes)
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
    imagenes,
  }
}

export default useRecipesPaginated
