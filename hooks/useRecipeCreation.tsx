import { useState } from 'react';
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

const useRecipeCreation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createRecipe = async (datos, imagen) => {
        setLoading(true);
        setError(null);


        const clave = await SecureStore.getItemAsync('access_token');


        console.log('useRecipe');
        try {
            let data = new FormData();
            if (imagen) {
                imagen.newImages.forEach((img, index) => {
                    data.append(`file_${index}`, { name: `image_${index}.jpg`, type: 'image/jpeg', uri: img.uri });
                  });
            }

            data.append('data', datos);
            console.log(data)
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
                    alert('Receta agregada correctamente');
                    return true;
                })
                .catch((error) => {
                    alert("Error al subir la receta");
                    console.log(error);
                    return false;
                });
        } catch (error) {
            console.log(error);
        }
    };

    return { createRecipe, loading, error };
};

export default useRecipeCreation;
