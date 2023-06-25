import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../../config';
import { AntDesign } from '@expo/vector-icons';

import Texto from '../component/Texto';

const EditarAtividade = (props) => {
  const [atividade, setAtividade] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novaHoraInicio, setNovaHoraInicio] = useState('');
  const [novaHoraFim, setNovaHoraFim] = useState('');
  const [novaDescricao, setNovaDescricao] = useState(''); 
 
  const atividadeId = props.route.params.atividadeId;

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('atividade')
      .doc(atividadeId) 
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          setAtividade(data);
          setNovoTitulo(data.atividade);
          setNovaData(data.data);
          setNovaHoraInicio(data.horainicio);
          setNovaHoraFim(data.horafim);
          setNovaDescricao(data.descricao);
        } else {
          console.log('Atividade não existe');
        }
      });

    return () => unsubscribe();
  }, []);

  const handleSalvar = () => {
    firebase.firestore().collection('atividade')
      .doc(atividadeId)
      .update({
        atividade: novoTitulo,
        data: novaData,
        horainicio: novaHoraInicio,
        horafim: novaHoraFim,
        descricao: novaDescricao
      })
      .then(() => {
        props.navigation.navigate('Planner', { atividadeId: atividadeId });
      })
      .catch((error) => {
        console.log('Erro ao atualizar atividade:', error);
      });
  };

  return (
    <View style={estilos.container}>
      {atividade ? (
        <View style={estilos.containerformulario}>
          <View>
    <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Planner')}>
    <AntDesign  name="arrowleft" size={30} color="#FC586F"  />
    </TouchableOpacity>
    </View>

    <View>
        <Texto style={estilos.titulo}>Editar</Texto>
    </View>
          <Texto style={estilos.titulo_atividade}>Título</Texto>
          <TextInput
            style={estilos.input_atividade}
            value={novoTitulo}
            onChangeText={setNovoTitulo}
          />

          <Texto style={estilos.titulo_data}>Data</Texto>
          <TextInput
            style={estilos.input_atividade}
            value={novaData}
            onChangeText={setNovaData}
          />
           <View style={estilos.areahorario}>
          <View>

          <Texto style={estilos.titulo_horarioinicio}>Hora Início</Texto>
          <TextInput
            style={estilos.input_horarioinicio}
            value={novaHoraInicio}
            onChangeText={setNovaHoraInicio}
          />
          </View>
          <View>
          <Texto style={estilos.titulo_horariofim}>Hora Fim</Texto>
          <TextInput
            style={estilos.input_horariofim}
            value={novaHoraFim}
            onChangeText={setNovaHoraFim}
          />
          </View>
          
          </View>

          <Texto style={estilos.titulo_descricao}>Descrição</Texto>
          <TextInput
            style={estilos.input_descricao}
            value={novaDescricao}
            onChangeText={setNovaDescricao}
            multiline
          />

          <TouchableOpacity style={estilos.touchable_atividade} onPress={handleSalvar}>
            <Texto style={estilos.text_atividade}>Salvar</Texto>
          </TouchableOpacity>
        </View>
      ) : (
        <Texto style={estilos.text_carregando}>Carregando...</Texto>
      )}
    </View>
  );
};

export default EditarAtividade;

const estilos = StyleSheet.create({
  container:{
    backgroundColor:"#FFF6EB",
    flex: 1,
},
containerformulario:{
  flex:0.9,
  backgroundColor: "#fff",
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
  display:'flex',
  
},

areaicon:{
  marginTop: 40,
  marginLeft: 25,
},

titulo:{
  fontWeight: 'bold',
  marginTop: 15,
  color:"#FC586F",
  fontSize: 28,
  marginLeft: 35,
   
},

titulo_atividade:{
  fontSize: 17,
  color: "#FC586F",
  marginLeft: 31,
  marginTop: 30,
  marginBottom:5,
},

input_atividade:{
  
  width: 350,
  alignItems: "center",
  marginLeft: 31,
  marginRight: 31,
  height: 28,
  fontSize: 16,
  margin:1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#FC586F',
  height:49,
 borderRadius: 10,
},

titulo_data:{
  fontSize: 17,
  color: "#FC586F",
  marginLeft: 31,
  marginTop: 30,
  marginBottom:5,
},

titulo_horarioinicio:{
  fontSize: 17,
  color: "#FC586F",
  marginLeft: 32,
  marginTop: 30,
  marginBottom:5,
  
},

input_horarioinicio:{

  width: 140,
  alignItems: "center",
  marginLeft:31,
  marginRight: 31,
  height: 28,
  fontSize: 16,
  margin:1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#FC586F',
  height:49,
 borderRadius: 10,
},

input_horariofim:{
  width: 140,
  alignItems: "center",
  marginLeft: 35,
  marginRight: 31,
  height: 28,
  fontSize: 16,
  margin:1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#FC586F',
  height:49,
 borderRadius: 10,
},

titulo_horariofim:{
  fontSize: 17,
  color: "#FC586F",
  marginLeft: 37,
  marginTop: 30,
  marginBottom:5,
},

areahorario:{
  flexDirection: 'row',
},

titulo_descricao:{
  fontSize: 17,
  color: "#FC586F",
  marginLeft: 31,
  marginTop: 30,
  marginBottom:5,

},

input_descricao:{
  borderBottomWidth: 1,
  width: 350,
  alignItems: "center",
  marginLeft: 31,
  marginRight: 31,
  height: 28,
  fontSize: 16,
  margin:1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#FC586F',
  height:49,
 borderRadius: 10,
},

titulo_categoria:{
  fontSize: 18,
  color: "#FC586F",
  marginLeft: 31,
  marginTop: 40,
  marginBottom:5,
},

pressable_categoria:{
  backgroundColor: "#D9D9D9",
  width: 90,
  height: 25,
  marginLeft: 31, 
  margin: 2,
  borderRadius: 5,
},

texto_categoria:{
  fontSize: 16,
  textAlign: "center",  
},

pressable_categoriaadicionar:{
  marginHorizontal: 4,
  backgroundColor: "#D9D9D9",
  width: 90,
  height: 25,
  marginLeft: 31, 
  margin: 2,
  borderRadius: 5,
  alignItems: "center",
  padding: 2,
},

touchable_atividade:{
  width: 250,
  height: 45,
  borderRadius: 10,
  backgroundColor: "#FC586F",
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 80,
  marginTop: 60,
 
},

text_atividade:{
fontSize: 18,
color: "#fff",
textAlign: "center",
padding:5,
}, 

    botaoeditar:{
      width: 250,
  height: 45,
  borderRadius: 10,
  backgroundColor: "#FC586F",
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 80,
  marginTop: 45,
    },

    deleteButton:{
      width: 250,
  height: 45,
  borderRadius: 10,
  backgroundColor: "#FFF",
  borderWidth: 1,
  borderColor: '#FC586F',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 80,
 marginTop:10,
    },

    text_carregando:{
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 20,
      marginTop: '100%',
      flex: 1,
    },

    text_atividadedelete:{
      fontSize: 18,
      color: "#FC586F",
      textAlign: "center",
      padding:5,
      }, 
  
});
