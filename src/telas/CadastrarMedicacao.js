import React, {useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity , Keyboard, Text, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { firebase } from '../../config';
import Texto from '../component/Texto';
import TextoInput from '../component/TextoInput'

//import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';


export default function CadastrarMedicacao(props){
    console.log(props)

    const [buttonText, setButtonText] = useState('Selecionar Data');

    
    const [buttonTime, setButtonTime] = useState('Selecionar Horário');
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const [selectedTime, setSelectedTime] = useState();
    
    const [state, setState] = useState({
        medicacao: '',
        data: '',
        hora: '',
        descricao: '' 
      });
    
      const handleChangeText = (medicacao, value) => {
        setState({ ...state, [medicacao]: value });
      };
    
      const addMedicacao = async () => {
        if (state.medicacao === '') {
          alert('Adicione o nome da medicação!');
        } else {
          await firebase.firestore().collection('medicamento').add({
            medicacao: state.medicacao,
            data: state.data,
            hora: state.hora,
            //horafim: state.horafim,
            descricao: state.descricao
          });
          props.navigation.navigate('Medicação');
        }
      };

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


      const handleChangeDate = (date) => {
        setState((prevState) => ({
          ...prevState,
          data: date,
        }));
      };

      const handleConfirm = (date) => {
        setSelectedDate(date);
        
        /*alert("ano selecionada: " + date.getDate());
        alert("ano selecionada: " + date.getFullYear());
        alert("mês selecionado: " + date.getMonth());
        alert("dia selecionado: " + date.getDay());*/

        var month = date.getMonth()+1;
        handleChangeDate(`${date.getDate()}/${month}/${date.getFullYear()}`);
        setButtonText(`${date.getDate()}/${month}/${date.getFullYear()}`);

        hideDatePicker();
      };

      const handleConfirmTime = (time) => {
        setSelectedTime(time);

        const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        handleChangeText('hora', timeString);
        setButtonTime(timeString)
        hideTimePicker();
      };


    return(
    <View style={estilos.container}>
      <View style={estilos.containerformulario}>
        <View>
          <TouchableOpacity style={estilos.areaicon} onPress={()=> props.navigation.navigate('Medicação')}>
            <AntDesign  name="arrowleft" size={30} color="#4ECDB6"  />
          </TouchableOpacity>
        </View>
 
        <View>
          <Texto style={estilos.titulo}>Adicionar Medicação</Texto>
        </View>
        
        <ScrollView>

          <View>
            <Texto style={estilos.titulo_atividade}>Medicação</Texto>
            <TextInput
            style={estilos.input_atividade}
            onChangeText={(value) => handleChangeText('medicacao', value)}
            />

          <Texto style={estilos.titulo_data}>Data</Texto>

          <View>
            <TouchableOpacity onPress={showDatePicker}>
              <Texto style={estilos.input_horarioData}>{buttonText}</Texto>
            </TouchableOpacity>

            <DateTimePickerModal
              style={{width: "100%"}}
              value={selectedDate} // Passe a data como objeto Date
              isVisible={isDatePickerVisible}
              mode="date"
              format='DD/MM/YYYY'
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>


          <View>
            <View>
              <Texto style={estilos.titulo_horario}>Horário</Texto> 
            </View>


            <View>
              <TouchableOpacity onPress={showTimePicker}>
                <Texto style={estilos.input_horarioData}>
                  {buttonTime}
                </Texto>
              </TouchableOpacity>

                <DateTimePickerModal
                  style={estilos.areahorario}
                  value={selectedTime} // Passe a data como objeto Date
                  isVisible={isTimePickerVisible}
                  mode="time"
                  format='MM:HH'
                  is24Hour
                  onConfirm={handleConfirmTime}
                  onCancel={hideTimePicker}
                />
            </View>
          </View>

          <Texto style={estilos.titulo_descricao}>Descrição/Observações</Texto>

          <TextoInput
            style={estilos.input_descricao}
            onChangeText={(value) => handleChangeText('descricao', value)}
          />
          </View>

        <TouchableOpacity style={estilos.touchable_atividade} onPress={addMedicacao}>
          <Texto style={estilos.text_atividade}>Adicionar</Texto>
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
  
  titulo_data:{
    fontSize: 17,
    color: "#4ECDB6",
    marginLeft: 31,
    marginTop: 30,
    marginBottom:5,
  },
  
  titulo_horario:{
    fontSize: 17,
    color: "#4ECDB6",
    marginLeft: 32,
    marginTop: 30,
    marginBottom:5,
    
  },
  
  input_horarioData:{
    width: 350,
    textAlign: "center",
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
  });
  