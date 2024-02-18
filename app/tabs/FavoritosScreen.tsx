import React from 'react'
import { FlatList, Text, View } from 'react-native'
import RecetaItemGuardada from '../../components/RecetaItemGuardada'
import { guardadoStyle } from '../../theme/RecetasGuardadasStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { FadeInImage } from '../../components/FadeImage';


const FavoritosScreen = () => {
  const { foto } = useProfilePaginated()
  return (
    
    <View
    style={
      guardadoStyle.container}>
    <View style={
      guardadoStyle.globalMargin
    }>
      <View style={{}}>
      <Link href='/ProfileScreen' style={guardadoStyle.profileStyle}>
            <FadeInImage
              uri={foto}
              style={{
                height: 50,
                width: 50,
                borderRadius:55
              }}
            />
          </Link>
        <Text style={guardadoStyle.title}>Recetas Guardadas</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          { key: '1', name: 'Nicolas' },
          { key: '2', name: 'Rover plate' },
          { key: '3', name: 'Velze Sarsfield' },
          { key: '4', name: 'Chapalmadal' },
          { key: '5', name: 'Mar del plata' },
        ]}
        renderItem={({ item }) =>
          <RecetaItemGuardada recetaKey={item.key} recetaDesc={item.name} />
        }
      />

    </View>
    </View>
  )
}

export default FavoritosScreen
