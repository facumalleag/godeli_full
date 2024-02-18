import React from 'react'
import { FlatList, Text, View } from 'react-native'
import RecetaItemGuardada from '../../components/RecetaItemGuardada'
import { guardadoStyle } from '../../theme/RecetasGuardadasStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';


const FavoritosScreen = (prop:any) => {
  return (
    <View style={
      guardadoStyle.globalMargin
    }>
      <View style={{}}>
      <Link href='/ProfileScreen' style={guardadoStyle.profileStyle}>
      <MaterialCommunityIcons name="face-man-profile" size={50} color="#FFCE80"   />
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
  )
}

export default FavoritosScreen
