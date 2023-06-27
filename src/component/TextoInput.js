import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {
    useFonts
} from 'expo-font';

export default function TextoInput({ style, ...rest }) {
    const [loaded] = useFonts({
        PoppinsRegular: require('./texto/Poppins-Regular.ttf'),
        PoppinsBold: require('./texto/Poppins-Bold.ttf'),
    })

    if(!loaded){
        return null;
    }

    let estilo = estilos.texto;

    if(style?.fontWeight === 'bold'){
        estilo = estilos.textoNegrito;
    }

    return <TextInput style={[estilo, style]} {...rest} />;
}

const estilos = StyleSheet.create({
    texto: {
        fontFamily: "PoppinsRegular",
        fontWeight: "normal"
    },
    textoNegrito: {
        fontFamily: "PoppinsBold",
        fontWeight: "normal"
    }
})