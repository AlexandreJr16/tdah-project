import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';

import Texto from '../component/Texto';
import TextoInput from '../component/TextoInput';

export default function CadastrarNota(props) {
  console.log(props);

  const [titulo, setTitulo] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    firebase
      .firestore()
      .collection('Notes')
      .add({
        titulo: titulo,
        nota: note,
      })
      .then(() => {
        setTitulo('');
        setNote('');
        Keyboard.dismiss();
        props.navigation.navigate('Anotações');
      })
      .catch((error) => {
        alert(error);
      }).then(() => {
        alert('Nota cadastrada com sucesso');
   })
  };

  return (
   
    <View style={estilos.container}>
   
      <View style={estilos.row}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Anotações')}>
          <AntDesign style={estilos.iconvoltar} name="arrowleft" size={25} color="#FABA73" />
        </TouchableOpacity>

        <TextoInput
          placeholder='Título'
          placeholderTextColor='#FABA73'
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
          style={estilos.inputTitulo}
        />
      </View>

      <TextoInput
        placeholder='Nota'
        placeholderTextColor='#FABA73'
        value={note}
        onChangeText={(text) => setNote(text)}
        style={estilos.inputNote}
        multiline={true}
      />

      <TouchableOpacity style={estilos.botaosalvar} onPress={handleAdd}>
      <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const estilos = StyleSheet.create({

container:{
  backgroundColor: "#FFFCF9",
  flex:1,
},

containerscroll:{
  backgroundColor: "#FFFCF9",
  flexGrow: 1,
  
},

scrollContainer: {
  flexGrow: 1,
  paddingHorizontal: 20,
  paddingBottom: 20,
},

row:{
  flexDirection: 'row',
},

iconvoltar:{
  marginLeft: 15,
  marginTop: 49,
},

inputTitulo:{
  fontSize: 18, 
  fontWeight: '600',
  marginTop: 54,
  marginBottom: 10,
  height: 20,
  width: '85%',
  borderBottomWidth: 1/2,
  marginLeft: 10,
},

inputNote:{
  fontSize: 18,
  marginBottom: 10,
  height: '100%',
  padding:10,
  marginTop:15,
  textAlignVertical: 'top',
  marginLeft: '2%',
},

botaosalvar:{
  width: 65,
  height: 65,
  borderRadius: 100,
  backgroundColor: '#FABA73',
  marginLeft: 335,
  marginTop: 700,
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  
}

});