import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import Texto from "../component/Texto";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CadastrarAtividade(props) {
  const [state, setState] = useState({
    atividade: "",
    data: "",
    horainicio: "",
    horafim: "",
    descricao: "",
  });

  const handleChangeText = (atividade, value) => {
    setState({ ...state, [atividade]: value });
  };
  const addAtividade = async () => {
    try {
      if (state.atividade === "") {
        alert("Adicione o nome da atividade!");
      } else {
        const partes = state.data.split("/");
        const dia = partes[0].padStart(2, "0");
        const mes = partes[1].padStart(2, "0");
        const ano = partes[2];
        const dataConvertida = `${ano}-${mes}-${dia}`;

        await firebase.firestore().collection("atividade").add({
          atividade: state.atividade,
          data: dataConvertida,
          horainicio: state.horainicio,
          horafim: state.horafim,
          descricao: state.descricao,
          userId: firebase.auth().currentUser.uid,
        });
        props.navigation.navigate("Planner");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [buttonText, setButtonText] = useState("Selecionar Data");

  const [buttonTime1, setButtonTime1] = useState("");

  const [buttonTime2, setButtonTime2] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedTime1, setSelectedTime1] = useState();

  const [selectedTime2, setSelectedTime2] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isTimePickerVisible1, setTimePickerVisibility1] = useState(false);

  const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker1 = () => {
    setTimePickerVisibility1(true);
  };

  const hideTimePicker1 = () => {
    setTimePickerVisibility1(false);
  };

  const showTimePicker2 = () => {
    setTimePickerVisibility2(true);
  };

  const hideTimePicker2 = () => {
    setTimePickerVisibility2(false);
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

    var month = date.getMonth() + 1;
    handleChangeDate(`${date.getDate()}/${month}/${date.getFullYear()}`);
    setButtonText(`${date.getDate()}/${month}/${date.getFullYear()}`);

    hideDatePicker();
  };

  const handleConfirmTime1 = (time) => {
    setSelectedTime1(time);

    const timeString = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    handleChangeText("horainicio", timeString);
    setButtonTime1(timeString);
    hideTimePicker1();
  };

  const handleConfirmTime2 = (time) => {
    setSelectedTime2(time);

    const timeString = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    handleChangeText("horafim", timeString);
    setButtonTime2(timeString);
    hideTimePicker2();
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.containerformulario}>
        <View>
          <TouchableOpacity
            style={estilos.areaicon}
            onPress={() => props.navigation.navigate("Planner")}
          >
            <AntDesign name="arrowleft" size={30} color="#FC586F" />
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
              onChangeText={(value) => handleChangeText("atividade", value)}
            />

            <View>
              <Texto style={estilos.titulo_data}>Data</Texto>

              <TouchableOpacity onPress={showDatePicker}>
                <Texto style={estilos.input_atividade}>{buttonText}</Texto>
              </TouchableOpacity>

              <DateTimePickerModal
                style={{ width: "100%" }}
                value={selectedDate} // Passe a data como objeto Date
                isVisible={isDatePickerVisible}
                mode="date"
                format="DD/MM/YYYY"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            <View style={estilos.areahorario}>
              <View>
                <Texto style={estilos.titulo_horarioinicio}>
                  Horário de Início
                </Texto>

                <TouchableOpacity onPress={showTimePicker1}>
                  <Texto style={estilos.input_horarioinicio}>
                    {buttonTime1}
                  </Texto>
                </TouchableOpacity>

                <DateTimePickerModal
                  style={estilos.areahorario}
                  value={selectedTime1} // Passe a data como objeto Date
                  isVisible={isTimePickerVisible1}
                  mode="time"
                  format="MM:HH"
                  is24Hour
                  onConfirm={handleConfirmTime1}
                  onCancel={hideTimePicker1}
                />
              </View>

              <View>
                <Texto style={estilos.titulo_horarioinicio}>
                  Horário do Fim
                </Texto>

                <TouchableOpacity onPress={showTimePicker2}>
                  <Texto style={estilos.input_horarioinicio}>
                    {buttonTime2}
                  </Texto>
                </TouchableOpacity>

                <DateTimePickerModal
                  style={estilos.areahorario}
                  value={selectedTime2} // Passe a data como objeto Date
                  isVisible={isTimePickerVisible2}
                  mode="time"
                  format="MM:HH"
                  is24Hour
                  onConfirm={handleConfirmTime2}
                  onCancel={hideTimePicker2}
                />
              </View>
            </View>

            <Texto style={estilos.titulo_descricao}>
              Descrição/Observações
            </Texto>
            <TextInput
              style={estilos.input_descricao}
              onChangeText={(value) => handleChangeText("descricao", value)}
            />
          </View>

          <TouchableOpacity
            style={estilos.touchable_atividade}
            onPress={addAtividade}
          >
            <Texto style={estilos.Texto_atividade}>Adicionar</Texto>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6EB",
    flex: 1,
  },
  containerformulario: {
    flex: 0.9,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    display: "flex",
  },

  areaicon: {
    marginTop: 40,
    marginLeft: 25,
  },

  titulo: {
    marginTop: 15,
    color: "#FC586F",
    fontSize: 28,
    marginLeft: 35,
    fontWeight: "bold",
  },

  titulo_atividade: {
    fontSize: 17,
    color: "#FC586F",
    marginLeft: 31,
    marginTop: 30,
    marginBottom: 5,
  },

  input_atividade: {
    width: 350,
    alignItems: "center",
    marginLeft: 31,
    marginRight: 31,
    height: 28,
    fontSize: 16,
    margin: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#FC586F",
    height: 49,
    borderRadius: 10,
  },

  titulo_data: {
    fontSize: 17,
    color: "#FC586F",
    marginLeft: 31,
    marginTop: 30,
    marginBottom: 5,
  },

  titulo_horarioinicio: {
    fontSize: 17,
    color: "#FC586F",
    marginLeft: 32,
    marginTop: 30,
    marginBottom: 5,
  },

  input_horarioinicio: {
    width: 140,
    alignItems: "center",
    marginLeft: 31,
    marginRight: 31,
    height: 28,
    fontSize: 16,
    margin: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#FC586F",
    height: 49,
    borderRadius: 10,
  },

  input_horariofim: {
    width: 140,
    alignItems: "center",
    marginLeft: 35,
    marginRight: 31,
    height: 28,
    fontSize: 16,
    margin: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#FC586F",
    height: 49,
    borderRadius: 10,
  },

  titulo_horariofim: {
    fontSize: 17,
    color: "#FC586F",
    marginLeft: 37,
    marginTop: 30,
    marginBottom: 5,
  },

  areahorario: {
    flexDirection: "row",
  },

  titulo_descricao: {
    fontSize: 17,
    color: "#FC586F",
    marginLeft: 31,
    marginTop: 30,
    marginBottom: 5,
  },

  input_descricao: {
    borderBottomWidth: 1,
    width: 350,
    alignItems: "center",
    marginLeft: 31,
    marginRight: 31,
    height: 28,
    fontSize: 16,
    margin: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#FC586F",
    height: 49,
    borderRadius: 10,
  },

  titulo_categoria: {
    fontSize: 18,
    color: "#FC586F",
    marginLeft: 31,
    marginTop: 40,
    marginBottom: 5,
  },

  pressable_categoria: {
    backgroundColor: "#D9D9D9",
    width: 90,
    height: 25,
    marginLeft: 31,
    margin: 2,
    borderRadius: 5,
  },

  texto_categoria: {
    fontSize: 16,
    textAlign: "center",
  },

  pressable_categoriaadicionar: {
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

  touchable_atividade: {
    width: 250,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#FC586F",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 80,
    marginTop: 45,
  },

  text_atividade: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    padding: 5,
  },
});
