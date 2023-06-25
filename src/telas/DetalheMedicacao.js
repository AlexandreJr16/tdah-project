import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

import Texto from '../component/Texto';

export default function DetalheMedicacao(props) {
    console.log(props)
    const [medicamento, setMedicamento] = useState(null);
    const medicamentosId = props.route.params.medicamentosId;
 
    useEffect(() => { 
        const unsubscribe = firebase.firestore().collection('medicamento')
          .doc(medicamentosId)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              setMedicamento(data);
            } else {
              console.log('Medicamento não existe');
            }
          });
    
        return () => unsubscribe();
      }, []);
    
      const handleEditar = () => {
        props.navigation.navigate('EditarMedicacao', { medicamentosId: medicamentosId });
      };
    
      const handleDeletar = () => {
        firebase.firestore().collection('medicamento')
          .doc(medicamentosId)
          .delete()
          .then(() => {
            props.navigation.navigate('Medicação');
          })
          .catch((error) => {
            console.log('Erro ao deletar Medicação:', error);
          });
      };

return(
    <View style={estilos.container}>
    {medicamento ? (
      <View style={estilos.containerformulario}>
        <View style={estilos.areahorario}>
  <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Medicação')}>
  <AntDesign  name="arrowleft" size={30} color="#4ECDB6"  />
  </TouchableOpacity>

  <TouchableOpacity style={estilos.botaoeditar}  onPress={handleEditar}>
    <AntDesign name="edit" size={30} color="#4ECDB6" />
          </TouchableOpacity>
    
    <TouchableOpacity style={estilos.botaodeletar} onPress={handleDeletar}>
    <AntDesign name="delete" size={30} color="#4ECDB6" />
          </TouchableOpacity>
  </View>

  <View>
        <Texto style={estilos.titulo}>Detalhes</Texto>
    </View>

     <View>
     <Texto style={estilos.titulo_atividade}>Atividade</Texto>
        <Texto style={estilos.input_atividade}>{medicamento.medicacao}</Texto>
        </View>

        <View>
        <Texto style={estilos.titulo_data}>Data</Texto>
        <Texto style={estilos.input_atividade}>{medicamento.data}</Texto>
        </View>

        <View style={estilos.areahorario}>

        <View>
        <Texto style={estilos.titulo_horarioinicio}>Horário de Início</Texto> 
        <Texto style={estilos.input_horarioinicio}>{medicamento.horainicio}</Texto>
        </View>

        <View>
   <Texto style={estilos.titulo_horariofim}>Horário do Fim</Texto>
   <Texto style={estilos.input_horariofim}>{medicamento.horafim}</Texto>
   </View>

        </View>
        <Texto style={estilos.titulo_descricao}>Descrição/Observações</Texto>
        <Texto style={estilos.input_descricao}>{medicamento.descricao}</Texto>

       
      </View>
    ) : (
      <Texto>Carregando...</Texto>
    )}
  </View>
);
};

const estilos = StyleSheet.create({
container: {
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

titulo_atividade:{
  fontSize: 17,
  color: "#4ECDB6",
  marginLeft: 31,
  marginTop: 40,
  marginBottom:5,
},
title: { 
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20
},
subtitle: {
  fontSize: 16,
  marginBottom: 10
},
editButton: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
  marginTop: 10
},
deleteButton: {
  width: 250,
height: 45,
borderRadius: 10,
backgroundColor: "#fff",
borderWidth:1,
borderColor:'#4ECDB6',
alignItems: 'center',
justifyContent: 'center',
marginLeft: 80,
marginTop: 80,
},
areaicon:{
  marginTop: 40,
  marginLeft: 25,
},

titulo:{
  fontWeight: 'bold',
  marginTop: 15,
  color:"#4ECDB6",
  fontSize: 28,
  marginLeft: 35,
   
},
titulo_atividade:{
  fontSize: 17,
  color: "#4ECDB6",
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
  borderColor: '#4ECDB6',
  height:49,
 borderRadius: 10,
},

titulo_data:{
  fontSize: 17,
  color: "#4ECDB6",
  marginLeft: 31,
  marginTop: 30,
  marginBottom:5,
},

titulo_horarioinicio:{
  fontSize: 17,
  color: "#4ECDB6",
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
  borderColor: '#4ECDB6',
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
  borderColor: '#4ECDB6',
  height:49,
 borderRadius: 10,
},

titulo_horariofim:{
  fontSize: 17,
  color: "#4ECDB6",
  marginLeft: 37,
  marginTop: 30,
  marginBottom:5,
},

areahorario:{
  flexDirection: 'row',
},

titulo_descricao:{
  fontSize: 17,
  color: "#4ECDB6",
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
  padding: 12,
  borderWidth: 1,
  borderColor: '#4ECDB6',
  height:49,
 borderRadius: 10,
},

titulo_categoria:{
  fontSize: 18,
  color: "#4ECDB6",
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
  backgroundColor: "#4ECDB6",
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 80,
  marginTop: 25,
 
},

text_atividade:{
fontSize: 18,
color: "#fff",
textAlign: "center",
padding:5,
}, 

    botaoeditar:{
     
      marginLeft: '60%',
  marginTop: 39,
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
      color: "#4ECDB6",
      textAlign: "center",
      padding:5,
      }, 

      botaodeletar:{
     
        marginLeft: '7%',
        marginTop: 39,
          },

});