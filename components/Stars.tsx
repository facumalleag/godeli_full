import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function Stars({handleStarsSelected, puntuacion}) {
    const [selected, setSelected] = useState(false)
    return (
        <Ionicons name={selected ? "star" : "star-outline"} size={20} color="#129575" style={[styles.star]}
        onPress={()=>{handleStarsSelected(puntuacion); setSelected(!selected)}}
        > {puntuacion}</Ionicons>
    )
}

const styles = StyleSheet.create({
    star: {
        borderWidth: 2,
        borderColor: '#129575',
        borderRadius: 15,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        marginBottom: 15,
    },
})