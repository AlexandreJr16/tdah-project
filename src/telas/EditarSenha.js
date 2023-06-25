import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../../config';
import { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons, Feather, FontAwesome, AntDesign, Entypo} from '@expo/vector-icons';

export default function EditarSenha (props){

    const [isFocused, setIsFocused] = useState(false);
    
    const handleFocus = () => {
      setIsFocused(true);
    };
    
    const handleBlur = () => {
       setIsFocused(false);
    };

    return(

        <View style={estilos.container}>
            <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Configurações')}>
              <AntDesign name="arrowleft" size={30} color="#7FB7C3"/>
            </TouchableOpacity>

            <Text style={estilos.title}>Alterar Senha</Text>

            <View style={estilos.containerforms}>

            <View style={estilos.containerinput}>
      <Text style={[estilos.placeholder, isFocused  ? estilos.placeholderFocused : null,]}>
        Nova Senha
      </Text>
      <TextInput
        style={estilos.inputemail}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize='none'
        autoCorrect={false}
      />
    </View>

    <TouchableOpacity style={estilos.botao}>
        <Text style={estilos.textbotao}>Alterar</Text>
    </TouchableOpacity>

            </View>
        </View>

    );
}

const estilos = StyleSheet.create({

container:{
    flex:1,
    backgroundColor: '#FFF6EB',
},

areaicon:{
    marginTop: 40,
    marginLeft: 25,
},

title:{
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    top: 50,
    color: '#7FB7C3',
},

containerforms:{
    backgroundColor: 'white',
    width: '90%',
    flex: 0.4,
    top: '15%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7FB7C3',
    margin: 23,
    padding: 10,
},

placeholder: {
    fontSize: 15,
    color: '#7FB7C3',
    position: 'absolute',
    left: 15,
    top: 74,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  
  placeholderFocused: {
    fontSize: 13,
    top: 48,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 82,
    textAlign: 'center',

  },

  inputemail:{
    fontSize: 16,
      marginHorizontal: 2,
      height: 50,
      width: 345,
      borderColor: '#7FB7C3',
      borderWidth: 1,
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#fff',
      marginTop: 60,
      margin: 10,
  },

  botao:{
    width: 345,
    height: 50,
    backgroundColor: '#8CC06B',
    borderRadius: 10,
    top: 40,
    marginBottom: 15,
  },

  textbotao:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  }
})