import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Platform, Modal } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FilterRecipeModal from '../app/FilterRecipeModal';
import { Tag } from '../interfaces/FavoritesInterface';
import useRecipesHomePaginated from '../hooks/useRecipesHomePaginated';
import useTags from '../hooks/useTags';

interface Props {
    handleFilterRecipes: (value: string) => void
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    handleTagsSelected: (val: string) => void;
    tags: Tag[];
    tagsSelected: string[];
    handleFilterRecipesTags: () => void;
    setTagsSelected: Dispatch<SetStateAction<[]>>;
}

const SearchInput = ({setTagsSelected, handleFilterRecipes, modalVisible, setModalVisible, handleFilterRecipesTags, handleTagsSelected, tags, tagsSelected}: Props) => {


    const emptyFilter = () => {
        setTagsSelected([])
        setModalVisible(false)
    }
    
    return (
        <View style={{...styles.container,
            top: (Platform.OS ==='ios') ? 0 : 5
            }}>
            <View style={styles.textBackground}>
                <EvilIcons name="search" size={40} color="#D9D9D9" style={{marginTop: -4}}/>
                <TextInput
                    style={styles.textSearch
                    }
                    placeholder='Buscá una receta'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={handleFilterRecipes}
                />
                <Modal visible={modalVisible}>
                    <FilterRecipeModal setTagsSelected={emptyFilter} handleTagsSelected={handleTagsSelected} tags={tags} tagsSelected={tagsSelected} handlePress={handleFilterRecipesTags} />
                </Modal>
            </View>
            <Feather name="filter" size={35} color="#129575" style={styles.icon} onPress={()=> setModalVisible(true)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10
    },
    container: {
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBackground: {
        borderColor: '#D9D9D9',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        height: 45,
        width:'85%',
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
