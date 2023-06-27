import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image ,ScrollView, TouchableOpacity} from 'react-native';
import { firebase } from '../../config';
import { AntDesign } from '@expo/vector-icons';
import pomodoro from '../../assets/pomodoro.png';
import fichas from '../../assets/ficha.png';
import mapamental from '../../assets/mapamental.png';
import flashcard from '../../assets/flashcard.png';

import Texto from '../component/Texto';

export default function Estudos(props){
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
  <ScrollView>
  <View style={estilos.container}>
 
  <View style={estilos.row}>
      <View style={estilos.direcaotopmedic}>
  <Texto style={estilos.nomeusuario}> Olá {name.name}!</Texto>
  <Texto style={estilos.titlemedicacao}>Estudos</Texto>
</View>
 </View>

 <TouchableOpacity style={estilos.containermetodos}>
  
  <View style={estilos.column}>
  <Texto style={estilos.titlemetodos}>Pomodoro</Texto>
  <Texto style={estilos.subtitlemetodos}>Técnica de gerenciamento {'\n'}de tempo que ajuda a {'\n'}aumentar a produtividade.</Texto>
  </View>
  <Image   style={estilos.image} size={20} source={pomodoro}/>
  <AntDesign style={estilos.iconavancar} name="right" size={30} color="#45B6ED" />
 
 </TouchableOpacity>

 <View style={estilos.containermetodos}>
  <View style={estilos.column}>
  <Texto style={estilos.titlemetodos}>Flash Card</Texto>
  <Texto style={estilos.subtitlemetodos}>Técnica que utiliza {'\n'}pequenos cartões para testar {'\n'}sua memória.</Texto>
  </View>
  <Image style={estilos.image2}  source={flashcard}/>
  <AntDesign style={estilos.iconavancar} name="right" size={30} color="#45B6ED" />
 </View>

 <View style={estilos.containermetodos}>
  <View style={estilos.column}>
  <Texto style={estilos.titlemetodos}>Mapa Mental</Texto>
  <Texto style={estilos.subtitlemetodos}>Técnica de estudo que {'\n'}auxilia a memorizar os {'\n'}principais conceitos e {'\n'}pontos dos temas.</Texto>
  </View>
  <Image style={estilos.image3} source={mapamental} />
  <AntDesign style={estilos.iconavancar} name="right" size={30} color="#45B6ED" />
 </View>

 <View style={estilos.containermetodos}>
  <View style={estilos.column}>
  <Texto style={estilos.titlemetodos}>Ficha</Texto>
  <Texto style={estilos.subtitlemetodos}>Técnica de reunir citações {'\n'}ou incluir tópicos das {'\n'}ideias principais de {'\n'}determinado conteúdo</Texto>
  </View>
  <Image style={estilos.image4} source={fichas}/>
  <AntDesign style={estilos.iconavancar} name="right" size={30} color="#45B6ED" />
 </View>

  </View>
  </ScrollView>
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

titlemedicacao:{
  color: "#45B6ED",
  fontSize: 33,
  fontWeight: "bold",
  marginTop:0,
  paddingTop: 0,
},

imageperfil:{
  marginLeft: 180,
  justifyContent: 'flex-end',
  padding: 10,
  marginTop: 35,
},

containermetodos:{
  width: 375,
  height: 150,
  marginTop: 30,
  marginLeft: 20,
  marginRight: 30,
  backgroundColor:'#D8E9F2',
  borderRadius: 10,
  flexDirection: 'row',
},

column:{
  flexDirection: 'column',
},

titlemetodos:{
  color: '#45B6ED',
  fontWeight: 'bold',
  fontSize:22,
  paddingTop:25,
  paddingLeft: 14,
},

subtitlemetodos:{
  color: '#45B6ED',
  fontSize: 14,
  paddingLeft: 14,
},

image:{
  width:90,
  height: 90,
  marginTop:25,
  marginLeft:25,
},

image2:{
  width:90,
  height: 90,
  marginTop:25,
  marginLeft:5,
},

image3:{
  width:90,
  height: 90,
  marginTop:25,
  marginLeft:50,
},

image4:{
  width:90,
  height: 90,
  marginTop:25,
  marginLeft:26,
},

iconavancar:{
  marginTop: 60,
  marginLeft: 20,
},

});