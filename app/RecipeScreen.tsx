import { router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Button, Text, View } from 'react-native'
import useRecipesPaginated from '../hooks/useRecipesPaginated';

const RecipeScreen = () => {
    const { id} = useLocalSearchParams()
    const { calorias,descripcion,grasas,imagenes,ingredientes,preparacion,proteinas,rendimiento,tiempo_preparacion,youtube}=useRecipesPaginated(id)

    return (
        <View>
            <Button title="Go back" onPress={() => router.back()} />
            <Text
            >Hola Screen + {descripcion}</Text>

        </View>
    )
}

export default RecipeScreen
