import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { firebase,db} from '../../config';
import { useState, useEffect } from 'react';
import { AntDesign} from '@expo/vector-icons';
import Texto from '../component/Texto';

export default function EditarNome (props){
    const [isFocused, setIsFocused] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [name, setName] = useState('');
    const handleFocus = () => {
      setIsFocused(true);
    };
    
    const handleBlur = () => {
       setIsFocused(false);
    };

    const handleChangeName = () => {
      const user = firebase.auth().currentUser;
    
      if (user) {
        if (typeof novoNome === 'string') {
          db.collection('users')
            .doc(user.uid)
            .update({ name: novoNome })
            .then(() => {
              alert('Nome alterado com sucesso!');
              setName(novoNome);
              props.navigation.navigate('Configurações'); // Atualiza o estado do nome exibido na tela
            })
            .catch((error) => {
              console.error('Erro ao alterar o nome');
              alert('Erro ao alterar o nome. Consulte o console para obter mais detalhes.');
            });
            
        } else {
          alert('O novo nome deve ser um carácter válido.');
        }
      }
    };
    

    return(

        <View style={estilos.container}>
            <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Configurações')}>
              <AntDesign name="arrowleft" size={30} color="#7FB7C3"/>
            </TouchableOpacity>

            <Texto style={estilos.title}>Alterar Nome</Texto>

            <View style={estilos.containerforms}>

            <View style={estilos.containerinput}>
      <Texto style={[estilos.placeholder, isFocused ? estilos.placeholderFocused : null,]}>
        Novo Nome
      </Texto>
      <TextInput
        style={estilos.inputemail}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={novoNome}
        onChangeText={setNovoNome}
        autoCorrect={false}
      />
    </View>

    <TouchableOpacity style={estilos.botao} onPress={handleChangeName}>
        <Texto style={estilos.textbotao}>Alterar</Texto>
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
    width: 92,
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