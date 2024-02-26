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
  const [isFilterEmpty, setIsFilterEmpty] = useState(false)
  
  useEffect(() => {
    getFirstRecipes()
  }, [])

  const getFirstRecipes = async () => {
    setIsLoading(true);
    let recetas = "http://godeli.mooo.com:3000/api/v1/recipes?limit=15";
    
    //const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesApi.get(recetas, {
      // headers: {
      //   Authorization: `Bearer ${clave}`
      // }
    })
    if(resp.status !== 200) {
      setIsError(true)
    }

    if(resp.data.data.length === 0){
      console.log('No hay primeras recetas');
      setIsLoading(true);
    }else{
      console.log('Primeras recetas');
      const newRecipeList: SimpleRecipe[] = resp.data.data.map(({ id_receta, titulo, imagen, nombre, puntaje }) => {
        return {
          id_receta, titulo, imagen, nombre, puntaje
        }
      });
      setIsLoading(false)
      setPage(page + 15)
      setSimpleRecipesList(newRecipeList)
      return newRecipeList
    }
  }
  const getRecipes = async () => {
    setIsLoading(true);
    let recetas = "http://godeli.mooo.com:3000/api/v1/recipes?limit=15&offset="+page;
    
   // const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesApi.get(recetas, {
      // headers: {
      //   Authorization: `Bearer ${clave}`
      // }
    })
    if(resp.status !== 200) {
      setIsError(true)
      return;
    }
    if(resp.data.data.length === 0){
        console.log('No hay más recetas');
        setIsLoading(true);
        return; 
    }else{
      setIsFilterEmpty(false)
      setPage(page + 15);
      const moreRecipeList: SimpleRecipe[] = resp.data.data.map(({ id_receta, titulo, imagen, nombre, puntaje }) => {
        return {
          id_receta, titulo, imagen, nombre, puntaje
        }
      });
      setIsLoading(false)
      setSimpleRecipesList([...simpleRecipesList, ...moreRecipeList])
      return simpleRecipesList
    }
  }

  const filterRecipesByParams = async (title, description, ingredient) => {
    setIsLoading(true);
    let misRecetas = `http://godeli.mooo.com:3000/api/v1/recipes?title=${title}&ingrediente=${ingredient}&descripcion=${description}`
    // const clave = await SecureStore.getItemAsync('access_token');
    const resp = await recipesApi.get(misRecetas, {
      // headers: {
      //   Authorization: `Bearer ${clave}`
      // }
    })
    if(resp.status !== 200) {
      setIsError(true)
    } else {
      setIsSuccess(true)
    }

    if(resp.data.data.length === 0){
      setIsFilterEmpty(true);
      return []
    }else{
      setIsFilterEmpty(false);
      const newRecipeList: SimpleRecipe[] = resp.data.data.map(({ id_receta, titulo, imagen, nombre, puntaje }) => {
        return {
          id_receta, titulo, imagen, nombre, puntaje
        }
      });
      setIsLoading(false)
      return newRecipeList
    }
  }

  const getFilterRecipes = async (tags: Array<string>) => {
    setIsLoading(true);
    try {
      const joinTags = tags.join(',');
      const filterRecipes = `http://godeli.mooo.com:3000/api/v1/recipes?limit=10&tags=${joinTags.replace(' ', '')}`;
      const clave = await SecureStore.getItemAsync('access_token');
      const resp = await recipesApi.get(filterRecipes, {
        // headers: {
        //   Authorization: `Bearer ${clave}`
        // }
      });
      if (resp.status === 200) {
        setIsSuccess(true);
        return resp.data.data;
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return{
    isLoading,
    getFirstRecipes,
    getRecipes,
    getFilterRecipes,
    isError,
    isSuccess,
    setIsError,
    filterRecipesByParams,
    isFilterEmpty
  }
}

export default useRecipesHomePaginated
