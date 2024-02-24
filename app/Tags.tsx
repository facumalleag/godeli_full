import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Tag } from "../interfaces/FavoritesInterface";

interface Props {
    item: Tag
    handleTagsSelected: (value: string) => void;
}

export default function Tags ({item, handleTagsSelected}: Props){
    const [selected, setSelected] = useState<boolean>(false)
    return <Pressable onPress={() => {
        setSelected(!selected); 
        handleTagsSelected(item.id.toString())}}
        >
                <Text style={[styles.tagValues, selected && styles.tagValuesSelected]}>
                    {item.descripcion}
                </Text>
            </Pressable>
}

const styles = StyleSheet.create({
    tagValues: {
        color: '#129575',
        borderColor: '#129575',
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 7,
        marginBottom: 5,
        marginLeft: 5,
    },
    tagValuesSelected: {
        color: 'white',
        backgroundColor: '#129575'
    }
})