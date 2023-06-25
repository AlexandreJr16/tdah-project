import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { ListItem } from 'react-native-elements';

import Texto from '../component/Texto';

const Planner = (props) => {
  const [name, setName] = useState('');
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('Usuário não existe');
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('atividade')
      .onSnapshot((querySnapshot) => {
        const atividadesData = [];

        querySnapshot.docs.forEach((doc) => {
          const { atividade, data, horainicio, horafim, descricao } = doc.data();
          atividadesData.push({
            id: doc.id,
            atividade,
            data,
            horainicio,
            horafim,
            descricao
          });
        });

        setAtividades(atividadesData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={estilos.container}>
      <View style={estilos.row}>
        <View style={estilos.direcaotopplanner}>
          <Texto style={estilos.nomeusuario}>Olá {name.name}</Texto>
          <Texto style={estilos.titleplanner}>Planner</Texto>
        </View>
      </View>

      <ScrollView>
        {atividades.map((item) => (
          <ListItem style={estilos.containerplanner}
            key={item.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate('Detalhes', {
                atividadeId: item.id
              });
            }}
          >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>
                <Texto style={{fontWeight: 'bold'}}>{item.atividade}</Texto>
              </ListItem.Title>

              <ListItem.Subtitle>
                <Texto>{item.descricao}</Texto>
                
                </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>



      <TouchableOpacity
        style={estilos.botaocadastraratividade}
        onPress={() => props.navigation.navigate('CadastrarAtividade')}
      >
        <AntDesign name="plus" size={27} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Planner;

const estilos = StyleSheet.create({
  container:{
    backgroundColor:"#FFF6EB",
    flex: 1,
  },

  row:{
  flexDirection: 'row'
},
direcaotopplanner:{
  flexDirection: 'column',
  marginLeft: 20,
},

nomeusuario:{
  fontSize: 15,
  color: 'black',
  marginTop: 40,
  marginBottom: 0,
 
},

titleplanner:{
  color: "#FC586F",
  fontSize: 33,
  fontWeight: "bold",
  marginTop:0,
  paddingTop: 0,
},

botaocadastraratividade:{
  width: 65,
  height: 65,
  borderRadius: 100,
  backgroundColor: '#FC586F',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  atividadesContainer: {
    flexGrow: 1,
  },
  atividadeItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  atividadeText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2979ff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },

  containerplanner:{
    width: 375,
    height: 70,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 30,
    borderRadius: 10,
  }
});
