// Generated by https://quicktype.io
import { ImagePickerAsset } from "expo-image-picker";

export interface CreateRecipePaginatedPost {
    file: ImagePickerAsset
    data:   Datum[];
}

export interface Datum {
    id_receta:          number;
    titulo:             string;
    descripcion:        string;
    preparacion:        string;
    youtube:            null;
    tiempo_preparacion: number;
    rendimiento:        number;
    calorias:           number;
    proteinas:          number;
    grasas:             number;
    puntaje:            null;
    ingredientes:       Ingrediente[];
    tags:           Tag[];
}

export interface Tag {
    id_tag: number;
}

export interface Ingrediente {
    id_ingrediente: number;
    descripcion:    string;
    cantidad:       string;
}