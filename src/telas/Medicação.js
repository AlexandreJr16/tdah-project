import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { ListItem } from 'react-native-elements';
import Texto from '../component/Texto';

export default function Medicação(props){
  const [name, setName] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  console.log(props)

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data().name); // Corrigido: atribuir snapshot.data().name a name
        } else {
          console.log('Usuário não existe');
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('medicamento')
      .onSnapshot((querySnapshot) => {
        const medicamentosData = [];

        querySnapshot.docs.forEach((doc) => {
          const { medicacao, data, horainicio, horafim, descricao } = doc.data();
          medicamentosData.push({
            id: doc.id,
            medicacao,
            data,
            horainicio,
            horafim,
            descricao
          });
        });

        setMedicamentos(medicamentosData);
      });

    return () => unsubscribe();
  }, []);
   
  return <>

  <View style={estilos.container}>

  <View style={estilos.row}>
      <View style={estilos.direcaotopmedic}>
  <Texto style={estilos.nomeusuario}> Olá {name}</Texto>
  <Texto style={estilos.titlemedicacao}>Medicação</Texto>
</View>
 </View>
 
 <ScrollView>
        {medicamentos.map((item) => (
          <ListItem style={estilos.containerplanner}
            key={item.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate('Detalhemedicacao', {
                medicamentosId: item.id
              });
            }}
          >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>
                <Texto style={{fontWeight: "bold"}}>{item.medicacao}</Texto>
              </ListItem.Title>

              <ListItem.Subtitle>
                <Texto>{item.descricao}</Texto>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>

 <TouchableOpacity style={estilos.botaocadastrarmedicamento} 
 onPress={()=>props.navigation.navigate('CadastrarMedicacao')}>
  <AntDesign name="plus" size={27} color="white" />
  </TouchableOpacity>
  
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
 
titlemedicacao:{
  color: "#4ECDB6",
  fontSize: 33,
  fontWeight: "bold",
  marginTop:0,
  paddingTop: 0,
},

imageperfil:{
  marginLeft: 130,
  justifyContent: 'flex-end',
  padding: 10,
  marginTop: 35,
},

botaocadastrarmedicamento:{
  width: 65,
  height: 65, 
  borderRadius: 100,
  backgroundColor: '#4ECDB6',
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
  
},  containerplanner:{
  width: 375,
height: 70,
marginTop: 30,
marginLeft: 20,
marginRight: 30,
borderRadius: 10,
}
});
