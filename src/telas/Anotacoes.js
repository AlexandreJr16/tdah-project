import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../../config';
import { FlashList } from '@shopify/flash-list';
import Texto from '../component/Texto';

export default function Anotacoes(props){
  console.log(props);

  const [name, setName] = useState('') 
  const [notes, setNotes] = useState('');

  useEffect(() =>{
    firebase.firestore().collection('Notes') 
    .onSnapshot((querySnapshot)=>{
      const newNotes = [];
      querySnapshot.forEach((doc)=>{
        const { nota, titulo} = doc.data();
        newNotes.push({nota, titulo, id: doc.id});
      });
      setNotes(newNotes);
    });
  }, []);

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
  <Texto style={estilos.nomeusuario}> Olá {name.name}!</Texto>
  <Texto style={estilos.titleanotacao}>Anotações</Texto>
</View>

 </View>

 <FlashList 
data={notes}
numColumns={2}
estimatedItemSize={100}
renderItem={({item})=>(
  
  <TouchableOpacity onPress={()=>props.navigation.navigate('DetalheAnotacao', {item})}>

  <View style={estilos.notesView}>
  <View style={estilos.row}>
<Texto style={estilos.notestitulo}>{item.titulo}</Texto>

</View>
<Texto style={estilos.notesdescricao}>{item.nota}</Texto>

  </View>
  </TouchableOpacity>
)}

/>

 <TouchableOpacity style={estilos.botaocadastraranotacoes} onPress={()=>props.navigation.navigate('CadastrarNota')}>
  <AntDesign name="plus" size={27} color="white" />
  </TouchableOpacity>
  
  </View>
  </>
}

const estilos = StyleSheet.create({

container: {
  backgroundColor: "#FFF6EB",
  flex: 1,
},

row:{
  flexDirection: 'row',
},

direcaotopmedic: {
  flexDirection: 'column',
  marginLeft: 20,
},

nomeusuario: {
  fontSize: 15,
  color: 'black',
  marginTop: 40,
  marginBottom: 0,
},

titleanotacao: {
    color: "#FABA73",
    fontSize: 33,
    fontWeight: "bold",
    marginTop: 0,
    paddingTop: 0,
},

imageperfil: {
  marginLeft: 136,
  justifyContent: 'flex-end',
  padding: 10,
  marginTop: 35,
},

botaocadastraratividade: {
  width: 65,
  height: 65,
  borderRadius: 100,
  backgroundColor: '#FABA73',
  marginLeft: 320,
  marginTop: 680,
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',

},

botaocadastraranotacoes: {
  width: 65,
  height: 65,
  borderRadius: 100,
  backgroundColor: '#FABA73',
  marginLeft: 320,
  marginTop: 680,
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: 'gray',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 100,
  elevation: 7,
},

notesView: {
  height: 220,
  backgroundColor: 'white',
  marginLeft: 15,
  padding: 10,
  marginTop: 30,
  borderRadius: 10,
  shadowColor: 'gray',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 7,
  width: 180,
  margin: 10,
},

notestitulo: {
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: 5, // Espaçamento inferior do título
},

notesdescricao: {
  fontSize: 16,
  marginTop: 5,
},

icondots:{
  position: 'absolute',
  marginRight: 0,
},
  
containermodal: {
  width:50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:30,
  paddingRight: 15,
},
  
modal:{
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
  width: 300,
},

modalContent:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

});