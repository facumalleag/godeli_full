import { useState } from 'react';
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { recipesApi } from '../api/recipesApi';
import { createTokenSlice } from '../stores/tokenService';

const useRecipeCreation = () => {
    const store = createTokenSlice(state => state)
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const createRecipe = async (datos, imagen) => {
        setLoading(true);
        const clave = store.token
        try {
            let data = new FormData();
            if (imagen) {
                imagen.newImages.forEach((img, index) => {
                    data.append(`file_${index}`, { name: `image_${index}.jpg`, type: 'image/jpeg', uri: img.uri });
                });
            }
            
            data.append('data', datos);
            console.log('data: ', data)
            console.log('images: ', imagen)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://godeli.mooo.com:3000/api/v1/recipes',

                headers: {
                    'Authorization': `Bearer ${clave}`,
                    'Accept': '*/*',
                    'Host': 'http://godeli.mooo.com:3000/api/v1/recipes',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'multipart/form-data;',
                  },
                data: data
            };
            return axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setIsSuccess(true)
                    return true;
                })
                .catch((error) => {
                    setIsError(true)
                    console.log(error);
                    return false;
                });
        } catch (error) {
            console.log(error);
        }
    };
    const editRecipe = async (datos, imagen, id) => {
        const newDatos = JSON.stringify({...datos, ingredients: datos.ingredientes})
        setLoading(true);
        const clave = store.token
        try {
            let data = new FormData();
            if (imagen) {
                imagen.newImages.forEach((img, index) => {
                    data.append(`file_${index}`, { name: `image_${index}.jpg`, type: 'image/jpeg', uri: img.uri ? img.uri : img.url });
                  });
            }

            data.append('data', newDatos)
            console.log('data edit: ', data)
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://godeli.mooo.com:3000/api/v1/recipes/' + id,
                headers: {
                    'Authorization': `Bearer ${clave}`,
                    'Accept': '*/*',
                    'Host': 'http://godeli.mooo.com:3000/api/v1/recipes',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'multipart/form-data;',
                  },
                data: data
            };
            return axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setIsSuccess(true)
                    return true;
                })
                .catch((error) => {
                    setIsError(true)
                    console.log(error);
                    return false;
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecipeImage = async (idRecipe, idImage) => {
        console.log('deleteImage: ', idImage, idRecipe)
        setLoading(true);
        const clave = store.token
        try {
            const deteleImageRecipe = `http://godeli.mooo.com:3000/api/v1/recipes/${idRecipe}/image/${idImage}`
            const resp = await recipesApi.delete(deteleImageRecipe, {
                headers: {
                Authorization: `Bearer ${clave}`
                }
            })
            if(resp.status === 200) {
                return setIsSuccess(true)
            } else {
                setIsError(true)
            }
        } catch (error) {
            setIsError(true)
            console.log('error al eliminar la imagen: ', error);
        }
    }

    return { createRecipe, editRecipe, loading, isError, isSuccess, deleteRecipeImage };
};

export default useRecipeCreation;
