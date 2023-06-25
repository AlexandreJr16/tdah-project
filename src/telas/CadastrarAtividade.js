import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';
import Texto from '../component/Texto';

export default function CadastrarAtividade(props) {
  const [state, setState] = useState({
    atividade: '',
    data: '',
    horainicio: '', 
    horafim: '',
    descricao: ''
  });

  const handleChangeText = (atividade, value) => {
    setState({ ...state, [atividade]: value });
  };

  const addAtividade = async () => {
    if (state.atividade === '') {
      alert('Adicione o nome da atividade!');
    } else {
      await firebase.firestore().collection('atividade').add({
        atividade: state.atividade,
        data: state.data,
        horainicio: state.horainicio,
        horafim: state.horafim,
        descricao: state.descricao
      });
      props.navigation.navigate('Planner');
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.containerformulario}>
      <View>
    <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Planner')}>
    <AntDesign  name="arrowleft" size={30} color="#FC586F"  />
    </TouchableOpacity>
    </View>
 
    <View>
        <Texto style={estilos.titulo}>Adicionar atividade</Texto>
    </View>
    <ScrollView>

      <View>
       <Texto style={estilos.titulo_atividade}>Atividade</Texto>
        <TextInput
          style={estilos.input_atividade}
          onChangeText={(value) => handleChangeText('atividade', value)}
        />

        <Texto style={estilos.titulo_data}>Data</Texto>
        <TextInput
          style={estilos.input_atividade}
          onChangeText={(value) => handleChangeText('data', value)}
        />

        <View style={estilos.areahorario}>
          <View>
        <Texto style={estilos.titulo_horarioinicio}>Horário de Início</Texto> 
        <TextInput
          style={estilos.input_horarioinicio}
          onChangeText={(value) => handleChangeText('horainicio', value)}
        />
        </View>

        <View>
     <Texto style={estilos.titulo_horariofim}>Horário do Fim</Texto>
        <TextInput
          style={estilos.input_horariofim}
          
          onChangeText={(value) => handleChangeText('horafim', value)}
        />
        </View>
        </View>

        <Texto style={estilos.titulo_descricao}>Descrição/Observações</Texto>
        <TextInput
          style={estilos.input_descricao}
          onChangeText={(value) => handleChangeText('descricao', value)}
        />
      </View>

      <TouchableOpacity style={estilos.touchable_atividade} onPress={addAtividade}>
      <Texto style={estilos.Texto_atividade}>Adicionar</Texto>
      </TouchableOpacity>
      </ScrollView>
      </View>
    </View>
  );
}

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
  marginTop: 15,
  color:"#FC586F",
  fontSize: 28,
  marginLeft: 35,
  fontWeight: 'bold',   
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
  marginTop: 45,
 
},

text_atividade:{
fontSize: 18,
color: "#fff",
textAlign: "center",
padding:5,
}, 
});
