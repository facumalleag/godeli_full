import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { crearRecetaApi } from '../api/crearMiRecetaApi';
import { CreateRecipePaginatedPost } from '../interfaces/CreateRecipeInterface';
import axios, { AxiosHeaders } from 'axios';


const usePostMisRecetaPaginated = (/* formData,jsonData */) => {

   
    const [isLoading, setIsLoading] = useState(true)
    const data = {
        description:"sarasa"
      }

   const formData = new FormData();
    //formData.append('file',"SAAS");
    const jsonData = {
        "titulo": "solo json",
        "descripcion": "Si viajamos a Italia, hay 3 cosas que probar lógicamente, una buena pizza, una deliciosa pasta y un cremoso risotto. Hoy vamos a preparar un risotto de setas, una de las recetas top de la gastronomía italiana.",
        "preparacion": "1.- Comenzamos pochando a fuego suave la cebolla y el ajo. Picados finamente hasta que se hagan.\r\n\r\n2.- Pasados unos 15 minutos agregamos las setas cortadas. Yo lo que hago es cortar una parte en trozos pequeños y otra en tiras, simplemente para que quede más vistoso.\r\n\r\n3.- Cuando tengamos hechas las setas, agregamos el arroz para anacararlos y que absorba todos los sabores.\r\n\r\n4.- Incorporamos la copa de vino blanco y dejamos que se evapore el alcohol.\r\n\r\n5.- Ahora llega el momento clave, ponemos el caldo de pollo o verduras en un cazo a calentar, también podemos usar agua caliente pero prefiero mil veces caldo.",
        "youtube": null,
        "tiempo_preparacion": 50,
        "rendimiento": 3,
        "calorias": 1500,
        "proteinas": 45,
        "grasas": 50,
        "ingredientes": [
            {
                "id_ingrediente": 7,
                "cantidad": 2,
                "id_unidad" : 1
            },
            {
                "id_ingrediente": 8,
                "cantidad": 4,
                "id_unidad" : 2
            },
            {
                "id_ingrediente": 9,
                "cantidad": 5,
                "id_unidad" : 1
            },
            {
                "id_ingrediente": 10,
                "cantidad": 7,
                "id_unidad" : 3
            },
            {
                "id_ingrediente": 11,
                "cantidad": 8,
                "id_unidad" : 1
            }
        ],
        "tags": [
            {
                "id_tag": 1
            },
            {
                "id_tag": 2
            },
            {
                "id_tag": 3
            }
        ]
    }
    ;
    formData.append('data', JSON.stringify(jsonData), { contentType: 'application/json' });


    useEffect(() => {
        postRecipes()
    }, []) 
   

    const postRecipes = async () => {

       /*  axios({
            method: "POST",
            url: "http://godeli.mooo.com:3000/api/v1/ingredients/dummy",
            data: formData,
            headers: { 'Content-Type':'Multipart/Form-Data', }
          })
            .then(function (response) {
              //handle success
              console.log(" Primero "+JSON.stringify(response.data));
            })
            .catch(function (response) {
              //handle error
              console.log(" segundo "+response);
            });
            
      
        setIsLoading(false); */
        const clave = await SecureStore.getItemAsync('access_token');
        
        axios({
            method: "POST",
            url: "http://godeli.mooo.com:3000/api/v1/recipes",
            data: formData,
            headers: { 
            Authorization: `Bearer ${clave}`,
            'Content-Type':'Multipart/Form-Data',
          }}
          )
            .then(function (response) {
              //handle success
              console.log(" Primero "+JSON.stringify(response.data));
            })
            .catch(function (response) {
              //handle error
              console.log(" segundo "+response);
            });
      
        setIsLoading(false);

    }
    

    return {

    }
}

export default usePostMisRecetaPaginated
