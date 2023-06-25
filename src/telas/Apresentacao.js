import React from 'react';
import {View, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import apresentacao from '../../assets/apresentacao.png';

import Texto from '../component/Texto';

export default function Apresentacao(props){
    console.log(props);

    return(
      <View style={estilos.container}>
        <Image style={estilos.imagem} source={apresentacao} />
        
        <TouchableOpacity style={estilos.botao} onPress={() => props.navigation.navigate('Login')}>
            <Texto style={estilos.texto}>Começar agora</Texto>
        </TouchableOpacity>
      </View>
    );
}

const estilos = StyleSheet.create({

container:{
    backgroundColor:"#FFF6EB",
    flex: 1,
},

imagem: {
    width: 420,
    height: 900,
},

botao: {
    position: 'absolute',
    top: 520, 
    alignSelf: 'center',
    backgroundColor: '#2F7DA9', 
    padding: 10, 
    borderRadius: 50,
    width: 250,
},

texto:{
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
}
})