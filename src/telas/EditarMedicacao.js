import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

import Texto from '../component/Texto';
import TextoInput from '../component/TextoInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function EditarMedicacao(props) {
    console.log(props)
 
    
  const [medicamentos, setMedicamentos] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novaHora, setNovaHora] = useState('');
  const [novaDescricao, setNovaDescricao] = useState(''); 

  const medicamentosId = props.route.params.medicamentosId;

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('medicamento')
      .doc(medicamentosId) 
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          setMedicamentos(data);
          setNovoTitulo(data.medicacao);
          setNovaData(data.data);
          setNovaHora(data.hora);
          setNovaDescricao(data.descricao);
        } else {
          console.log('Medicamento não existe');
        }
      });

    return () => unsubscribe();
  }, []);

  const [buttonText, setButtonText] = useState(data.data);

  const handleSalvar = () => {
    firebase.firestore().collection('medicamento')
      .doc(medicamentosId)
      .update({
        medicacao: novoTitulo,
        data: novaData,
        hora: novaHora,
        descricao: novaDescricao
      })
      .then(() => {
        props.navigation.navigate('Medicação', { medicamentosId: medicamentosId });
      })
      .catch((error) => {
        console.log('Erro ao atualizar medicamento:', error);
      });
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
    
  const [selectedTime, setSelectedTime] = useState();
	
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
      
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);

    var month = date.getMonth()+1;
    handleChangeDate(`${date.getDate()}/${month}/${date.getFullYear()}`);

    hideDatePicker();
  };

  const handleChangeDate = (date) => {
    setNovaData(date);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(time);

    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNovaHora(timeString);
    hideTimePicker();
  };

return(
  <View style={estilos.container}>
    {medicamentos ? (
      <View style={estilos.containerformulario}>
        <View>
          <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Medicação')}>
            <AntDesign  name="arrowleft" size={30} color="#4ECDB6"  />
          </TouchableOpacity>
        </View>

        <View>
          <Texto style={estilos.titulo}>Editar</Texto>
        </View>

        <Texto style={estilos.titulo_atividade}>Medicamento</Texto>
        <TextoInput
          style={estilos.input_atividade}
          value={novoTitulo}
          onChangeText={setNovoTitulo}
        />

      <View>
        <Texto style={estilos.titulo_atividade}>Data</Texto>

        <TouchableOpacity onPress={showDatePicker}>
          <Texto style={estilos.input_atividade}>
            {novaData}
          </Texto>
        </TouchableOpacity>

        <DateTimePickerModal
            style={{width: "100%"}}
            value={selectedDate}
            isVisible={isDatePickerVisible}
            mode="date"
            format='DD/MM/YYYY'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
      </View>
        

        <View>
          <View>
            <Texto style={estilos.titulo_atividade}>Hora</Texto>

            <TouchableOpacity onPress={showTimePicker}>
              <Texto style={estilos.input_atividade}>
                {novaHora}
              </Texto>
            </TouchableOpacity>

            <DateTimePickerModal
              style={{width: "100%"}}
              value={selectedTime}
              isVisible={isTimePickerVisible}
              mode="time"
              format='MM:HH'
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />

          </View>
        </View>

        <Texto style={estilos.titulo_atividade}>Descrição:</Texto>
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
        <Text style={estilos.text_carregando}>Carregando...</Text>
      )}
  </View>
);
};

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
  color:"#4ECDB6",
  fontSize: 28,
  marginLeft: 35,
   
},

titulo_atividade:{
  fontSize: 17,
  color: '#4ECDB6',
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
  marginTop: 45,
 
},

text_atividade:{
fontSize: 18,
color: "#fff",
textAlign: "center",
padding:5,
}, 

text_carregando:{
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: 20,
  marginTop: '100%',
  flex: 1,
},
  
});
