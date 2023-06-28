import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../../config';
import { FlashList } from '@shopify/flash-list';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import Texto from '../component/Texto';

export default function Anotações({route, props}){
  console.log(props);

  const navigation = useNavigation();
  const [name, setName] = useState('') 
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationexcluir, setShowConfirmationexcluir] = useState(false);
  const [collectionIdToDelete, setCollectionIdToDelete] = useState(null);

  const handlePress = (collectionId) => {
    setShowConfirmation(true);
    setCollectionIdToDelete(collectionId);
    setShowConfirmationexcluir(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmExcluir = () => {
    if (collectionIdToDelete) {
      firebase
        .firestore()
        .collection('Notes')
        .doc(collectionIdToDelete)
        .delete()
        .then(() => {
          alert('Nota excluída com sucesso!');
        })
        .catch((error) => {
          alert('Erro ao excluir');
        });
    }
    setShowConfirmationexcluir(false);
    setCollectionIdToDelete(null);
    setShowConfirmation(false);
  };

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
  <Texto style={estilos.nomeusuario}> Olá {name.name}</Texto>
  <Texto style={estilos.titleanotacao}>Anotações</Texto>
</View>

 </View>

 <FlashList 
data={notes}
numColumns={2}
estimatedItemSize={100}
renderItem={({item})=>(
  
  <TouchableOpacity onPress={()=>navigation.navigate('DetalheAnotacao', {item})}>

<View style={estilos.notesView}>
  <View style={estilos.row}>
    <Texto style={estilos.notestitulo}>{item.titulo}</Texto>
    <View style={estilos.iconContainer}>
     
    </View>
  </View>
  <Texto style={estilos.notesdescricao}>{item.nota}</Texto>
</View>
  </TouchableOpacity>
)}
/>


{showConfirmation && (

<View style={estilos.containerconfirma}>

<View style={estilos.confirmationContainer}>
 <Texto style={estilos.title}>Deseja Excluir?</Texto>

 <View style={estilos.row}>

 <TouchableOpacity onPress={handleConfirmExcluir}>
   <Texto style={estilos.textobotao}>Excluir</Texto>
 </TouchableOpacity>

 <View style={estilos.linha}/>

 <TouchableOpacity onPress={handleCancel}>
   <Texto style={estilos.textobotao}>Cancelar</Texto>
 </TouchableOpacity>

</View>

</View>

</View>
)}


 <TouchableOpacity style={estilos.botaocadastraranotacoes} onPress={()=>navigation.navigate('CadastrarNota')}>
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
    fontWeight: "600",
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
  position: 'relative',
},

notestitulo: {
  fontSize: 15,
  fontWeight: '600',
  marginBottom: 5, // Espaçamento inferior do título
},

notesdescricao: {
  fontSize: 16,
  marginTop: 5,
},

icondots:{
  backgroundColor: 'white',
  width: 21,
},

row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
iconContainer: {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 140,
  justifyContent: 'center', // Espaçamento para afastar o ícone da borda direita
},

confirmationContainer:{
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  height: '45%',
  width: 300,
  top: 50,
  shadowColor: 'gray',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 100,
  elevation: 7,
  zIndex: 9999,
},

containerconfirma:{
  alignItems: 'center',
  
},

row:{
  flexDirection: 'row',
},

linha:{
  marginVertical: 2,
  width: 1,
  backgroundColor: 'black',
  marginHorizontal: 20,
},

title:{
  paddingBottom: 20,
  fontSize: 16,
},

textobotao:{
  fontSize: 16,

},

});