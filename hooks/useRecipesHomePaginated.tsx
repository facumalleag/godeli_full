import React, { useEffect, useRef, useState } from 'react'
import { recipesApi } from '../api/recipesApi'
import { Datum, SimpleRecipe } from '../interfaces/RecipesHomeInterface';
import * as SecureStore from 'expo-secure-store'


const useRecipesHomePaginated = () => {
const [isLoading, setIsLoading] = useState(true)
  const [simpleRecipesList, setSimpleRecipesList] = useState<SimpleRecipe[]>([])

  useEffect(() => {
    getRecipes()
  }, [])

  const nextPageUrl = useRef("http://godeli.mooo.com:3000/api/v1/recipes?limit=20&puntaje=5")

  const getRecipes = async () => {
    setIsLoading(true);
    
    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesApi.get(nextPageUrl.current, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })
    mapSimpleRecipeList(resp.data.data)

  }

  const mapSimpleRecipeList = (recipesList: Datum[]) => {
    const newRecipeList: SimpleRecipe[] = recipesList.map(({ id_receta, titulo, imagen, nombre, puntaje }) => {
      /*  const id=id_receta;
       const titulo_receta=titulo;
       const foto=imagen;
       const ranking=puntaje;
       const name=nombre; */

      return {
        // name,ranking,foto,titulo_receta,id
        id_receta, titulo, imagen, nombre, puntaje
      }
    });
    setSimpleRecipesList([...newRecipeList])
    setIsLoading(false)
    // recipesList.forEach(recipe=> console.log(recipe.imagen)) 

  }

  return{
    isLoading,
    simpleRecipesList,
    getRecipes
  }
}

export default useRecipesHomePaginated
