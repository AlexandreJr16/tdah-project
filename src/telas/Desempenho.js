import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../../config';

export default function Desempenho(props){
  console.log(props);
  
  const [name, setName] = useState('') 
  
    useEffect(()=>{
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('Usuário não existe')
        }
      })
    }, [])
  
  return <>

  <View style={estilos.container}>

  <View style={estilos.row}>
      <View style={estilos.direcaotopmedic}>
  <Text style={estilos.nomeusuario}> Olá {name.name}</Text>
  <Text style={estilos.titledesempenho}>Desempenho</Text>
</View>
 </View>
  
  </View>
  </>
}

const estilos = StyleSheet.create({

container:{
  backgroundColor:"#FFF6EB",
  flex: 1,
},

row:{
  flexDirection: 'row'
},

direcaotopmedic:{
  flexDirection: 'column',
  marginLeft: 20,
},

nomeusuario:{
  fontSize: 15,
  color: 'black',
  marginTop: 40,
  marginBottom: 0,
},

titledesempenho:{
  color: "#45B6ED",
  fontSize: 33,
  fontWeight: "600",
  marginTop:0,
  paddingTop: 0,
},

imageperfil:{
  marginLeft: 96,
  justifyContent: 'flex-end',
  padding: 10,
  marginTop: 35,
},
});