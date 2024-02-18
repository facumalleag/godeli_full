import React from 'react'
import { View, StyleSheet, TextInput, Platform } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SearchInput = () => {
    return (
        <View style={{...styles.container,
            top: (Platform.OS ==='ios') ? 0 : 9
            }}>
            <View style={styles.textBackground}>
                <EvilIcons name="search" size={40} color="#D9D9D9"/>
                <TextInput
                    style={styles.textSearch
                    }
                    placeholder='Buscá una receta'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Feather name="filter" size={35} color="#129575" style={styles.icon} onPress={()=>{
}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginLeft:137
    },
    container: {
        paddingBottom: 20,
    },
    textBackground: {
        borderColor: '#D9D9D9',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        height: 45,
        width:320,
        justifyContent: 'flex-start',

        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

    },
    textSearch: {
        fontSize: 18,
        marginLeft:10,
    }
});

export default SearchInput
