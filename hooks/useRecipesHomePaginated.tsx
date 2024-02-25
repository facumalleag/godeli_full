import React, { useEffect, useRef, useState } from 'react'
import { recipesApi } from '../api/recipesApi'
import { Datum, SimpleRecipe } from '../interfaces/RecipesHomeInterface';
import * as SecureStore from 'expo-secure-store'


  const useRecipesHomePaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simpleRecipesList, setSimpleRecipesList] = useState<SimpleRecipe[]>([])
  const [page, setPage] = useState(0);
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    setIsLoading(true);
    let recetas = "http://godeli.mooo.com:3000/api/v1/recipes?limit=15&offset="+page;
    
    const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesApi.get(recetas, {
      headers: {
        Authorization: `Bearer ${clave}`
      }
    })
    if(resp.status !== 200) {
      setIsError(true)
    }

    if(resp.data.data.length === 0){
        console.log('No hay más recetas');
        setIsLoading(true);
        return; 
    }else{
      mapSimpleRecipeList(resp.data.data)
      setPage(page + 15);
    }
  }

  const getFilterRecipes = async ( tags: Array<string>) => {
    setIsLoading(true);
    try {
      // const joinScores = scores.join(',')
      const joinTags = tags.join(',')
      const filterRecipes = `http://godeli.mooo.com:3000/api/v1/recipes?limit=10&puntaje=3&tags=${joinTags.replace(' ', '')}`
      const clave = await SecureStore.getItemAsync('access_token');
      const resp = await recipesApi.get(filterRecipes, {
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
        console.log('No hay recetas filtradas');
        setIsLoading(true);
        return; 
    }else{
      setSimpleRecipesList(resp.data.data)
    }
    } catch(error) {
      setIsError(true)
      console.log('error al filtrar recetas: ', error)
      setIsLoading(false)
    }
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
    setSimpleRecipesList([...simpleRecipesList,...newRecipeList])
    setIsLoading(false)
    // recipesList.forEach(recipe=> console.log(recipe.imagen)) 

  }

  return{
    isLoading,
    simpleRecipesList,
    getRecipes,
    getFilterRecipes,
    isError,
    isSuccess,
    setIsError
  }
}

export default useRecipesHomePaginated
