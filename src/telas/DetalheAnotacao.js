import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modalbox';
import { Entypo } from '@expo/vector-icons';

import Texto from '../component/Texto';

export default function DetalheAnotacao({route, props}){
  console.log(props);

  const navigation = useNavigation();
  const [noteText, setNoteText] = useState(route.params.item.nota);
  const [noteTitle, setNoteTitle] = useState(route.params.item.titulo);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mostrarComponentes, setMostrarComponentes] = useState(false);

  const toggleComponentes = () => {
    setMostrarComponentes(!mostrarComponentes);
  };


  const openModal = () => {
    setModalVisible(true);
  };
 
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUpdate =() => {
    if(noteTitle && noteTitle.length > 0){
        firebase.firestore()
        .collection('Notes')
        .doc(route.params.item.id)
        .update({
            titulo: noteTitle,
            nota: noteText,
        })
        .then(() => {
            navigation.navigate('Anotações');
        })
        .catch((error) =>{
            alert(error);

        }).then(() => {
          alert('Modificações salvas com sucesso');

        })
    }
  }

  const handleDelete = () => {
    firebase.firestore()
    .collection('Notes')
    .doc(route.params.item.id)
    .delete()
    .then(() => {
        navigation.navigate('Anotações');
    })
    .catch((error) => {
        alert(error);
    }).then(() => {
          alert('Nota deletada com sucesso');
     })
  }

  return <>
  <View style={estilos.container}>
  <View style={estilos.row}>

<TouchableOpacity onPress={() => navigation.navigate('Anotações')}>
<AntDesign style={estilos.iconvoltar} name="arrowleft" size={25} color="#FABA73"  />
</TouchableOpacity>

<TextInput 
  placeholder='Título'
  value={noteTitle}
  onChangeText={(text) => setNoteTitle(text)}
  style={estilos.inputTitle}
  />


</View>
                                                        
<TextInput                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  placeholder='Nota'
  value={noteText}
  onChangeText={(text) => setNoteText(text)}
  style={estilos.inputNote}
  multiline={true}/>


<TouchableOpacity style={estilos.botaosalvar} onPress={toggleComponentes}>
      <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>

      {mostrarComponentes && (
        <View >
          <Texto style={estilos.texto}>Componente 1</Texto>
          <Texto>Componente 2</Texto>
          <Texto>Componente 3</Texto>
        </View>
      )}


  </View>
  </>
}

const estilos = StyleSheet.create({

container:{
  backgroundColor:"#FFF6EB",
  flex: 1,
},

inputTitle:{
  fontSize: 18, 
  fontWeight: '600',
  marginTop: 48,
  marginBottom: 10,
  height: 20,
  width: '80%',
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
  paddingBottom: 10,
  },

row:{
  flexDirection:'row',
},
  
iconvoltar:{
  marginLeft: 15,
  marginTop: 45  ,
},

icondots:{
  marginTop: 40,
  marginLeft: 5,
},
  
containermodal:{
  position: 'absolute',
  width:40,
  height: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:30,
  top:20,
  right: 80,
},
  
modal:{ 
  height: 150,
  width: 100,
  borderRadius: 10, 
},
  
modalContent:{
  flex: 1,
  padding: 10,   
},

textomodal:{
  fontSize: 14,
  padding: 5,
  paddingBottom: 4,
},

textomodalfechar:{
  fontSize: 14,
  paddingTop: 10,
  padding: 5,
  paddingBottom:5,
},

botaomodal:{
  flex:1,
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
  
},

texto:{
backgroundColor: 'black',
marginLeft: 35,
  marginTop: 70,
}

});