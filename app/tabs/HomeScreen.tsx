import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { screenHomeStyles } from '../../theme/screenHomeStyles';
import RecetaItem from '../../components/RecetaItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchInput from '../../components/SearchInput';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { Link } from 'expo-router';



const HomeScreen = () => {
  useProfilePaginated()

 //console.log()
  return (
    <View style={
      screenHomeStyles.globalMargin
    }>
       <Link href='/ProfileScreen' style={screenHomeStyles.profileStyle}>
      <MaterialCommunityIcons name="face-man-profile" size={50} color="#FFCE80" />
      </Link>
      <Text style={screenHomeStyles.title}>Hola Christian</Text>
      <Text style={screenHomeStyles.subtitle}>¿Que vas a cocinar hoy?</Text>
      <SearchInput />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          { key: '1', name: 'Nicolas' },
          { key: '2', name: 'Rover plate' },
          { key: '3', name: 'Velze Sarsfield' },
          { key: '4', name: 'Chapalmadal' },
          { key: '5', name: 'Mar del plata' },
        ]}
        numColumns={2}
        renderItem={({ item }) =>
          <RecetaItem recetaKey={item.key} recetaDesc={item.name} />
        }
      />

    </View>

  )
}

export default HomeScreen
